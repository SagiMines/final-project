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
import ErrorPage from './ErrorPage';
import { getReq } from './DAL/serverData';
function RoutesManager() {
  const { user } = useContext(UserContext);
  const { guestTotalCartItems } = useContext(UserContext);
  const [state, setState] = useState();
  const location = useLocation();

  //Checks if the user has the right authentication to access certain pages
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

    if (
      location.pathname === '/email-confirmation-register' &&
      isAuthenticated.statusCode === 403
    )
      setState(
        state
          ? { ...state, registerVerified: false }
          : { registerVerified: false }
      );
    else if (
      location.pathname === '/email-confirmation-register' &&
      isAuthenticated === true
    )
      setState(
        state
          ? { ...state, registerVerified: true }
          : { registerVerified: true }
      );
    if (
      location.pathname === '/register-success' &&
      isAuthenticated.statusCode === 403
    )
      setState(
        state ? { ...state, registerDone: false } : { registerDone: false }
      );
    else if (
      location.pathname === '/register-success' &&
      isAuthenticated === true
    )
      setState(
        state ? { ...state, registerDone: true } : { registerDone: true }
      );
    if (
      location.pathname === '/order-confirmation' &&
      isAuthenticated.statusCode === 403
    )
      setState(
        state ? { ...state, orderComplete: false } : { orderComplete: false }
      );
    else if (
      location.pathname === '/order-confirmation' &&
      isAuthenticated === true
    )
      setState(
        state ? { ...state, orderComplete: true } : { orderComplete: true }
      );
  };

  useEffect(() => {
    if (
      location.pathname === '/my-account' ||
      location.pathname === '/change-password' ||
      location.pathname === '/my-orders' ||
      location.pathname === '/change-password-approved' ||
      location.pathname === '/change-password-success' ||
      location.pathname === '/email-confirmation-password' ||
      location.pathname === '/email-confirmation-register' ||
      location.pathname === '/register-success' ||
      location.pathname === '/order-confirmation'
    ) {
      checkIfAuthenticated();
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/wishlist" element={<WishList />} />

      <Route path="/shopping-cart" element={<ShoppingCart />} />

      <Route path="/login" element={<LogIn />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPW1 />} />

      <Route path="/categories/:id" element={<CategoryPage />} />

      {((user &&
        user.totalCartItems !== 0 &&
        user.totalCartItems !== undefined) ||
        (!user &&
          guestTotalCartItems !== 0 &&
          guestTotalCartItems !== undefined)) && (
        <Route path="/review-order" element={<ReviewOrder />} />
      )}

      {((user &&
        (user.totalCartItems === 0 || user.totalCartItems === undefined)) ||
        (!user &&
          (guestTotalCartItems === 0 || guestTotalCartItems === undefined))) &&
        location.pathname === '/review-order' && (
          <Route
            //If don't have authentication - forbidden page
            path="/review-order"
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {state &&
        location.pathname === '/order-confirmation' &&
        state.orderComplete && (
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        )}

      {state &&
        location.pathname === '/order-confirmation' &&
        state.orderComplete === false && (
          <Route
            //If don't have authentication - forbidden page
            path="/order-confirmation"
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {state &&
        location.pathname === '/register-success' &&
        state.registerDone && (
          <Route path="/register-success" element={<RegisterSuccess />} />
        )}

      {state &&
        location.pathname === '/register-success' &&
        state.registerDone === false && (
          <Route
            //If don't have authentication - forbidden page
            path="/register-success"
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {state &&
        location.pathname === '/change-password-approved' &&
        state.forgotPasswordApproved && (
          <Route
            path="/change-password-approved"
            element={<ChangePassword />}
          />
        )}

      {state &&
        location.pathname === '/change-password-approved' &&
        state.forgotPasswordApproved === false && (
          <Route
            //If don't have authentication - forbidden page
            path="/change-password-approved"
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {state &&
        location.pathname === '/change-password-success' &&
        state.finishedForgotPassword && (
          <Route
            path="/change-password-success"
            element={<PasswordChangeSuccess />}
          />
        )}

      {state &&
        location.pathname === '/change-password-success' &&
        state.finishedForgotPassword === false && (
          <Route
            //If don't have authentication - forbidden page
            path="/change-password-success"
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {state && location.pathname === '/my-account' && state.authenticated && (
        <Route path="/my-account" element={<MyAccount />} />
      )}

      {state &&
        location.pathname === '/change-password' &&
        state.authenticated && (
          <Route
            path="/change-password"
            element={<ChangePassword page="update" />}
          />
        )}

      {state && location.pathname === '/my-orders' && state.authenticated && (
        <Route path="/my-orders" element={<MyOrders />} />
      )}

      {state &&
        (location.pathname === '/my-account' ||
          location.pathname === '/change-password' ||
          location.pathname === '/my-orders') &&
        state.authenticated === false && (
          <Route
            //If don't have authentication - forbidden page
            path={location.pathname}
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {state &&
        location.pathname === '/email-confirmation-register' &&
        state.registerVerified && (
          <Route
            path="/email-confirmation-register"
            element={<EmailConfirmationPage page="register" />}
          />
        )}

      {state &&
        location.pathname === '/email-confirmation-register' &&
        state.registerVerified === false && (
          <Route
            //If don't have authentication - forbidden page
            path="/email-confirmation-register"
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {state &&
        location.pathname === '/email-confirmation-password' &&
        state.forgotPasswordEmailApproved && (
          <Route
            path="/email-confirmation-password"
            element={<EmailConfirmationPage page="forgot-password" />}
          />
        )}

      {state &&
        location.pathname === '/email-confirmation-password' &&
        state.forgotPasswordEmailApproved === false && (
          <Route
            //If don't have authentication - forbidden page
            path="/email-confirmation-password"
            element={<ErrorPage page="forbidden" />}
          />
        )}

      {location.pathname !== '/my-account' &&
        location.pathname !== '/change-password' &&
        location.pathname !== '/my-orders' &&
        location.pathname !== '/change-password-approved' &&
        location.pathname !== '/email-confirmation-password' &&
        location.pathname !== '/change-password-success' &&
        location.pathname !== '/email-confirmation-register' &&
        location.pathname !== '/register-success' &&
        location.pathname !== '/order-confirmation' && (
          <Route
            //Any other route that doesn't exist - not found page
            path="/*"
            element={<ErrorPage page="not-found" />}
          />
        )}
    </Routes>
  );
}

export default RoutesManager;
