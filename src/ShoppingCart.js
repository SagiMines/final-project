import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './styles/ShoppingCart.css';

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
          <CheckoutCard page="cart" />
        </Col>
      </Row>
    </div>
  );
}

export default ShoppingCart;
