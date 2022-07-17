import CategoryAside from './CategoryAside';
import Banner from './Banner';
import TopProducts from './TopProducts';

function HomePage() {
  return (
    <>
      <Banner />
      <div className="main-content">
        <CategoryAside />
        <TopProducts />
      </div>
    </>
  );
}

export default HomePage;
