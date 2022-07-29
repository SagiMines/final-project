import ShippingDetailsCard from './ShippingDetailsCard';
import ProductCard from './ProductCard';
import { Card, Col, Row } from 'react-bootstrap';
import './styles/OrderConfirmation.css';

function OrderConfirmation() {
  return (
    <div className="container order-confirmation-container">
      <h1 className="order-confirmation-title">Order #12 Confirmation</h1>
      <ShippingDetailsCard page="order-confirmation" />
      <Row className="review-data">
        <Col md>
          <ProductCard page="order-confirmation" />
          <ProductCard page="order-confirmation" />
          <Card>
            <Card.Body>
              <Card.Title>Purchase Total: 20$</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <img className="thank-you-logo" src="thank-you.png"></img>
        </Col>
      </Row>
    </div>
  );
}

export default OrderConfirmation;
