import ShippingDetailsCard from './ShippingDetailsCard';
import ProductCard from './ProductCard';
import { Card, Col, Row } from 'react-bootstrap';
import './styles/OrderConfirmation.css';
import Cookies from 'js-cookie';
import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';
import _ from 'lodash';
import LoadingGif from './LoadingGif';
import { useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const { user } = useContext(UserContext);
  const [userOrder, setUserOrder] = useState({});
  const location = useLocation();

  const getUserOrder = async () => {
    let allUserOrders;
    //User
    if (user) {
      allUserOrders = await getReq(`orders/${user.userId}`);
      userOrder.order = allUserOrders.reduce((a, b) => (a.id > b.id ? a : b));
      userOrder.orderDetails = await getReq(
        `order-details/${userOrder.order.id}`
      );
      //Guest
    } else {
      userOrder.order = Cookies.get('new-user-order-id');
      userOrder.orderDetails = await getReq(
        `order-details/${Cookies.get('new-user-order-id')}`
      );
      Cookies.remove('new-user-order-id');
    }

    for (const order of userOrder.orderDetails) {
      order.productImage = (
        await getReq(`product-images/${order.productId}`)
      )[0].imageSrc;
      order.productName = (
        await getReq(`products/${order.productId}`)
      ).productName;
    }
    setUserOrder({ ...userOrder });
    removeAuthenticationSession();
  };
  const removeAuthenticationSession = async () => {
    await getReq(`users/update-authentication${location.pathname}`);
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <div className="container-center">
      <div className="container order-confirmation-container">
        {_.isEmpty(userOrder) && <LoadingGif />}
        {userOrder.order && userOrder.orderDetails && (
          <>
            <h1 className="order-confirmation-title">
              Order #{user ? userOrder.order.id : userOrder.order} Confirmation
            </h1>
            <ShippingDetailsCard page="order-confirmation" />
            <Row className="review-data">
              <Col md>
                {userOrder.orderDetails.map((product, idx) => (
                  <ProductCard
                    key={idx.toString()}
                    page="order-confirmation"
                    purchasedProduct={product}
                  />
                ))}
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Purchase Total: $
                      {userOrder.orderDetails.length > 1 &&
                        userOrder.orderDetails.reduce(
                          (previousOrderItem, currentOrderItem) =>
                            previousOrderItem + currentOrderItem.finalPrice,
                          0
                        )}
                      {userOrder.orderDetails.length === 1 &&
                        userOrder.orderDetails[0].finalPrice}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md>
                <img
                  referrerPolicy="no-referrer"
                  className="thank-you-logo"
                  src="https://lh3.googleusercontent.com/pw/AL9nZEXIeP9l9FB-rBv7_SR9HGXgL4Ym4U-KZfqQYBln8AQbWCqX0ljDGm97FZyviSwOQnZpPLhfGfw3jJVuGw7z6dv0K8sndFfQutIPUqfxjwNCi94XEeto6mmi9WSO3HcD31X1LTR_U7UuS58-KujLGy9U=s937-no?authuser=1"
                  alt="Thank you image"
                  title="Thank you"
                ></img>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderConfirmation;
