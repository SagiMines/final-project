import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import RoutesManager from './RoutesManager';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import { getUserIdFromCookie } from './DAL/serverData';
import { UserContext } from './UserContext';
import FabContainer from './FabContainer';

function App() {
  const [user, setUser] = useState();
  const [guestTotalCartItems, setGuestTotalCartItems] = useState();

  const getUser = async () => {
    const userId = await getUserIdFromCookie();
    console.log(userId);
    setUser(userId !== false ? { userId } : null);

    if (!userId) {
      if (!localStorage.getItem('guestCart')) {
        localStorage.setItem('guestCart', JSON.stringify([]));
        setGuestTotalCartItems(0);
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart'));
        const cartTotalItems = guestCart.reduce((accumulator, object) => {
          return accumulator + object.amount;
        }, 0);
        setGuestTotalCartItems(cartTotalItems);
      }
      if (!localStorage.getItem('guestWishlist')) {
        localStorage.setItem('guestWishlist', JSON.stringify([]));
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <UserContext.Provider
        value={{ user, setUser, guestTotalCartItems, setGuestTotalCartItems }}
      >
        {(user || guestTotalCartItems >= 0) && (
          <>
            <Navbar key={user ? 1 : 0} />
            {user &&
              user.totalCartItems !== 0 &&
              user.totalCartItems !== undefined && <FabContainer user={true} />}
            {!user &&
              guestTotalCartItems !== 0 &&
              guestTotalCartItems !== undefined && <FabContainer />}
            <RoutesManager />
            <Footer />
          </>
        )}
      </UserContext.Provider>
    </Router>
  );
}

export default App;
