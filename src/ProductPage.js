import { Carousel, Card, Form, Button } from 'react-bootstrap';
import './ProductPage.css';

function ProductPage() {
  return (
    <div className="container-fluid product">
      <div className="row">
        <Carousel fade variant="dark" className="col-sm">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="http://www.tooled-up.com/artwork/prodzoom/DEW-DCD999-DeWalt-18v-Flexvolt-Advantage-Combi-Hammer-Drill.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/DCD999B/DCD999B_5.jpg?resize=530x530"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.dewalt.co.uk/EANZ/PRODUCT/IMAGES/3000x3000x96//DCD999T1/DCD999T1_3.jpg?resize=600x600"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
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
