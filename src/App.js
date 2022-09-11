import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import RoutesManager from './RoutesManager';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import { getReq } from './DAL/serverData';

function App() {
  const [data, setData] = useState();

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
  }, []);

  return (
    <Router>
      <Navbar />
      {data && (
        <RoutesManager
          /*for ProductDetails: */ data={data}
          id={2}
          /*for ChangePassword: */ page="update"
        />
      )}
      <Footer />
    </Router>
  );
}

export default App;
