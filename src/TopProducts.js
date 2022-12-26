import ProductCarousel from './ProductCarousel';
import { Row } from 'react-bootstrap';
import './styles/TopProducts.css';

function TopProducts(props) {
  return (
    <div className="top-products container-fluid">
      <h1
        className="top-products-text aos-fix"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        Top Products
      </h1>

      <Row className="aos-fix" data-aos="fade-up" data-aos-duration="2000">
        <ProductCarousel topProducts={props.topProducts} />
      </Row>
    </div>
  );
}

export default TopProducts;
