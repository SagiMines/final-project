import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import ShippingDetailsCard from './ShippingDetailsCard';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import './styles/ReviewOrder.css';
import { getReq, patchReq, postReq } from './DAL/serverData';
import { useLocation } from 'react-router-dom';
import LoadingGif from './LoadingGif';
import _ from 'lodash';

function ReviewOrder() {
  const { state } = useLocation();
  const { user } = useContext(UserContext);
  const [cartReview, setCartReview] = useState({});
  const [guestShippingDetails, setGuestShippingDetails] = useState();
  const [areGuestDetailsCompleted, setAreGuestDetailsCompleted] =
    useState(false);

  const setReviewCart = async () => {
    let cart;
    //User
    if (user) {
      cart = await getReq(`cart/${user.userId}`);
      //Guest
    } else {
      cart = JSON.parse(localStorage.getItem('guestCart'));
    }
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
    cartReview.totalCartPrice = +cartReview.totalCartPrice.toFixed(2);
    setCartReview({ ...cartReview });
  };

  const handleGuestSavedOrder = async () => {
    const savedGuestOrder = state;
    let userCart;
    userCart = await getReq(`cart/${user.userId}`);
    if (userCart.length) {
      for (const item of userCart) {
        item.checked = false;
        const isCartUpdated = await patchReq(`cart`, item);
        if (isCartUpdated) {
          console.log('Successfully updated the cart.');
        }
      }
    }
    for (const item of savedGuestOrder) {
      const isAddedToCart = await postReq(`cart`, item);
      if (isAddedToCart) {
        console.log('Successfully updated the cart.');
      }
    }
  };

  const setReview = async () => {
    if (state) {
      await handleGuestSavedOrder();
    }
    await setReviewCart();
    getTheCartDetails();
  };

  const areDetailsOkay = () => {
    const guestInputValues = Object.values(guestShippingDetails).filter(
      value => value.value.length === 0
    );

    const guestInputError = Object.values(guestShippingDetails).filter(
      value => value.errorMessage !== null
    );

    if (guestInputValues.length === 0 && guestInputError.length === 0) {
      setAreGuestDetailsCompleted(true);
    } else {
      setAreGuestDetailsCompleted(false);
    }
  };

  useEffect(() => {
    if (guestShippingDetails) {
      areDetailsOkay();
    }
  }, [guestShippingDetails]);

  useEffect(() => {
    setReview();
  }, [state]);

  useEffect(() => {
    setReview();
  }, []);
  return (
    <div className="container-center">
      <div className="container review-container">
        {_.isEmpty(cartReview) && <LoadingGif />}
        {!_.isEmpty(cartReview) && (
          <>
            <h1 className="review-title">Review Your Order</h1>
            {!user && (
              <ShippingDetailsCard
                guestShippingDetailsState={{
                  guestShippingDetails,
                  setGuestShippingDetails,
                }}
                page="review"
              />
            )}
            {user && <ShippingDetailsCard page="review" />}
            <Row className="review-data">
              <Col md>
                {cartReview.finalCart &&
                  cartReview.finalCart.map((cart, idx) => (
                    <ProductCard
                      page="review"
                      key={idx.toString()}
                      currentProduct={cart}
                    />
                  ))}
              </Col>
              <Col md>
                {!user && (
                  <CheckoutCard
                    page="review"
                    guestShippingDetailsState={
                      areGuestDetailsCompleted
                        ? guestShippingDetails
                        : undefined
                    }
                    cartSummary={{
                      totalAmount: cartReview.totalCartItems,
                      totalPrice: cartReview.totalCartPrice,
                      cart: cartReview.finalCart,
                    }}
                  />
                )}
                {user && (
                  <CheckoutCard
                    page="review"
                    cartSummary={{
                      totalAmount: cartReview.totalCartItems,
                      totalPrice: cartReview.totalCartPrice,
                      cart: cartReview.finalCart,
                    }}
                  />
                )}
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewOrder;
