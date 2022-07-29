import { Carousel } from 'react-bootstrap';
import './ProductCarousel.css';

function ProductCarousel(props) {
  return (
    <Carousel fade variant="dark" className="col-sm">
      {props.images.map((image, idx) => (
        <Carousel.Item key={idx.toString()}>
          <img
            className="d-block w-100"
            src={image.image_src}
            title={props.name}
            alt={`#${idx + 1} slide`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
