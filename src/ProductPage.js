import { Card, Form, Button } from 'react-bootstrap';
import ProductCarousel from './ProductCarousel';
import './ProductPage.css';

function ProductPage() {
  return (
    <div className="container-fluid product">
      <div className="row">
        <ProductCarousel></ProductCarousel>
        <Card className="col-sm">
          <Card.Body>
            <Card.Title>
              DeWalt DCD999 Hammer Drill With 20V 5Ah Battery
            </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Card.Text>
            <section className="quantity">
              <Form.Select aria-label="Default select example">
                <option hidden>Quantity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <span>On Stock!</span>
            </section>
            <section className="buttons">
              <Button>Buy now!</Button>
              <Button>Add to cart</Button>
              <i className="fa fa-solid fa-heart"></i>
            </section>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ProductPage;
