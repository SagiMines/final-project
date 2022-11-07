import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/CheckoutCard.css';
import { UserContext } from './UserContext';
import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  convertJsDatePatternToMysqlPattern,
  deleteReq,
  getReq,
  patchReq,
  postReq,
} from './DAL/serverData';
import { useNavigate } from 'react-router-dom';

function CheckoutCard(props) {
  const { user, setUser } = useContext(UserContext);
  const { setGuestTotalCartItems } = useContext(UserContext);
  // const [guestTotalCartItems, setGuestTotalCartItems] = useState();
  const [reviewState, setReviewState] = useState({});
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (props.page === 'cart') {
      navigate('/review-order');
    } else {
      //User
      if (user) {
        const userDetails = await getTheUser();
        const isNewOrderUpdated = await addOrderToDb(userDetails);
        await getReq('orders');
        if (isNewOrderUpdated) {
          const userLastOrderId = await getUserLastOrderId();
          const isOrderDetailsUpdated = await addOrderDetailsToDb(
            userLastOrderId
          );
          if (isOrderDetailsUpdated) {
            const areOrderedCartItemsDeleted = props.buyNowProduct
              ? true
              : await deleteOrderedCartItems();
            user.totalCartItems = props.buyNowProduct ? user.totalCartItems : 0;
            setUser({ ...user });
            if (areOrderedCartItemsDeleted) {
              navigate('/order-confirmation');
            }
          }
        }
        //Guest
      } else {
        const reqBody = {};
        for (const value of Object.entries(props.guestShippingDetailsState)) {
          reqBody[value[0]] = value[1].value;
        }
        let randomPass;
        do {
          randomPass = Math.floor(Math.random() * 10000000000).toString();
        } while (randomPass.toString().length < 10);
        reqBody.password = randomPass;
        // console.log(randomPass);
        const isGuestUserWasCreated = postReq(`register?guest=true`, reqBody);
        if (isGuestUserWasCreated) {
          let newUserId;
          do {
            newUserId = await getReq(`users?email=${reqBody.email}`);
          } while (!newUserId);

          newUserId = newUserId.id;
          Cookies.set('new-user-id', JSON.stringify(newUserId), {
            expires: 1,
          });
          reqBody.id = newUserId;
          const isNewUserOrder = await addOrderToDb(reqBody);
          if (isNewUserOrder) {
            const userLastOrderId = await getUserLastOrderId(newUserId);
            const isOrderDetailsUpdated = await addOrderDetailsToDb(
              userLastOrderId
            );
            if (isOrderDetailsUpdated) {
              localStorage.setItem('guestCart', JSON.stringify([]));
              if (!props.buyNowProduct) {
                setGuestTotalCartItems(0);
              }

              navigate('/order-confirmation');
            }
          }
        }
      }
    }
  };

  const getTheUser = async () => {
    return await getReq(`users/${user.userId}`);
  };

  const addOrderToDb = async userDetails => {
    const reqBody = {
      userId: userDetails.id,
      orderDate: convertJsDatePatternToMysqlPattern(),
      shipAddress: userDetails.address,
      shipCountry: userDetails.country,
      shipCity: userDetails.city,
      shipPostalCode: userDetails.postalCode,
    };
    return await postReq(`orders`, reqBody);
  };

  const getUserLastOrderId = async newUserId => {
    let userOrders;
    //User
    if (user) {
      userOrders = await getReq(`orders/${user.userId}`);
      //Guest
    } else {
      do {
        userOrders = await getReq(`orders/${newUserId}`);
      } while (!userOrders);
    }
    const lastOrder = Math.max(...userOrders.map(order => order.id));
    Cookies.set('new-user-order-id', JSON.stringify(lastOrder), {
      expires: 1,
    });
    return lastOrder;
  };

  const addOrderDetailsToDb = async orderId => {
    if (!props.buyNowProduct) {
      for (const cartItem of props.cartSummary.cart) {
        const productId = cartItem.id;
        const unitPrice = cartItem.unitPrice;
        const amount = cartItem.amount;
        const finalPrice = cartItem.discount
          ? unitPrice * amount - unitPrice * amount * (cartItem.discount * 0.01)
          : unitPrice * amount;

        const reqBody = { orderId, productId, unitPrice, amount, finalPrice };
        const isOrderDetailsAddedToDb = await postReq('order-details', reqBody);
        const isProductUnitsInStockUpdated = await patchReq(
          `products?product-id=${cartItem.id}&amount=${
            cartItem.unitsInStock - cartItem.amount
          }`
        );
        if (!isOrderDetailsAddedToDb || !isProductUnitsInStockUpdated) {
          console.log(
            'Something went wrong with the data sent to the database.'
          );
          return false;
        }
      }
    } else {
      const productId = props.buyNowProduct.id;
      const unitPrice = props.buyNowProduct.unitPrice;
      const amount = props.buyNowProduct.amount;
      const finalPrice = props.buyNowProduct.discount
        ? unitPrice * amount -
          unitPrice * amount * (props.buyNowProduct.discount * 0.01)
        : unitPrice * amount;

      const reqBody = { orderId, productId, unitPrice, amount, finalPrice };
      const isOrderDetailsAddedToDb = await postReq('order-details', reqBody);
      const isProductUnitsInStockUpdated = await patchReq(
        `products?product-id=${props.buyNowProduct.id}&amount=${
          props.buyNowProduct.unitsInStock - props.buyNowProduct.amount
        }`
      );
      if (!isOrderDetailsAddedToDb || !isProductUnitsInStockUpdated) {
        console.log('Something went wrong with the data sent to the database.');
        return false;
      }
    }

    return true;
  };

  const deleteOrderedCartItems = async () => {
    for (const cartItem of props.cartSummary.cart) {
      const isDeletedFromCart = await deleteReq(
        `cart?user-id=${user.userId}&product-id=${cartItem.id}`
      );
      if (!isDeletedFromCart) {
        console.log('Something went wrong with the data sent to the database.');
        return false;
      }
    }
    return true;
  };

  const checkIfUserShippingDetailsAreFilled = async () => {
    //User
    if (user) {
      const userDetails = await getTheUser();
      if (Object.values(userDetails).find(value => value === null) === null) {
        reviewState.areDetailsFilled = false;
      } else {
        reviewState.areDetailsFilled = true;
      }
      //Guest
    } else {
      reviewState.areDetailsFilled = false;
    }
    reviewState.finished = true;
    setReviewState({ ...reviewState });
  };

  useEffect(() => {
    checkIfUserShippingDetailsAreFilled();
  }, []);
  return (
    <Card className="checkout-card">
      {reviewState.finished && (
        <Card.Body>
          <Card.Title>{`Total Amount (${
            props.cartSummary.totalAmount
          } Items): ${(
            Math.floor(props.cartSummary.totalPrice * 100) / 100
          ).toFixed(2)}$`}</Card.Title>
          <Button
            disabled={
              (user &&
                !reviewState.areDetailsFilled &&
                props.page === 'review') ||
              (user && !props.cartSummary.totalPrice) ||
              (!user &&
                !props.guestShippingDetailsState &&
                props.page === 'review') ||
              (!user &&
                JSON.parse(localStorage.getItem('guestCart')) &&
                !JSON.parse(localStorage.getItem('guestCart')).length &&
                props.page === 'cart')
                ? true
                : false
            }
            onClick={handleOrder}
            className="checkout-button"
          >
            {props.page === 'cart' ? 'Proceed to checkout' : 'Place your order'}
          </Button>
          {props.page === 'review' && (
            <Link to="/shopping-cart">
              <Button className="checkout-button">Cancle</Button>
            </Link>
          )}
        </Card.Body>
      )}
    </Card>
  );
}

export default CheckoutCard;
