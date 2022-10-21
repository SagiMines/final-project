import ShippingDetailsCard from './ShippingDetailsCard';
import ProductCard from './ProductCard';
import { Card, Col, Row } from 'react-bootstrap';
import './styles/OrderConfirmation.css';
import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';

function OrderConfirmation() {
  const { user, setUser } = useContext(UserContext);
  const [userOrder, setUserOrder] = useState({});

  const getUserOrder = async () => {
    const allUserOrders = await getReq(`orders/${user.userId}`);
    userOrder.order = allUserOrders.reduce((a, b) => (a.id > b.id ? a : b));
    userOrder.orderDetails = await getReq(
      `order-details/${userOrder.order.id}`
    );
    for (const order of userOrder.orderDetails) {
      order.productImage = (
        await getReq(`product-images/${order.productId}`)
      )[0].imageSrc;
      order.productName = (
        await getReq(`products/${order.productId}`)
      ).productName;
    }
    // console.log(userOrder);
    setUserOrder({ ...userOrder });
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <div className="container order-confirmation-container">
      {userOrder.order && userOrder.orderDetails && (
        <>
          <h1 className="order-confirmation-title">
            Order #{userOrder.order.id} Confirmation
          </h1>
          <ShippingDetailsCard page="order-confirmation" />
          <Row className="review-data">
            <Col md>
              {userOrder.orderDetails.map(product => (
                <ProductCard
                  page="order-confirmation"
                  purchasedProduct={product}
                />
              ))}
              <Card>
                <Card.Body>
                  <Card.Title>
                    Purchase Total:{' '}
                    {userOrder.orderDetails.length > 1 &&
                      userOrder.orderDetails.reduce(
                        (previousOrderItem, currentOrderItem) =>
                          previousOrderItem.finalPrice +
                          currentOrderItem.finalPrice
                      )}
                    {userOrder.orderDetails.length === 1 &&
                      userOrder.orderDetails[0].finalPrice}
                    $
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md>
              <img className="thank-you-logo" src="thank-you.png"></img>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default OrderConfirmation;
