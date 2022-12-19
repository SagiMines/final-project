import ProductCarousel from './ProductCarousel';
import './styles/ProductPage.css';
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { getReq } from './DAL/serverData';
import ProductCard from './ProductCard';
import CategoryAside from './CategoryAside';
import LoadingGif from './LoadingGif';
import CategoryAccordion from './CategoryAccordion';

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
    <>
      {!product && <LoadingGif />}
      {product && (
        <>
          <CategoryAside />
          {/* <CategoryAccordion /> */}
          <div className="container-fluid product">
            <CategoryAccordion />{' '}
            <div className="row">
              <ProductCarousel
                images={product.productImages}
                name={product.productName}
              />

              <ProductCard page="product-page" productData={product} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductPage;
