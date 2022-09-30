import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/CheckoutCard.css';
import { UserContext } from './UserContext';
import { useContext, useEffect } from 'react';
import {
  convertJsDatePatternToMysqlPattern,
  deleteReq,
  getReq,
  patchReq,
  postReq,
} from './DAL/serverData';
import { useNavigate } from 'react-router-dom';

function CheckoutCard(props) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);

  const handleOrder = async () => {
    console.log(props.page);
    if (props.page === 'cart') {
      navigate('/review-order');
    } else {
      const userDetails = await getTheUser();
      const isNewOrderUpdated = await addOrderToDb(userDetails);
      await getReq('orders');
      if (isNewOrderUpdated) {
        const userLastOrderId = await getUserLastOrderId();
        const isOrderDetailsUpdated = await addOrderDetailsToDb(
          userLastOrderId
        );
        if (isOrderDetailsUpdated) {
          const areOrderedCartItemsDeleted = props.buyNowProduct
            ? true
            : await deleteOrderedCartItems();
          user.totalCartItems = props.buyNowProduct ? user.totalCartItems : 0;
          console.log(user);
          if (user.wishListProducts) {
            console.log(user.buyNowProduct);
            delete user.wishListProducts[user.buyNowProduct.id];
            deleteProductFromWishList(user.buyNowProduct.id);
            delete user.buyNowProduct;
          }
          setUser({ ...user });
          if (areOrderedCartItemsDeleted) {
            navigate('/order-confirmation');
          }
        }
      }
    }
  };

  const deleteProductFromWishList = async productId => {
    await deleteReq(`wishlist?user-id=${user.userId}&product-id=${productId}`);
  };
  const getTheUser = async () => {
    return await getReq(`users/${user.userId}`);
  };

  const addOrderToDb = async userDetails => {
    const reqBody = {
      userId: userDetails.id,
      orderDate: convertJsDatePatternToMysqlPattern(),
      shipAddress: userDetails.address,
      shipCountry: userDetails.country,
      shipCity: userDetails.city,
      shipPostalCode: userDetails.postalCode,
    };
    return await postReq(`orders`, reqBody);
  };

  const getUserLastOrderId = async () => {
    const userOrders = await getReq(`orders/${user.userId}`);
    const lastOrder = Math.max(...userOrders.map(order => order.id));
    return lastOrder;
  };

  const addOrderDetailsToDb = async orderId => {
    console.log(props.buyNowProduct);
    if (!props.buyNowProduct) {
      for (const cartItem of user.finalCart) {
        if (cartItem.checked) {
          const productId = cartItem.id;
          const unitPrice = cartItem.unitPrice;
          const amount = cartItem.amount;
          const finalPrice = cartItem.discount
            ? unitPrice * amount -
              unitPrice * amount * (cartItem.discount * 0.01)
            : unitPrice * amount;

          const reqBody = { orderId, productId, unitPrice, amount, finalPrice };
          const isOrderDetailsAddedToDb = await postReq(
            'order-details',
            reqBody
          );
          const isProductUnitsInStockUpdated = await patchReq(
            `products?product-id=${cartItem.id}&amount=${
              cartItem.unitsInStock - cartItem.amount
            }`
          );
          if (!isOrderDetailsAddedToDb || !isProductUnitsInStockUpdated) {
            console.log(
              'Something went wrong with the data sent to the database.'
            );
            return false;
          }
        }
      }
    } else {
      const productId = props.buyNowProduct.id;
      const unitPrice = props.buyNowProduct.unitPrice;
      const amount = props.buyNowProduct.amount;
      const finalPrice = props.buyNowProduct.discount
        ? unitPrice * amount -
          unitPrice * amount * (props.buyNowProduct.discount * 0.01)
        : unitPrice * amount;

      const reqBody = { orderId, productId, unitPrice, amount, finalPrice };
      const isOrderDetailsAddedToDb = await postReq('order-details', reqBody);
      const isProductUnitsInStockUpdated = await patchReq(
        `products?product-id=${props.buyNowProduct.id}&amount=${
          props.buyNowProduct.unitsInStock - props.buyNowProduct.amount
        }`
      );
      if (!isOrderDetailsAddedToDb || !isProductUnitsInStockUpdated) {
        console.log('Something went wrong with the data sent to the database.');
        return false;
      }
      // delete user.buyNowProduct;
    }

    return true;
  };

  const deleteOrderedCartItems = async () => {
    for (const cartItem of user.finalCart) {
      if (cartItem.checked) {
        const isDeletedFromCart = await deleteReq(
          `cart?user-id=${user.userId}&product-id=${cartItem.id}`
        );
        if (!isDeletedFromCart) {
          console.log(
            'Something went wrong with the data sent to the database.'
          );
          return false;
        }
      }
    }
    return true;
  };

  return (
    <Card className="checkout-card">
      <Card.Body>
        <Card.Title>{`Total Amount (${props.cartSummary.totalAmount} Items): ${props.cartSummary.totalPrice}$`}</Card.Title>
        <Button
          disabled={
            (user.needToFillDetails && props.page === 'review') ||
            !props.cartSummary.totalPrice
              ? true
              : false
          }
          onClick={handleOrder}
          className="checkout-button"
        >
          {props.page === 'cart' ? 'Proceed to checkout' : 'Place your order'}
        </Button>
        {props.page === 'review' && (
          <Link to="/shopping-cart">
            <Button className="checkout-button">Cancle</Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default CheckoutCard;
