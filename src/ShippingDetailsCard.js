import { Card } from 'react-bootstrap';
import './styles/ShippingDetailsCard.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { getReq } from './DAL/serverData';
import { Link } from 'react-router-dom';

function ShippingDetailsCard(props) {
  const { user, setUser } = useContext(UserContext);
  const [orderData, setOrderData] = useState({});

  const getTheUserDetails = async () => {
    orderData.userDetails = await getReq(`users/${user.userId}`);
    console.log(orderData);
    setOrderData({ ...orderData });
    console.log(orderData.userDetails);
    areAllRequiredDetailsFilled();
  };

  const areAllRequiredDetailsFilled = () => {
    let isNotFilled = false;
    for (const value of Object.values(orderData.userDetails)) {
      if (!value) {
        isNotFilled = true;
        break;
      }
    }

    console.log(isNotFilled);
    if (isNotFilled) {
      orderData.shippingDetails = false;
      user.needToFillDetails = true;
      setUser({ ...user });
    } else {
      orderData.shippingDetails = true;
      delete user.needToFillDetails;
    }
  };

  useEffect(() => {
    getTheUserDetails();
  }, []);
  return (
    <Card className="shipping-details-card">
      {orderData.userDetails && (
        <Card.Body>
          <Card.Title>
            {!orderData.shippingDetails && (
              <>
                <Card.Text className="missing-shipping-details">
                  Please fill shipping details before proceeding
                </Card.Text>
              </>
            )}
            {orderData.shippingDetails ? `Shipping Details` : ''}
            {props.page === 'review' && (
              <Link to="/my-account">
                <Card.Link className="change-address">
                  {orderData.shippingDetails
                    ? 'Change'
                    : 'Enter Shipping Details'}
                </Card.Link>
              </Link>
            )}
          </Card.Title>
          {orderData.shippingDetails && (
            <>
              <Card.Text>{`${orderData.userDetails.firstName} ${orderData.userDetails.lastName}`}</Card.Text>
              <Card.Text>{orderData.userDetails.phone}</Card.Text>
              <Card.Text>{orderData.userDetails.address}</Card.Text>
              <Card.Text>{orderData.userDetails.city}</Card.Text>
              <Card.Text>{orderData.userDetails.postalCode}</Card.Text>
              <Card.Text>{orderData.userDetails.country}</Card.Text>
            </>
          )}
        </Card.Body>
      )}
    </Card>
  );
}

export default ShippingDetailsCard;
