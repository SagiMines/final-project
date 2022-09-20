import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import { Row, Col } from 'react-bootstrap';
import './styles/ShoppingCart.css';
import { UserContext } from './UserContext';
import { getReq, deleteReq, patchReq } from './DAL/serverData';
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
      user.finalCart = cartData.cartProducts;
      user.totalCartItems = cartData.totalAmount;
      user.totalCartPrice = cartData.totalPrice;
      setUser({ ...user });
      console.log(user);
    }
  };

  // updates the UI if the user change the amount of a product
  const handleAmountChange = async (valueAsNumber, valueAsString, input) => {
    const productId = input.name;
    //updates the database
    if (
      await patchReq(
        `cart?user-id=${user.userId}&product-id=${productId}&amount=${valueAsString}`
      )
    ) {
      console.log('The item has been successfully updated in the database');
    }

    const found = cartData.cartProducts.find(
      product => product.id === Number(input.name)
    );
    found.amount = valueAsNumber;
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
    user.finalCart = cartData.cartProducts;
    user.totalCartItems = cartData.totalAmount;
    user.totalCartPrice = cartData.totalPrice;
    setUser({ ...user });
  };

  const setTheCart = async () => {
    cartData = {};
    cartData.cart = await getReq(`cart/${user.userId}`);
    cartData.cartProducts = [];

    for (const cart of cartData.cart) {
      cartData.cartProducts.push(await getReq(`products/${cart.productId}`));
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
    user.finalCart = cartData.cartProducts;
    user.totalCartItems = cartData.totalAmount;
    user.totalCartPrice = cartData.totalPrice;

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
                  currentProduct={product}
                  onAmountChange={handleAmountChange}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </Col>
            <Col md>
              <CheckoutCard
                page="cart"
                cartSummary={{
                  totalAmount: user.totalCartItems,
                  totalPrice: user.totalCartPrice,
                }}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
