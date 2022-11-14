import './styles/MyOrders.css';
import Order from './Order';
import { UserContext } from './UserContext';
import { useState, useEffect, useContext } from 'react';
import { getReq } from './DAL/serverData';
import { Card, Container } from 'react-bootstrap';

function MyOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState();

  const getUserOrders = async () => {
    const userOrders = await getReq(`orders/${user.userId}`);

    const ordersArr = [];
    if (userOrders) {
      for (const order of userOrders) {
        const orderData = await getReq(`orders/${order.id}?join=true`);
        for (const details of orderData.orderDetails) {
          details.productImage = (
            await getReq(`product-images/${details.productId}`)
          )[0].imageSrc;
          details.productName = (
            await getReq(`products/${details.productId}`)
          ).productName;
        }
        ordersArr.push(orderData);
      }
    }
    setOrders([...ordersArr]);
  };

  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <div className="container my-orders-container">
      <h1 className="my-orders-title">Your Orders</h1>
      {!orders && (
        <Container className="loading-icon">
          <img src="/icons/loading.gif"></img>
        </Container>
      )}
      {orders && !orders.length && (
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>You haven't made any orders yet</Card.Title>
            </Card.Body>
          </Card>
        </Container>
      )}
      {orders &&
        orders.map(
          (order, idx) =>
            order.orderDetails.length > 0 && (
              <Order key={idx.toString()} order={order} />
            )
        )}
    </div>
  );
}

export default MyOrders;
