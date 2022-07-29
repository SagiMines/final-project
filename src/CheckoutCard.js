import { Card, Button } from 'react-bootstrap';
import './styles/CheckoutCard.css';

function CheckoutCard(props) {
  return (
    <Card className="checkout-card">
      <Card.Body>
        <Card.Title>Total Amount (2 Items): 30$</Card.Title>
        <Button className="checkout-button">
          {props.page === 'cart' ? 'Proceed to checkout' : 'Place your order'}
        </Button>
        {props.page === 'review' && (
          <Button className="checkout-button">Cancle</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CheckoutCard;
