import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/FabContainer.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';
function FabContainer(props) {
  const { user } = useContext(UserContext);
  const { guestTotalCartItems } = useContext(UserContext);
  return (
    <div className="fab-container">
      <Row>
        <Link className="fab-link" to="/shopping-cart">
          <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
            <Fab size="medium" className="fab-cart">
              <i className="fas fa-shopping-cart fab-icon"></i>

              <div className="fab-cart-amount-popon">
                {props.user && <Row>{user.totalCartItems}</Row>}
                {!props.user && <Row>{guestTotalCartItems}</Row>}
              </div>
            </Fab>
          </Zoom>
        </Link>
      </Row>
    </div>
  );
}

export default FabContainer;
