import CategoryAside from './CategoryAside';
import Banner from './Banner';
import TopProducts from './TopProducts';
import { UserContext } from './UserContext';
import { useContext } from 'react';
function HomePage(props) {
  const { user, setUser } = useContext(UserContext);

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
