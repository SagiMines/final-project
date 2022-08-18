import ProductCarousel from './ProductCarousel';
import { Row, Col } from 'react-bootstrap';
import './styles/TopProducts.css';

function TopProducts(props) {
  return (
    <div className="top-products container-fluid">
      <Row>
        <label className="top-products-text">Top Products</label>
      </Row>
      <Row>
        <ProductCarousel data={props.data} />
      </Row>
    </div>
  );
}

export default TopProducts;
