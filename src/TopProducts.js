import ProductCarousel from './ProductCarousel';
import { Row, Col } from 'react-bootstrap';
import './styles/TopProducts.css';

function TopProducts() {
  return (
    <div className="top-products container-fluid">
      <Row>
        <label className="top-products-text">Top Products</label>
      </Row>
      <Row>
        <ProductCarousel />
      </Row>
    </div>
  );
}

export default TopProducts;
