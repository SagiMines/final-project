import { Card } from 'react-bootstrap';
import './ShippingDetailsCard.css';

function ShippingDetailsCard(props) {
  return (
    <Card className="shipping-details-card">
      <Card.Body>
        <Card.Title>
          Shipping Details{' '}
          {props.page === 'review' && (
            <Card.Link className="change-address">Change</Card.Link>
          )}
        </Card.Title>
        <Card.Text>Sagi Mines</Card.Text>
        <Card.Text>0528850658</Card.Text>
        <Card.Text>Ha'Onot 6</Card.Text>
        <Card.Text>Apartment 51, floor 6</Card.Text>
        <Card.Text>Ashkelon, 7872026</Card.Text>
        <Card.Text>Israel</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ShippingDetailsCard;
