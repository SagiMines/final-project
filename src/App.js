import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import RoutesManager from './RoutesManager';
import { useState } from 'react';
import { getProducts, getProductImages, getCategories } from './DAL/database';
import './styles/App.css';

function App() {
  const [data, setData] = useState({
    categories: getCategories(),
    products: getProducts(),
    productImages: getProductImages(),
  });

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

  return (
    <div>
      <Navbar></Navbar>
      <RoutesManager
        /*for CategoryPage: */ categoryData={chosenCategoryData()}
        /*for ProductDetails: */ data={data}
        id={2}
        /*for ChangePassword: */ page="update"
      />
      <Footer></Footer>
    </div>
  );
}

export default App;
