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
import './App.css';

function App() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      {/* <HomePage /> */}
      {/* <ProductDetails></ProductDetails> */}
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
      <MyOrders />
      <footer className="bg-light text-center text-lg-start position-sticky">
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
