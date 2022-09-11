import CategoryAside from './CategoryAside';
import ProductPage from './ProductPage';
import './styles/ProductDetails.css';

function ProductDetails(props) {
  const getProductsById = () => {
    return props.data.products.find(product => product.id === props.id);
  };
  const getProductImages = () => {
    const tempArr = [];
    const check = props.data.productImages;
    for (const image of check) {
      if (image.productId === props.id) {
        tempArr.push(image);
      }
    }
    return tempArr;
  };

  return (
    <div className="main-content">
      <CategoryAside />
      <ProductPage data={getProductsById()} images={getProductImages()} />
    </div>
  );
}

export default ProductDetails;
