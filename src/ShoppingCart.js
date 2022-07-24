import ProductCard from './ProductCard';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './ShoppingCart.css';

function ShoppingCart() {
  return (
    <div className="container shopping-cart-container">
      <h1 className="shopping-cart-title">Shopping Cart</h1>
      <Row className="shopping-cart-data">
        <Col md>
          <ProductCard page="cart" />
          <ProductCard page="cart" />
        </Col>
        <Col md>
          <Card className="checkout-card">
            <Card.Body>
              <Card.Title>Total Amount (2 Items): 30$</Card.Title>
              <Button className="checkout-button">Proceed to checkout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ShoppingCart;
