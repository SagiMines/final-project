import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import { Row, Col } from 'react-bootstrap';
import './styles/ShoppingCart.css';
import { UserContext } from './UserContext';
import { getReq, deleteReq, patchReq, postReq } from './DAL/serverData';
import { useContext, useEffect, useState } from 'react';

function ShoppingCart() {
  const { user, setUser } = useContext(UserContext);
  let [cartData, setCartData] = useState(null);

  // updates the UI when the user deletes an item from the cart
  const handleDeleteClick = async e => {
    const productId = e.target.name;
    //updates the database
    if (
      await deleteReq(`cart?user-id=${user.userId}&product-id=${productId}`)
    ) {
      console.log('The item has been successfully deleted from the database.');
      const filtered = cartData.cartProducts.filter(
        product => product.id !== Number(e.target.name)
      );
      cartData.cartProducts = filtered;
      cartData.totalAmount = cartData.cartProducts
        .map(product => product.amount)
        .reduce((a, b) => a + b, 0);
      cartData.totalPrice = cartData.cartProducts
        .map(product =>
          product.discount
            ? product.unitPrice * product.amount -
              product.unitPrice * product.amount * (0.01 * product.discount)
            : product.unitPrice * product.amount
        )
        .reduce((a, b) => a + b, 0);
      setCartData({ ...cartData });
      user.totalCartItems = cartData.totalAmount;

      setUser({ ...user });
    }
  };

  const handleMoveToWishlistClick = async e => {
    await handleDeleteClick(e);
    const productId = Number(e.target.name);
    await addToWishlist(productId);
  };

  const addToWishlist = async productId => {
    const reqBody = { userId: user.userId, productId };
    const isAddedToWishlist = postReq(`wishlist`, reqBody);
    if (isAddedToWishlist) {
      console.log('The product was added successfully to the database.');
    } else {
      console.log('Server error');
    }
  };

  // updates the UI if the user change the amount of a product
  const handleAmountChange = async (valueAsNumber, valueAsString, input) => {
    const productId = Number(input.name);
    //updates the database
    const currentProduct = cartData.cartProducts.find(
      product => product.id === productId
    );
    const reqBody = {
      userId: user.userId,
      productId,
      amount: valueAsNumber,
      checked: currentProduct.checked,
    };
    if (await patchReq(`cart`, reqBody)) {
      console.log('The item has been successfully updated in the database');
    }

    const found = cartData.cartProducts.find(
      product => product.id === productId
    );
    found.amount = valueAsNumber;

    if (found.checked) {
      cartData.totalAmount = cartData.cartProducts
        .map(product => product.amount)
        .reduce((a, b) => a + b, 0);

      cartData.totalPrice = cartData.cartProducts
        .map(product =>
          product.discount
            ? product.unitPrice * product.amount -
              product.unitPrice * product.amount * (0.01 * product.discount)
            : product.unitPrice * product.amount
        )
        .reduce((a, b) => a + b, 0);
    }
    setCartData({ ...cartData });

    user.totalCartItems = cartData.totalAmount;
    setUser({ ...user });
  };

  const setTheCart = async () => {
    cartData = {};
    cartData.cart = await getReq(`cart/${user.userId}`);
    cartData.cartProducts = [];
    cartData.totalAmount = 0;
    cartData.totalPrice = 0;

    if (cartData.cart) {
      for (const cart of cartData.cart) {
        const cartItem = await getReq(`products/${cart.productId}`);
        cartItem.checked = cart.checked;
        cartData.cartProducts.push(cartItem);
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
      user.totalCartItems = cartData.totalAmount;
    } else {
      user.totalCartItems = 0;
    }

    setCartData({ ...cartData });
    setUser({ ...user });
  };

  useEffect(() => {
    setTheCart();
  }, []);

  return (
    <>
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
