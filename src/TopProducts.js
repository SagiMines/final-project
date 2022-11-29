import ProductCarousel from './ProductCarousel';
import { Row } from 'react-bootstrap';
import './styles/TopProducts.css';

function TopProducts(props) {
  return (
    <div className="top-products container-fluid">
      <h1 className="top-products-text">Top Products</h1>

      <Row>
        <ProductCarousel topProducts={props.topProducts} />
      </Row>
    </div>
  );
}

export default TopProducts;
