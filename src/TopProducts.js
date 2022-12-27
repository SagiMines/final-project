import ProductCarousel from './ProductCarousel';
import { Row } from 'react-bootstrap';
import './styles/TopProducts.css';

function TopProducts(props) {
  return (
    <div className="top-products container-fluid">
      <h1
        className="top-products-text"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        Top Products
      </h1>

      <Row data-aos="fade-up" data-aos-duration="1500">
        <ProductCarousel topProducts={props.topProducts} />
      </Row>
    </div>
  );
}

export default TopProducts;
