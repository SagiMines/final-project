import NumericInput from 'react-numeric-input';
import { Row, Col } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import './styles/ProductInfo.css';

function ProductInfo(props) {
  const { user, setUser } = useContext(UserContext);

  return (
    <Card className="col-sm">
      <Card.Body>
        <Card.Title>{props.data.productName}</Card.Title>
        <Card.Text>{props.data.description}</Card.Text>
        <section className="quantity">
          {props.data.unitsInStock !== 0 && (
            <NumericInput min={1} max={props.data.unitsInStock} value={1} />
          )}

          <span
            className={props.data.unitsInStock ? 'on-stock' : 'out-of-stock'}
          >
            {props.data.unitsInStock > 0 ? 'On Stock!' : 'Out of Stock'}
          </span>
        </section>
        <Card.Title className="price">
          {props.data.discount ? (
            <>
              Price: <span>{props.data.unitPrice}$</span>
              {` ${
                props.data.unitPrice -
                props.data.unitPrice * props.data.discount * 0.01
              }`}
              $ ({props.data.discount}% discount)
            </>
          ) : (
            `Price: ${props.data.unitPrice}$`
          )}
        </Card.Title>
        <Row className="buttons">
          <Col xl={3}>
            <Button
              className="product-button"
              disabled={props.data.unitsInStock ? false : true}
            >
              Buy now!
            </Button>
          </Col>
          <Col xl={3}>
            <Button
              className="product-button"
              disabled={props.data.unitsInStock ? false : true}
            >
              Add to cart
            </Button>
          </Col>
          <Col xl={3} className="product-wishlist">
            {<i className="fa fa-solid fa-heart" slot={props.data.id}></i>}
            <i className="far fa-heart" slot={props.data.id}></i>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;
