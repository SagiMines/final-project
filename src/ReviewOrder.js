import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import ShippingDetailsCard from './ShippingDetailsCard';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import './styles/ReviewOrder.css';
import { patchReq, getReq } from './DAL/serverData';

function ReviewOrder() {
  const { user, setUser } = useContext(UserContext);
  const [buyNow, setBuyNow] = useState({
    buyNowData: JSON.parse(localStorage.getItem('buy-now')),
  });
  const [cartReview, setCartReview] = useState({});

  const getPriceForBuyNow = () => {
    let totalPrice = buyNow.buyNowProduct.discount
      ? buyNow.buyNowProduct.unitPrice -
        buyNow.buyNowProduct.unitPrice * (0.01 * buyNow.buyNowProduct.discount)
      : buyNow.buyNowProduct.unitPrice;
    return totalPrice * buyNow.buyNowProduct.amount;
  };

  const setReviewCart = async () => {
    const cart = await getReq(`cart/${user.userId}`);
    const checkedCartProducts = cart.filter(cartProduct => cartProduct.checked);
    cartReview.finalCart = [];

    for (const reviewProduct of checkedCartProducts) {
      const product = await getReq(`products/${reviewProduct.productId}`);
      product.image = (
        await getReq(`product-images/${reviewProduct.productId}`)
      )[0].imageSrc;
      product.amount = reviewProduct.amount;
      if (
        !cartReview.finalCart.find(cartProduct => cartProduct.id === product.id)
      ) {
        cartReview.finalCart.push(product);
      }
    }

    setCartReview({ ...cartReview });
  };

  const getTheCartDetails = () => {
    cartReview.totalCartItems = cartReview.finalCart
      .map(cartProduct => cartProduct.amount)
      .reduce((a, b) => a + b, 0);
    cartReview.totalCartPrice = 0;
    for (const cartProduct of cartReview.finalCart) {
      cartReview.totalCartPrice += cartProduct.discount
        ? cartProduct.unitPrice * cartProduct.amount -
          cartProduct.unitPrice *
            cartProduct.amount *
            (0.01 * cartProduct.discount)
        : cartProduct.unitPrice * cartProduct.amount;
    }
    setCartReview({ ...cartReview });
  };

  const setReview = async () => {
    if (buyNow.buyNowData) {
      localStorage.removeItem('buy-now');
      buyNow.buyNowProduct = await getReq(
        `products/${buyNow.buyNowData.productId}`
      );
      buyNow.buyNowProduct.image = (
        await getReq(`product-images/${buyNow.buyNowData.productId}`)
      )[0].imageSrc;
      buyNow.buyNowProduct.amount = buyNow.buyNowData.amount;
      buyNow.buyNowProduct.checked = true;
      setBuyNow({ ...buyNow });
    } else {
      await setReviewCart();
      getTheCartDetails();
    }
  };

  const handleAmountChange = async (valueAsNumber, valueAsString, input) => {
    const productId = Number(input.name);
    //updates the database
    const currentProduct = cartReview.finalCart.find(
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

    const found = cartReview.finalCart.find(
      product => product.id === productId
    );
    found.amount = valueAsNumber;

    cartReview.totalCartItems = cartReview.finalCart
      .map(product => product.amount)
      .reduce((a, b) => a + b, 0);

    cartReview.totalCartPrice = cartReview.finalCart
      .map(product =>
        product.discount
          ? product.unitPrice * product.amount -
            product.unitPrice * product.amount * (0.01 * product.discount)
          : product.unitPrice * product.amount
      )
      .reduce((a, b) => a + b, 0);

    setCartReview({ ...cartReview });

    user.totalCartItems = cartReview.totalCartItems;
    setUser({ ...user });
  };

  useEffect(() => {
    setReview();
  }, []);
  return (
    <div className="container review-container">
      <h1 className="review-title">Review Your Order</h1>
      <ShippingDetailsCard page="review" />
      <Row className="review-data">
        <Col md>
          {!buyNow.buyNowData &&
            cartReview.finalCart &&
            cartReview.finalCart.map((cart, idx) => (
              <ProductCard
                page="review"
                key={idx.toString()}
                currentProduct={cart}
                onAmountChange={handleAmountChange}
              />
            ))}
          {buyNow.buyNowProduct && buyNow.buyNowProduct.checked && (
            <ProductCard page="review" currentProduct={buyNow.buyNowProduct} />
          )}
        </Col>
        <Col md>
          <CheckoutCard
            page="review"
            cartSummary={{
              totalAmount: buyNow.buyNowProduct
                ? buyNow.buyNowProduct.amount
                : cartReview.totalCartItems,
              totalPrice: buyNow.buyNowProduct
                ? getPriceForBuyNow()
                : cartReview.totalCartPrice,
              cart: cartReview.finalCart,
            }}
            buyNowProduct={buyNow.buyNowProduct}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ReviewOrder;
