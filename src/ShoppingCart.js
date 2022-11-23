import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import { Row, Col } from 'react-bootstrap';
import './styles/ShoppingCart.css';
import { UserContext } from './UserContext';
import { getReq, deleteReq, patchReq, postReq } from './DAL/serverData';
import { useContext, useEffect, useState } from 'react';
import LoadingGif from './LoadingGif';

function ShoppingCart() {
  const { user, setUser } = useContext(UserContext);
  const { setGuestTotalCartItems } = useContext(UserContext);
  let [cartData, setCartData] = useState(null);

  // updates the UI when the user deletes an item from the cart
  const handleDeleteClick = async e => {
    const productId = Number(e.target.name);
    //User
    if (user) {
      let cart;
      await deleteReq(`cart?user-id=${user.userId}&product-id=${productId}`);
      do {
        cart = await getReq(`cart/${user.userId}`);
      } while (cart.find(item => item.productId === productId));
      //Guest
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guestCart'));
      const filteredCart = guestCart.filter(
        cartProduct => cartProduct.productId !== productId
      );
      localStorage.setItem('guestCart', JSON.stringify(filteredCart));
    }
    await setTheCart();
  };

  const handleMoveToWishlistClick = async e => {
    await handleDeleteClick(e);
    const productId = Number(e.target.name);
    await addToWishlist(productId);
  };

  const addToWishlist = async productId => {
    let reqBody;
    //User
    if (user) {
      reqBody = { userId: user.userId, productId };
      const isAddedToWishlist = postReq(`wishlist`, reqBody);
      if (isAddedToWishlist) {
        console.log('The product was added successfully to the database.');
      } else {
        console.log('Server error');
      }
      //Guest
    } else {
      reqBody = { productId };
      const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist'));
      guestWishlist.push(reqBody);
      localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
      console.log('The product was added successfully to the database.');
    }
  };

  // updates the UI if the user change the amount of a product
  const handleAmountChange = async (valueAsNumber, valueAsString, input) => {
    const productId = Number(input.name);
    const currentProduct = cartData.cartProducts.find(
      product => product.id === productId
    );
    let reqBody;
    //User
    if (user) {
      reqBody = {
        userId: user.userId,
        productId,
        amount: valueAsNumber,
        checked: currentProduct.checked,
      };
      if (await patchReq(`cart`, reqBody)) {
        console.log('The item has been successfully updated in the database');
      }
      //Guest
    } else {
      reqBody = {
        productId,
        amount: valueAsNumber,
        checked: currentProduct.checked,
      };
      const guestCart = JSON.parse(localStorage.getItem('guestCart'));
      const foundCartProduct = guestCart.find(
        cartProduct => cartProduct.productId === reqBody.productId
      );
      foundCartProduct.amount = reqBody.amount;
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      console.log('The item has been successfully updated');
    }

    const found = cartData.cartProducts.find(
      product => product.id === productId
    );
    found.amount = valueAsNumber;

    if (found.checked) {
      cartData.totalAmount = cartData.cartProducts
        .map(product => product.checked && product.amount)
        .reduce((a, b) => a + b, 0);

      cartData.totalPrice = cartData.cartProducts
        .map(product =>
          product.discount
            ? product.checked &&
              product.unitPrice * product.amount -
                product.unitPrice * product.amount * (0.01 * product.discount)
            : product.checked && product.unitPrice * product.amount
        )
        .reduce((a, b) => a + b, 0);
    }
    setCartData({ ...cartData });

    //User
    if (user) {
      user.totalCartItems = cartData.totalAmount;
      setUser({ ...user });
      //Guest
    } else {
      setGuestTotalCartItems(cartData.totalAmount);
    }
  };

  const setTheCart = async () => {
    cartData = {};
    //User
    if (user) {
      cartData.cart = await getReq(`cart/${user.userId}`);
      //Guest
    } else {
      cartData.cart = JSON.parse(localStorage.getItem('guestCart'));
    }
    cartData.cartProducts = [];

    if (cartData.cart) {
      for (const cart of cartData.cart) {
        const cartItem = await getReq(`products/${cart.productId}`);
        cartItem.checked = cart.checked;
        if (
          !cartData.cartProducts.find(
            cartProduct => cartProduct.id === cartItem.id
          )
        ) {
          cartData.cartProducts.push(cartItem);
        }
      }

      for (const product of cartData.cartProducts) {
        const productImg = (await getReq(`product-images/${product.id}`))[0]
          .imageSrc;
        product.image = productImg;
        const foundCart = cartData.cart.find(
          cart => cart.productId === product.id
        );
        product.amount = foundCart.amount;
      }

      const checkedCartProducts = cartData.cartProducts.filter(
        product => product.checked
      );
      cartData.totalAmount = 0;
      cartData.totalPrice = 0;
      if (checkedCartProducts.length > 1) {
        for (const product of checkedCartProducts) {
          cartData.totalAmount += product.amount;

          cartData.totalPrice += product.discount
            ? product.unitPrice * product.amount -
              product.unitPrice * product.amount * (0.01 * product.discount)
            : product.unitPrice * product.amount;
        }
      } else if (checkedCartProducts.length === 1) {
        cartData.totalAmount = checkedCartProducts[0].amount;
        cartData.totalPrice = checkedCartProducts[0].discount
          ? checkedCartProducts[0].unitPrice * checkedCartProducts[0].amount -
            checkedCartProducts[0].unitPrice *
              checkedCartProducts[0].amount *
              (0.01 * checkedCartProducts[0].discount)
          : checkedCartProducts[0].unitPrice * checkedCartProducts[0].amount;
      }
      //User
      if (user) {
        user.totalCartItems = cartData.totalAmount;
        setUser({ ...user });
        //Guest
      } else {
        setGuestTotalCartItems(cartData.totalAmount);
      }
    } else {
      //User
      if (user) {
        user.totalCartItems = 0;
        setUser({ ...user });
        //Guest
      } else {
        setGuestTotalCartItems(0);
      }
    }
    setCartData({ ...cartData });
  };

  useEffect(() => {
    setTheCart();
  }, []);

  return (
    <>
      {!cartData && <LoadingGif />}
      {cartData && (
        <div className="container shopping-cart-container">
          <h1 className="shopping-cart-title">Shopping Cart</h1>
          <Row className="shopping-cart-data">
            <Col md>
              {cartData.cartProducts.map((product, idx) => (
                // the products in the cart
                <ProductCard
                  key={idx.toString()}
                  page="cart"
                  cartState={{ cartData, setCartData }}
                  currentProduct={product}
                  onAmountChange={handleAmountChange}
                  onDeleteClick={handleDeleteClick}
                  onMoveToWishlistClick={handleMoveToWishlistClick}
                />
              ))}
            </Col>
            <Col md>
              {cartData && (
                <CheckoutCard
                  page="cart"
                  cartSummary={{
                    totalAmount: cartData.totalAmount,
                    totalPrice: cartData.totalPrice,
                  }}
                />
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
