import ProductCarousel from './ProductCarousel';
import { Row } from 'react-bootstrap';
import './styles/TopProducts.css';
import { useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';

function TopProducts(props) {
  const [topProducts, setTopProducts] = useState();

  const getTopProducts = async () => {
    const topProducts = await getReq('top-products');
    const topProductsDetails = [];
    for (const topProduct of topProducts) {
      const product = await getReq(
        `products/${topProduct.productId}?join=true`
      );
      topProductsDetails.push(product);
    }
    setTopProducts([...topProductsDetails]);
  };

  useEffect(() => {
    getTopProducts();
  }, []);

  return (
    <div className="top-products container-fluid">
      <Row>
        <label className="top-products-text">Top Products</label>
      </Row>
      <Row>
        <ProductCarousel topProducts={topProducts} />
      </Row>
    </div>
  );
}

export default TopProducts;
