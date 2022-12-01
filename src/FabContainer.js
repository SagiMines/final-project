import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/FabContainer.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
function FabContainer(props) {
  const { user } = useContext(UserContext);
  const { guestTotalCartItems } = useContext(UserContext);
  const [tabOpen, setTabOpen] = useState();

  const handleTabClick = () => {
    setTabOpen(!tabOpen);
  };

  useEffect(() => {
    if (props.user) {
      if (user.totalCartItems !== 0 && user.totalCartItems !== undefined) {
        setTabOpen(true);
      } else setTabOpen(false);
    } else {
      if (guestTotalCartItems !== 0 && guestTotalCartItems !== undefined) {
        setTabOpen(true);
      } else setTabOpen(false);
    }
  }, [props.user ? user.totalCartItems : guestTotalCartItems]);

  return (
    <div className="fab-container">
      <Row>
        {tabOpen && (
          <>
            <i
              className="fas fa-angle-right close-tab tab"
              onClick={handleTabClick}
            />
            <Link className="fab-link" to="/shopping-cart">
              <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                <Fab size="medium" className="fab-cart">
                  <i className="fas fa-shopping-cart fab-icon" />

                  <div className="fab-cart-amount-popon">
                    {props.user &&
                      user.totalCartItems !== 0 &&
                      user.totalCartItems !== undefined && (
                        <Row>{user.totalCartItems}</Row>
                      )}
                    {!props.user &&
                      guestTotalCartItems !== 0 &&
                      guestTotalCartItems !== undefined && (
                        <Row>{guestTotalCartItems}</Row>
                      )}
                  </div>
                </Fab>
              </Zoom>
            </Link>
            <Link className="fab-link" to="/wishlist">
              <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                <Fab size="medium" className="fab-cart">
                  <i className="fas fa-heart fab-icon" />
                </Fab>
              </Zoom>
            </Link>
          </>
        )}
        {!tabOpen && (
          <>
            <i className="fas fa-angle-left tab" onClick={handleTabClick} />
          </>
        )}
      </Row>
    </div>
  );
}

export default FabContainer;
