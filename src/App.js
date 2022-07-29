import ProductDetails from './ProductDetails';
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';
import WishList from './WishList';
import ShoppingCart from './ShoppingCart';
import ReviewOrder from './ReviewOrder';
import OrderConfirmation from './OrderConfirmation';
import LogIn from './LogIn';
import Register from './Register';
import RegisterSuccess from './RegisterSuccess';
import ForgotPW1 from './ForgotPW1';
import ForgotPW2 from './ForgotPW2';
import ChangePassword from './ChangePassword';
import PasswordChangeSuccess from './PasswordChangeSuccess';
import MyAccount from './MyAccount';
import MyOrders from './MyOrders';
import CategoryPage from './CategoryPage';
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
      <header>
        <Navbar></Navbar>
      </header>
      {/* <HomePage /> */}
      {/* <ProductDetails data={data} id={6}></ProductDetails> */}
      {/* <WishList /> */}
      {/* <ShoppingCart /> */}
      {/* <ReviewOrder /> */}
      {/* <OrderConfirmation /> */}
      {/* <LogIn /> */}
      {/* <Register /> */}
      {/* <RegisterSuccess /> */}
      {/* <ForgotPW1 /> */}
      {/* <ForgotPW2 /> */}
      {/* <ChangePassword /> */}
      {/* <PasswordChangeSuccess /> */}
      {/* <MyAccount /> */}
      {/* <ChangePassword page="update" /> */}
      {/* <MyOrders /> */}
      <CategoryPage categoryData={chosenCategoryData()} />
      <footer className="bg-light text-center text-lg-start position-sticky">
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
