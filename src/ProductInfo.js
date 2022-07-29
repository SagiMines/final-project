import NumericInput from 'react-numeric-input';
import { Card, Button } from 'react-bootstrap';
import './styles/ProductInfo.css';

function ProductInfo(props) {
  return (
    <Card className="col-sm">
      <Card.Body>
        <Card.Title>{props.data.product_name}</Card.Title>
        <Card.Text>{props.data.description}</Card.Text>
        <section className="quantity">
          {props.data.units_in_stock !== 0 && (
            <NumericInput min={1} max={99} value={1} />
          )}

          <span
            className={props.data.units_in_stock ? 'on-stock' : 'out-of-stock'}
          >
            {props.data.units_in_stock > 0 ? 'On Stock!' : 'Out of Stock'}
          </span>
        </section>
        <Card.Title className="price">
          {props.data.discount ? (
            <>
              Price: <span>{props.data.unit_price}$</span>
              {` ${
                props.data.unit_price -
                props.data.unit_price * props.data.discount * 0.01
              }`}
              $ ({props.data.discount}% discount)
            </>
          ) : (
            `Price: ${props.data.unit_price}$`
          )}
        </Card.Title>
        <section className="buttons">
          <Button disabled={props.data.units_in_stock ? false : true}>
            Buy now!
          </Button>
          <Button disabled={props.data.units_in_stock ? false : true}>
            Add to cart
          </Button>
          <i className="fa fa-solid fa-heart"></i>
        </section>
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;
