import './styles/MyOrders.css';
import Order from './Order';
import { UserContext } from './UserContext';
import { useState, useEffect, useContext } from 'react';
import { getReq } from './DAL/serverData';
import { Container } from 'react-bootstrap';

function MyOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState();

  const getUserOrders = async () => {
    const userOrders = await getReq(`orders/${user.userId}`);
    const ordersArr = [];
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
