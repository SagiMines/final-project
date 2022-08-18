import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import ProductDetails from './ProductDetails';
import ShoppingCart from './ShoppingCart';
import ReviewOrder from './ReviewOrder';
import WishList from './WishList';
import LogIn from './LogIn';
import OrderConfirmation from './OrderConfirmation';
import Register from './Register';
import RegisterSuccess from './RegisterSuccess';
import ForgotPW1 from './ForgotPW1';
import ForgotPW2 from './ForgotPW2';
import ChangePassword from './ChangePassword';
import PasswordChangeSuccess from './PasswordChangeSuccess';
import MyAccount from './MyAccount';
import MyOrders from './MyOrders';
import { Routes, Route } from 'react-router-dom';

function RoutesManager(props) {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage data={props.data} />} />
      <Route
        //needs to change to match each product's ID
        path="/product"
        element={<ProductDetails data={props.data} id={props.id} />}
      />
      <Route
        //needs to change to match each user's ID
        path="/wishlist"
        element={<WishList />}
      />
      <Route
        //needs to change to match each user's ID
        path="/shopping-cart"
        element={<ShoppingCart />}
      />
      <Route
        //needs to change to match each user's ID and maybe the products ID's
        path="/review-order"
        element={<ReviewOrder />}
      />
      <Route
        //needs to change to match each user's ID and order's number/ID
        path="/order-confirmation"
        element={<OrderConfirmation />}
      />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
      <Route
        //needs to change to match the newly created user's ID
        path="/register-success"
        element={<RegisterSuccess />}
      />
      <Route path="/forgot-password" element={<ForgotPW1 />} />
      {/* <Route
          //needs to change to match the given email in phase 1
          path="/forgot-password-phase2"
          element={<ForgotPW2 />}
        /> */}
      <Route
        //needs to change to add the approval of phase 2
        path="/change-password-approved"
        element={<ChangePassword />}
      />
      <Route
        //needs to change to add the approval change password phase
        path="/change-password-success"
        element={<PasswordChangeSuccess />}
      />
      <Route
        //needs to change to add the user's ID
        path="/my-account"
        element={<MyAccount />}
      />
      <Route
        //needs to change to add the user's ID
        path="/change-password"
        element={<ChangePassword page={props.page} />}
      />
      <Route
        //needs to change to add the user's ID/orders ID
        path="/my-orders"
        element={<MyOrders />}
      />
      <Route
        //needs to change to match each category's ID
        path="/categories"
        element={<CategoryPage categoryData={props.categoryData} />}
      />
    </Routes>
  );
}

export default RoutesManager;
