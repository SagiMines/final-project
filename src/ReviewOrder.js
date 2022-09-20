import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import ShippingDetailsCard from './ShippingDetailsCard';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import './styles/ReviewOrder.css';

function ReviewOrder() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="container review-container">
      <h1 className="review-title">Review Your Order</h1>
      <ShippingDetailsCard page="review" />
      <Row className="review-data">
        <Col md>
          {user.finalCart &&
            user.finalCart.map(
              (cart, idx) =>
                cart.checked && (
                  <ProductCard
                    page="review"
                    key={idx.toString()}
                    currentProduct={cart}
                  />
                )
            )}
        </Col>
        <Col md>
          <CheckoutCard
            page="review"
            cartSummary={{
              totalAmount: user.totalCartItems,
              totalPrice: user.totalCartPrice,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ReviewOrder;
