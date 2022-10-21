import { Card } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ShippingDetailsCard from './ShippingDetailsCard';

function Order(props) {
  return (
    <Card className="main-card">
      <Card.Body>
        <Card.Title>{`Order #${props.order.id}`}</Card.Title>
        <ShippingDetailsCard page="my-orders" />
        {props.order.orderDetails.map(product => (
          <ProductCard page="my-orders" orderDetails={product} />
        ))}
        <section className="order-summary">
          <Card.Title>
            Order date:{' '}
            {new Date(props.order.orderDate)
              .toLocaleDateString()
              .split('.')
              .join('/')}
          </Card.Title>
          <Card.Title>
            Total purchase:{' '}
            {props.order.orderDetails.length > 1
              ? props.order.orderDetails.reduce(
                  (a, b) => a.finalPrice + b.finalPrice
                )
              : props.order.orderDetails[0].finalPrice}
            $
          </Card.Title>
        </section>
      </Card.Body>
    </Card>
  );
}

export default Order;
