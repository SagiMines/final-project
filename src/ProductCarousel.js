import { Carousel } from 'react-bootstrap';
import './styles/ProductCarousel.css';

function ProductCarousel(props) {
  //temp!!!
  const tempImages = [
    'https://www.brandtools.co.il/ProductsImages/U186135.jpg',
    'https://i5.walmartimages.com/asr/0c19ee25-a81d-4498-b827-ce613e4aa672_1.e06af0c3246ea50edc7d9be38346f387.jpeg',
    'https://d3m9l0v76dty0.cloudfront.net/system/photos/6339543/show/07bb0cd30502e1a579bc4922b91862c8.jpg',
  ];
  return (
    <Carousel fade variant="dark" className="col-sm">
      {props.images
        ? props.images.map((image, idx) => (
            <Carousel.Item key={idx.toString()}>
              <img
                className="d-block w-100"
                src={image.image_src}
                title={props.name}
                alt={`#${idx + 1} slide`}
              />
            </Carousel.Item>
          ))
        : //temp!!!
          tempImages.map((image, idx) => (
            <Carousel.Item key={idx.toString()}>
              <img
                className="d-block w-100"
                src={image}
                title={'bla'}
                alt={`#${idx + 1} slide`}
              />
            </Carousel.Item>
          ))}
    </Carousel>
  );
}

export default ProductCarousel;
