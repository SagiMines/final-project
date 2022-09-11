import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo';
import './styles/ProductPage.css';

function ProductPage(props) {
  return (
    <div className="container-fluid product">
      <div className="row">
        <ProductCarousel
          images={props.images}
          name={props.data.productName}
        ></ProductCarousel>
        <ProductInfo data={props.data}></ProductInfo>
      </div>
    </div>
  );
}

export default ProductPage;
