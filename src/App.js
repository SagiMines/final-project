import ProductDetails from './ProductDetails';
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar></Navbar>
      </header>
      <HomePage />
      {/* <ProductDetails></ProductDetails> */}
      <footer className="bg-light text-center text-lg-start position-sticky">
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
