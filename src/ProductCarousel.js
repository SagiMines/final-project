import { Carousel } from 'react-bootstrap';
import './styles/ProductCarousel.css';

function ProductCarousel(props) {
  const getTopProducts = () => {
    const data = props.data;
    const topProductsArr = [];
    const topProductsImagesArr = [];
    for (const topProduct of data.topProducts) {
      topProductsArr.push(
        data.products.find(product => product.id === topProduct.productId)
      );
      topProductsImagesArr.push(
        data.productImages.find(image => image.id === topProduct.productId)
          .imageSrc
      );
    }
    return topProductsImagesArr;
  };

  return (
    <Carousel fade variant="dark" className="col-sm">
      {props.images
        ? props.images.map((image, idx) => (
            <Carousel.Item key={idx.toString()}>
              <img
                className="d-block w-100"
                src={image.imageSrc}
                title={props.name}
                alt={`#${idx + 1} slide`}
              />
            </Carousel.Item>
          ))
        : getTopProducts().map((image, idx) => (
            <Carousel.Item key={idx.toString()}>
              <img
                className="d-block w-100 "
                src={image}
                title={`Top Product #${idx + 1}`}
                alt={`#${idx + 1} slide`}
              />
            </Carousel.Item>
          ))}
    </Carousel>
  );
}

export default ProductCarousel;
