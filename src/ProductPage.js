import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo';
import './ProductPage.css';

function ProductPage(props) {
  return (
    <div className="container-fluid product">
      <div className="row">
        <ProductCarousel
          images={props.images}
          name={props.data.product_name}
        ></ProductCarousel>
        <ProductInfo data={props.data}></ProductInfo>
      </div>
    </div>
  );
}

export default ProductPage;
