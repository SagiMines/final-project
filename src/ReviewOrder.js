import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import CheckoutCard from './CheckoutCard';
import ShippingDetailsCard from './ShippingDetailsCard';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import './styles/ReviewOrder.css';
import { getReq } from './DAL/serverData';

function ReviewOrder() {
  const { user, setUser } = useContext(UserContext);
  const [buyNow, setBuyNow] = useState(
    JSON.parse(localStorage.getItem('buy-now'))
  );

  const getPriceForBuyNow = () => {
    let totalPrice = user.buyNowProduct.discount
      ? user.buyNowProduct.unitPrice -
        user.buyNowProduct.unitPrice * (0.01 * user.buyNowProduct.discount)
      : user.buyNowProduct.unitPrice;
    return totalPrice * user.buyNowProduct.amount;
  };

  const handleBuyNow = async () => {
    if (buyNow) {
      localStorage.removeItem('buy-now');
      user.buyNowProduct = await getReq(`products/${buyNow.productId}`);
      user.buyNowProduct.image = (
        await getReq(`product-images/${buyNow.productId}`)
      )[0].imageSrc;
      user.buyNowProduct.amount = buyNow.amount;
      user.buyNowProduct.checked = true;
      setUser({ ...user });
      console.log(user);
    }
  };

  useEffect(() => {
    handleBuyNow();
  }, []);
  return (
    <div className="container review-container">
      <h1 className="review-title">Review Your Order</h1>
      <ShippingDetailsCard page="review" />
      <Row className="review-data">
        <Col md>
          {!buyNow &&
            user.finalCart &&
            user.finalCart.map(
              (cart, idx) =>
                cart.checked && (
                  <ProductCard
                    page="review"
                    key={idx.toString()}
                    currentProduct={cart}
                  />
                )
            )}
          {user.buyNowProduct && user.buyNowProduct.checked && (
            <ProductCard page="review" currentProduct={user.buyNowProduct} />
          )}
        </Col>
        <Col md>
          <CheckoutCard
            page="review"
            cartSummary={{
              totalAmount: user.buyNowProduct
                ? user.buyNowProduct.amount
                : user.totalCartItems,
              totalPrice: user.buyNowProduct
                ? getPriceForBuyNow()
                : user.totalCartPrice,
            }}
            buyNowProduct={user.buyNowProduct}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ReviewOrder;
