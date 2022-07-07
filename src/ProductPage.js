import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo';
import './ProductPage.css';

function ProductPage() {
  return (
    <div className="container-fluid product">
      <div className="row">
        <ProductCarousel></ProductCarousel>
        <ProductInfo></ProductInfo>
      </div>
    </div>
  );
}

export default ProductPage;
