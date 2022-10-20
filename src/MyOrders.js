import './styles/MyOrders.css';
import Order from './Order';
import { UserContext } from './UserContext';
import { useState, useEffect, useContext } from 'react';
import { getReq } from './DAL/serverData';

function MyOrders() {
  const { user, setUser } = useContext(UserContext);
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
      {orders && orders.map(order => <Order order={order} />)}
      {/* <Order  />
      <Order /> */}
    </div>
  );
}

export default MyOrders;
