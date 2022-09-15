import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import RoutesManager from './RoutesManager';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import { getReq, getUserIdFromCookie } from './DAL/serverData';
import { UserContext } from './UserContext';

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    const products = await getReq('products');
    const productImages = await getReq('product-images');
    const categories = await getReq('categories');
    const topProducts = await getReq('top-products');
    setData({
      categories,
      products,
      productImages,
      topProducts,
    });
  };

  useEffect(() => {
    fetchData();
    //get the user ID (if exists)
    (async () => {
      const userId = await getUserIdFromCookie();
      setUser(userId ? userId : null);
    })();
  }, []);

  return (
    <Router>
      <Navbar />
      {data && (
        <UserContext.Provider value={{ user, setUser }}>
          <RoutesManager
            /*for ProductDetails: */ data={data}
            id={2}
            /*for ChangePassword: */ page="update"
          />
        </UserContext.Provider>
      )}
      <Footer />
    </Router>
  );
}

export default App;
