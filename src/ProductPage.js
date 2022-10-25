import ProductCarousel from './ProductCarousel';
import './styles/ProductPage.css';
import { useState, useEffect } from 'react';
import { getReq } from './DAL/serverData';
import ProductCard from './ProductCard';

function ProductPage(props) {
  const [product, setProduct] = useState();

  const getProductData = async () => {
    const productData = await getReq(`products/${props.productId}?join=true`);
    setProduct({ ...productData });
  };

  useEffect(() => {
    getProductData();
  }, [props.productId]);
  return (
    <div className="container-fluid product">
      {product && (
        <div className="row">
          <ProductCarousel
            images={product.productImages}
            name={product.productName}
          />

          <ProductCard page="product-page" productData={product} />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
