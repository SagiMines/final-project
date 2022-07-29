import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import ShippingDetailsCard from './ShippingDetailsCard';
import './styles/ReviewOrder.css';

function ReviewOrder() {
  return (
    <div className="container review-container">
      <h1 className="review-title">Review Your Order</h1>
      <ShippingDetailsCard page="review" />
      <Row className="review-data">
        <Col md>
          <ProductCard page="review" />
          <ProductCard page="review" />
        </Col>
        <Col md>
          <CheckoutCard page="review" />
        </Col>
      </Row>
    </div>
  );
}

export default ReviewOrder;
