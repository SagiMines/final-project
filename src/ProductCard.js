import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import './styles/ProductCard.css';

function ProductCard(props) {
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

        <Card.Img
          src={
            (props.product && props.product.image) ||
            'https://d3m9l0v76dty0.cloudfront.net/system/photos/7649724/large/2f4ab58b69e32e69c9ea56a346cf1271.jpg'
          }
        />
        <Card.Body>
          <Card.Title>
            {(props.product && props.product.product_name) ||
              'Dewalt DCD999 Hammer Drill'}
          </Card.Title>
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
              <Card.Text>
                {props.product && props.product.discount ? (
                  <>
                    Price:{' '}
                    <span className="old-price">
                      {props.product.unit_price}$
                    </span>
                    {` ${
                      props.product.unit_price -
                      props.product.unit_price * props.product.discount * 0.01
                    }`}
                    $
                  </>
                ) : (
                  `Price: ${
                    props.product ? `${props.product.unit_price}$` : '20$'
                  }`
                )}
              </Card.Text>
              <Card.Text
                className={
                  props.product
                    ? props.product.units_in_stock
                      ? 'on-stock'
                      : 'out-of-stock'
                    : 'on-stock'
                }
              >
                {props.product
                  ? props.product.units_in_stock
                    ? 'On Stock!'
                    : 'Out of Stock'
                  : 'On Stock!'}
              </Card.Text>
            </section>
          )}
          {props.page === 'order-confirmation' && (
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
              <Button disabled={props.product.units_in_stock ? false : true}>
                Buy now
              </Button>
              <Button disabled={props.product.units_in_stock ? false : true}>
                Add to cart
              </Button>
              <a className="card-button col-md">
                <i className="fa fa-solid fa-heart"></i>
              </a>
            </section>
          )}
          {(props.page === 'cart' || props.page === 'review') && (
            <section className="card-buttons row">
              <Row>
                <Col>
                  <Card.Text>Price: 10$</Card.Text>
                </Col>

                <Col className="amount">
                  <NumericInput min={1} max={100} value={1} />
                </Col>
              </Row>
              <Row className="buttons-section">
                <Col lg={6}>
                  <Button>Delete</Button>
                </Col>
                <Col lg={6}>
                  <Button>Move to Wishlist</Button>
                </Col>
              </Row>
            </section>
          )}

          {props.page === 'order-confirmation' && (
            <Card.Text>Quantity: 1</Card.Text>
          )}
          {props.page === 'order-confirmation' && (
            <Card.Text>Total Price: 10$</Card.Text>
          )}
          <div></div>
        </Card.Body>
      </Card>
    </>
  );
}
export default ProductCard;
