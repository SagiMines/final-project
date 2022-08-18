import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import RoutesManager from './RoutesManager';
import { useState, useEffect } from 'react';
import { getFromDB } from './DAL/database';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const products = await getFromDB('products');
    const productImages = await getFromDB('product-images');
    const categories = await getFromDB('categories');
    const topProducts = await getFromDB('top-products');
    setData({
      categories,
      products,
      productImages,
      topProducts,
    });
  };

  const chosenCategoryData = () => {
    const category = data.categories.find(category => category.id === 1);
    const products = [];
    for (const product of data.products) {
      if (product.category_id === 1) {
        const image = data.productImages.find(
          image => image.product_id === product.id
        );
        product['image'] = image.image_src;
        products.push(product);
      }
    }

    return { category, products };
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      {data && (
        <RoutesManager
          /*for CategoryPage: */ categoryData={chosenCategoryData()}
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
