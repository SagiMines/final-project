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
import ChangePassword from './ChangePassword';
import PasswordChangeSuccess from './PasswordChangeSuccess';
import MyAccount from './MyAccount';
import MyOrders from './MyOrders';
import EmailConfirmationPage from './EmailConfirmationPage';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
function RoutesManager() {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route
        //needs to change to match each product's ID
        path="/product/:id"
        element={<ProductDetails />}
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
      {user && (
        <Route
          //needs to change to add the user's ID
          path="/my-account"
          element={<MyAccount />}
        />
      )}
      {user && (
        <Route
          //needs to change to add the user's ID
          path="/change-password"
          element={<ChangePassword page="update" />}
        />
      )}
      {user && (
        <Route
          //needs to change to add the user's ID/orders ID
          path="/my-orders"
          element={<MyOrders />}
        />
      )}
      <Route path="/categories/:id" element={<CategoryPage />} />
      <Route
        //needs to change to add the user's ID/orders ID
        path="/email-confirmation-register"
        element={<EmailConfirmationPage page="register" />}
      />
      <Route
        //needs to change to add the user's ID/orders ID
        path="/email-confirmation-password"
        element={<EmailConfirmationPage page="forgot-password" />}
      />
    </Routes>
  );
}

export default RoutesManager;
