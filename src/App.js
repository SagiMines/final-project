import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import RoutesManager from './RoutesManager';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import { getUserIdFromCookie } from './DAL/serverData';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //get the user ID (if exists)
    (async () => {
      const userId = await getUserIdFromCookie();
      setUser(userId ? { userId } : null);
    })();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar key={user ? 1 : 0} />
        <RoutesManager />
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
