import { Button, Card } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './MyOrders.css';

function MyOrders() {
  return (
    <div className="container my-orders-container">
      <h1 className="my-orders-title">Your Orders</h1>
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Order #11</Card.Title>
          <ProductCard page="order-confirmation" />
          <ProductCard page="order-confirmation" />
          <Card.Title className="total-text">Total purchase: 50$</Card.Title>
          <Button>Review order</Button>
        </Card.Body>
      </Card>
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Order #12</Card.Title>
          <ProductCard page="order-confirmation" />
          <ProductCard page="order-confirmation" />
          <ProductCard page="order-confirmation" />
          <Card.Title className="total-text">Total purchase: 80$</Card.Title>
          <Button>Review order</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyOrders;
