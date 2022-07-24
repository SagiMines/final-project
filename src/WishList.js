import ProductCard from './ProductCard';
import './WishList.css';

function WishList() {
  return (
    <div className="container wishlist-container">
      <h1 className="wishlist-title">Your Wish List</h1>
      <ProductCard page="wishlist" />
    </div>
  );
}

export default WishList;
