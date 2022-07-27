import { Form, Card, Button } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import './ProductCard.css';

function StudentCard(props) {
  return (
    <>
      <Card className="product-card">
        {props.page === 'cart' && (
          <Form.Check
            className="choose-button"
            type="checkbox"
            id="default-checkbox"
            checked
          />
        )}

        <Card.Img src="https://d3m9l0v76dty0.cloudfront.net/system/photos/7649724/large/2f4ab58b69e32e69c9ea56a346cf1271.jpg" />
        <Card.Body>
          <Card.Title>Dewalt DCD999 Hammer Drill</Card.Title>
          {props.page === 'wishlist' && (
            <Card.Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.{' '}
            </Card.Text>
          )}
          {(props.page === 'cart' || props.page === 'category') && (
            <section className="cart-text">
              <Card.Text>Price: 10$</Card.Text>
              <Card.Text className="stock">On Stock!</Card.Text>
            </section>
          )}
          {(props.page === 'review' || props.page === 'order-confirmation') && (
            <Card.Text>Price: 10$</Card.Text>
          )}
          {props.page === 'wishlist' && (
            <section className="card-buttons row">
              <Button className="card-button col-md">Add to cart</Button>
              <Button className="card-button col-md">Buy now</Button>
              <Button className="card-button col-md">Delete</Button>
            </section>
          )}
          {props.page === 'category' && (
            <section className="card-buttons row">
              <Button>Buy now</Button>
              <Button>Add to cart</Button>
              <a className="card-button col-md">
                <i className="fa fa-solid fa-heart"></i>
              </a>
            </section>
          )}
          {(props.page === 'cart' || props.page === 'review') && (
            <section className="card-buttons row">
              <div className="card-button col-lg-3">
                <NumericInput min={1} max={100} value={1} />
              </div>

              <Button className="card-button col-lg">Delete</Button>
              <Button className="card-button col-lg">Move to Wishlist</Button>
            </section>
          )}

          {props.page === 'order-confirmation' && (
            <Card.Text>Quantity: 1</Card.Text>
          )}
          {props.page === 'order-confirmation' && (
            <Card.Text>Total Price: 10$</Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
export default StudentCard;
