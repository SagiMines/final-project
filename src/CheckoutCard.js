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
            const areOrderedCartItemsDeleted = await deleteOrderedCartItems();

            if (areOrderedCartItemsDeleted) {
              let cartTotalWithoutDiscount;
              let cartTotalWithDiscount;
              if (props.cartSummary.cart) {
                cartTotalWithoutDiscount = props.cartSummary.cart.reduce(
                  (a, b) => a + b.priceWithoutDiscount,
                  0
                );

                cartTotalWithDiscount = props.cartSummary.cart.reduce(
                  (a, b) => a + b.finalPrice,
                  0
                );
              }

              const saving = cartTotalWithoutDiscount - cartTotalWithDiscount;
              const confirmationEmailBody = {
                user: userDetails,
                cartProducts: props.cartSummary.cart,
                orderDate: new Date().toLocaleDateString(),
                orderId: userLastOrderId,
                cartTotalWithoutDiscount,
                cartTotalWithDiscount,
                saving,
              };
              const isConfirmationMailSent = await postReq(
                `order-details/order-confirmation`,
                confirmationEmailBody
              );
              if (isConfirmationMailSent) {
                user.totalCartItems = 0;
                setUser({ ...user });
                navigate('/order-confirmation');
              } else {
                console.log(
                  'An error occurred in trying to send an email to the user'
                );
              }
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
        const isGuestUserWasCreated = await postReq(
          `register?guest=true`,
          reqBody
        );
        if (isGuestUserWasCreated) {
          let newUserId;
          do {
            newUserId = await getReq(`users?email=${reqBody.email}`);
          } while (!newUserId);
          const userDetails = newUserId;
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
              let cartTotalWithoutDiscount;
              let cartTotalWithDiscount;
              if (props.cartSummary.cart) {
                cartTotalWithoutDiscount = props.cartSummary.cart.reduce(
                  (a, b) => a + b.priceWithoutDiscount,
                  0
                );

                cartTotalWithDiscount = props.cartSummary.cart.reduce(
                  (a, b) => a + b.finalPrice,
                  0
                );
              }

              const saving = cartTotalWithoutDiscount - cartTotalWithDiscount;
              const confirmationEmailBody = {
                user: userDetails,
                cartProducts: props.cartSummary.cart,
                orderDate: new Date().toLocaleDateString(),
                orderId: userLastOrderId,
                cartTotalWithoutDiscount,
                cartTotalWithDiscount,
                saving,
              };
              const isConfirmationMailSent = await postReq(
                `order-details/order-confirmation`,
                confirmationEmailBody
              );
              localStorage.setItem('guestCart', JSON.stringify([]));

              setGuestTotalCartItems(0);

              if (isConfirmationMailSent) {
                navigate('/order-confirmation');
              }
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
    for (const cartItem of props.cartSummary.cart) {
      const productId = cartItem.id;
      const unitPrice = cartItem.unitPrice;
      const amount = cartItem.amount;
      const finalPrice = cartItem.discount
        ? unitPrice * amount - unitPrice * amount * (cartItem.discount * 0.01)
        : unitPrice * amount;

      cartItem.finalPrice = finalPrice;
      cartItem.priceWithoutDiscount = unitPrice * amount;
      const reqBody = { orderId, productId, unitPrice, amount, finalPrice };
      const isOrderDetailsAddedToDb = await postReq('order-details', reqBody);
      const isProductUnitsInStockUpdated = await patchReq(
        `products?product-id=${cartItem.id}&amount=${
          cartItem.unitsInStock - cartItem.amount
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
          <Card.Title>{`Total Amount (${props.cartSummary.totalAmount} Items): $${props.cartSummary.totalPrice}`}</Card.Title>
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
                props.page === 'cart') ||
              (!user &&
                JSON.parse(localStorage.getItem('guestCart')) &&
                !JSON.parse(localStorage.getItem('guestCart')).find(
                  item => item.checked
                ) &&
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
