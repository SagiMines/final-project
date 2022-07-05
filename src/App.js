import ProductDetails from './ProductDetails';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar></Navbar>
      </header>
      <ProductDetails></ProductDetails>
    </div>
  );
}

export default App;
