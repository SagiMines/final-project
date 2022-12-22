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
import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import NotFound from './NotFound';
import { getReq } from './DAL/serverData';
function RoutesManager() {
  const { user } = useContext(UserContext);
  const [state, setState] = useState();
  const location = useLocation();

  const checkIfAuthenticated = async () => {
    const isAuthenticated = await getReq(
      `authentication-check${location.pathname}`
    );
    if (
      (location.pathname === '/my-account' ||
        location.pathname === '/change-password' ||
        location.pathname === '/my-orders') &&
      isAuthenticated.statusCode === 403
    )
      setState(
        state ? { ...state, authenticated: false } : { authenticated: false }
      );
    else if (
      (location.pathname === '/my-account' ||
        location.pathname === '/change-password' ||
        location.pathname === '/my-orders') &&
      isAuthenticated === true
    )
      setState(
        state ? { ...state, authenticated: true } : { authenticated: true }
      );

    if (
      location.pathname === '/change-password-approved' &&
      isAuthenticated.statusCode === 403
    )
      setState(
        state
          ? { ...state, forgotPasswordApproved: false }
          : { forgotPasswordApproved: false }
      );
    else if (
      location.pathname === '/change-password-approved' &&
      isAuthenticated === true
    )
      setState(
        state
          ? { ...state, forgotPasswordApproved: true }
          : { forgotPasswordApproved: true }
      );

    if (
      location.pathname === '/email-confirmation-password' &&
      isAuthenticated.statusCode === 403
    )
      setState(
        state
          ? { ...state, forgotPasswordEmailApproved: false }
          : { forgotPasswordEmailApproved: false }
      );
    else if (
      location.pathname === '/email-confirmation-password' &&
      isAuthenticated === true
    )
      setState(
        state
          ? { ...state, forgotPasswordEmailApproved: true }
          : { forgotPasswordEmailApproved: true }
      );
    if (
      location.pathname === '/change-password-success' &&
      isAuthenticated.statusCode === 403
    )
      setState(
        state
          ? { ...state, finishedForgotPassword: false }
          : { finishedForgotPassword: false }
      );
    else if (
      location.pathname === '/change-password-success' &&
      isAuthenticated === true
    )
      setState(
        state
          ? { ...state, finishedForgotPassword: true }
          : { finishedForgotPassword: true }
      );
  };

  const showNotAuthorized = () => {
    window.location.assign(
      `${
        process.env.NODE_ENV === 'production'
          ? 'https://server.workshop-il.com'
          : 'http://localhost:8000'
      }/api/authentication-check${location.pathname}`
    );
  };

  useEffect(() => {
    if (
      location.pathname === '/my-account' ||
      location.pathname === '/change-password' ||
      location.pathname === '/my-orders' ||
      location.pathname === '/change-password-approved' ||
      location.pathname === '/change-password-success' ||
      location.pathname === '/email-confirmation-password'
    ) {
      checkIfAuthenticated();
    }
  }, [location.pathname]);
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

      {state &&
        location.pathname === '/change-password-approved' &&
        state.forgotPasswordApproved && (
          <Route
            //needs to change to add the approval of phase 2
            path="/change-password-approved"
            element={<ChangePassword />}
          />
        )}
      {state &&
        location.pathname === '/change-password-approved' &&
        state.forgotPasswordApproved === false &&
        showNotAuthorized()}

      {state &&
        location.pathname === '/change-password-success' &&
        state.finishedForgotPassword && (
          <Route
            //needs to change to add the approval change password phase
            path="/change-password-success"
            element={<PasswordChangeSuccess />}
          />
        )}
      {state &&
        location.pathname === '/change-password-success' &&
        state.finishedForgotPassword === false &&
        showNotAuthorized()}

      {state && location.pathname === '/my-account' && state.authenticated && (
        <Route
          //needs to change to add the user's ID
          path="/my-account"
          element={<MyAccount />}
        />
      )}
      {state &&
        location.pathname === '/change-password' &&
        state.authenticated && (
          <Route
            //needs to change to add the user's ID
            path="/change-password"
            element={<ChangePassword page="update" />}
          />
        )}
      {state && location.pathname === '/my-orders' && state.authenticated && (
        <Route
          //needs to change to add the user's ID/orders ID
          path="/my-orders"
          element={<MyOrders />}
        />
      )}
      {state &&
        (location.pathname === '/my-account' ||
          location.pathname === '/change-password' ||
          location.pathname === '/my-orders') &&
        state.authenticated === false &&
        showNotAuthorized()}

      <Route path="/categories/:id" element={<CategoryPage />} />
      <Route
        //needs to change to add the user's ID/orders ID
        path="/email-confirmation-register"
        element={<EmailConfirmationPage page="register" />}
      />
      {state &&
        location.pathname === '/email-confirmation-password' &&
        state.forgotPasswordEmailApproved && (
          <Route
            //needs to change to add the user's ID/orders ID
            path="/email-confirmation-password"
            element={<EmailConfirmationPage page="forgot-password" />}
          />
        )}
      {state &&
        location.pathname === '/email-confirmation-password' &&
        state.forgotPasswordEmailApproved === false &&
        showNotAuthorized()}

      {location.pathname !== '/my-account' &&
        location.pathname !== '/change-password' &&
        location.pathname !== '/my-orders' &&
        location.pathname !== '/change-password-approved' &&
        location.pathname !== '/email-confirmation-password' &&
        location.pathname !== '/change-password-success' && (
          <Route
            //Any other route that doesn't exist
            path="/*"
            element={<NotFound />}
          />
        )}
    </Routes>
  );
}

export default RoutesManager;
