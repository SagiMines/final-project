import { Carousel } from 'react-bootstrap';
import './ProductCarousel.css';

function ProductCarousel() {
  return (
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
  );
}

export default ProductCarousel;
