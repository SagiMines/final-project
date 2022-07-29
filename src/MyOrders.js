import { Button, Card } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ShippingDetailsCard from './ShippingDetailsCard';
import './styles/MyOrders.css';

function MyOrders() {
  return (
    <div className="container my-orders-container">
      <h1 className="my-orders-title">Your Orders</h1>
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Order #11</Card.Title>
          <ShippingDetailsCard />
          <ProductCard page="order-confirmation" />
          <ProductCard page="order-confirmation" />
          <section className="order-summary">
            <Card.Title>Total purchase: 50$</Card.Title>
            <Card.Title>Order date: 01/07/2022</Card.Title>
            <Card.Title>Shipped date: 01/07/2022</Card.Title>
          </section>
        </Card.Body>
      </Card>
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Order #12</Card.Title>
          <ShippingDetailsCard />
          <ProductCard page="order-confirmation" />
          <ProductCard page="order-confirmation" />
          <ProductCard page="order-confirmation" />
          <section className="order-summary">
            <Card.Title>Total purchase: 80$</Card.Title>
            <Card.Title>Order date: 01/07/2022</Card.Title>
            <Card.Title>Shipped date: 01/07/2022</Card.Title>
          </section>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyOrders;
