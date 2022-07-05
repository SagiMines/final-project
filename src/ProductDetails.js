import CategoryAside from './CategoryAside';
import ProductPage from './ProductPage';
import './ProductDetails.css';

function ProductDetails() {
  return (
    <div className="main-content">
      <CategoryAside></CategoryAside>
      <ProductPage></ProductPage>
    </div>
  );
}

export default ProductDetails;
