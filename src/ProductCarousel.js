import { Carousel } from 'react-bootstrap';
import './styles/ProductCarousel.css';

function ProductCarousel(props) {
  const getTopProducts = () => {
    const data = props.data;
    const topProductsArr = [];
    const topProductsImagesArr = [];
    for (const topProduct of data.topProducts) {
      topProductsArr.push(
        data.products.find(product => product.id === topProduct.product_id)
      );
      topProductsImagesArr.push(
        data.productImages.find(image => image.id === topProduct.product_id)
          .image_src
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
                src={image.image_src}
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
                title={'bla'}
                alt={`#${idx + 1} slide`}
              />
            </Carousel.Item>
          ))}
    </Carousel>
  );
}

export default ProductCarousel;
