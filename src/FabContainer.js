import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/FabContainer.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';
function FabContainer() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="fab-container">
      <Row>
        <Link className="fab-link" to="/shopping-cart">
          <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
            <Fab size="medium" className="fab-cart">
              <i className="fas fa-shopping-cart fab-icon"></i>
              {user &&
                user.totalCartItems !== 0 &&
                user.totalCartItems !== undefined && (
                  <div className="fab-cart-amount-popon">
                    <Row>{user.totalCartItems}</Row>
                  </div>
                )}
            </Fab>
          </Zoom>
        </Link>
      </Row>
    </div>
  );
}

export default FabContainer;
