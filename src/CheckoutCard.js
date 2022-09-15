import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/CheckoutCard.css';

function CheckoutCard(props) {
  return (
    <Card className="checkout-card">
      <Card.Body>
        <Card.Title>Total Amount (2 Items): 30$</Card.Title>
        <Link
          to={props.page === 'cart' ? '/review-order' : '/order-confirmation'}
        >
          <Button className="checkout-button">
            {props.page === 'cart' ? 'Proceed to checkout' : 'Place your order'}
          </Button>
        </Link>
        {props.page === 'review' && (
          <Button className="checkout-button">Cancle</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CheckoutCard;
