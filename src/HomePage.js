import CategoryAside from './CategoryAside';
import Banner from './Banner';
import TopProducts from './TopProducts';
import LoadingGif from './LoadingGif';
import { useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';
import WhoAreWe from './WhoAreWe';
import CompaniesWeWorkWith from './CompaniesWeWorkWith';
import ContactUs from './ContactUs';
function HomePage() {
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
    <>
      {!topProducts && <LoadingGif />}
      {topProducts && (
        <>
          <Banner />
          <div className="main-content">
            <CategoryAside />
            <div className="main-content-container">
              <TopProducts topProducts={topProducts} />
              <WhoAreWe />
              <CompaniesWeWorkWith />
              <ContactUs />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
