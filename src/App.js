import ProductDetails from './ProductDetails';
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';
import WishList from './WishList';
import ShoppingCart from './ShoppingCart';
import ReviewOrder from './ReviewOrder';
import OrderConfirmation from './OrderConfirmation';
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
      <OrderConfirmation />
      <footer className="bg-light text-center text-lg-start position-sticky">
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
