import CategoryAside from './CategoryAside';
import Banner from './Banner';
import TopProducts from './TopProducts';
function HomePage(props) {
  return (
    <>
      <Banner />
      <div className="main-content">
        <CategoryAside />
        <TopProducts data={props.data} />
      </div>
    </>
  );
}

export default HomePage;
