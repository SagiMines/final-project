import CategoryAside from './CategoryAside';
import ProductPage from './ProductPage';
import { useParams } from 'react-router-dom';
function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="main-content">
      <CategoryAside />
      <ProductPage productId={id} />
    </div>
  );
}

export default ProductDetails;
