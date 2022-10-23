import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { useContext, useEffect, useState } from 'react';
import './styles/ProductCard.css';
import { UserContext } from './UserContext';
import { patchReq, postReq, getReq, deleteReq } from './DAL/serverData';
import { Link, useNavigate } from 'react-router-dom';

function ProductCard(props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [productsAmount, setProductsAmount] = useState({});
  const [checkClick, setCheckClick] = useState({});
  const [state, setState] = useState({});

  const handleAmountChange = (valueAsNumber, valueAsString, input) => {
    productsAmount[input.name] = valueAsNumber;
    setProductsAmount({ ...productsAmount });
  };

  const handleCheckProductClick = async () => {
    if (!checkClick.isChecked) {
      props.currentProduct.checked = true;
      //calculate the price with or without the discount
      props.cartState.cartData.totalPrice =
        props.cartState.cartData.totalPrice +
        (props.currentProduct.discount
          ? props.currentProduct.amount * props.currentProduct.unitPrice -
            props.currentProduct.amount *
              props.currentProduct.unitPrice *
              (props.currentProduct.discount * 0.01)
          : props.currentProduct.amount * props.currentProduct.unitPrice);

      props.cartState.cartData.totalAmount =
        props.cartState.cartData.totalAmount + props.currentProduct.amount;
    } else {
      props.currentProduct.checked = false;

      props.cartState.cartData.totalPrice =
        props.cartState.cartData.totalPrice -
        (props.currentProduct.discount
          ? props.currentProduct.amount * props.currentProduct.unitPrice -
            props.currentProduct.amount *
              props.currentProduct.unitPrice *
              (props.currentProduct.discount * 0.01)
          : props.currentProduct.amount * props.currentProduct.unitPrice);

      props.cartState.cartData.totalAmount =
        props.cartState.cartData.totalAmount - props.currentProduct.amount;
    }

    const foundProduct = props.cartState.cartData.cartProducts.find(
      cartProduct => cartProduct.id === props.currentProduct.id
    );

    if (foundProduct) {
      foundProduct.checked = props.currentProduct.checked;
    }

    props.cartState.setCartData({ ...props.cartState.cartData });
    user.totalCartItems = props.cartState.cartData.totalAmount;
    checkClick.isChecked = !checkClick.isChecked;
    setCheckClick({ ...checkClick });
    setUser({ ...user });
    const reqBody = {
      userId: user.userId,
      productId: props.currentProduct.id,
      amount: props.currentProduct.amount,
      checked: checkClick.isChecked,
    };
    const isCartUpdated = await patchReq(`cart`, reqBody);
    if (isCartUpdated) {
      console.log('Successfully updated the database.');
    }
  };

  const handleBuyNow = e => {
    // local storage to a specific item and redirect to order-review
    productsAmount[e.target.value] = productsAmount[e.target.value]
      ? productsAmount[e.target.value]
      : 1;
    localStorage.setItem(
      'buy-now',
      JSON.stringify({
        userId: user.userId,
        productId: e.target.value,
        amount: productsAmount[e.target.value],
      })
    );
    navigate('/review-order');
  };

  // Handles a user click on an unfilled heart and adds the clcked product to the wishlist
  const handleAddToWishlist = async e => {
    if (user) {
      const productId = Number(e.target.slot);
      const reqBody = { userId: user.userId, productId };
      const isAddedToWishList = await postReq('wishlist', reqBody);
      if (isAddedToWishList) {
        if (props.page === 'category') {
          console.log(props.productsState.state);
          do {
            props.productsState.state.userWishlist = await getReq(
              `wishlist?user-id=${user.userId}`
            );
          } while (
            !props.productsState.state.userWishlist.find(
              wishListItem =>
                wishListItem.userId === user.userId &&
                wishListItem.productId === productId
            )
          );
          props.productsState.setState({ ...props.productsState.state });
        }
        // if the product is also in the cart we need to delete it
        const userCart = await getReq(`cart/${user.userId}`);
        const isProductInCart = userCart.find(
          cartProduct => cartProduct.productId === productId
        );
        if (isProductInCart) {
          await deleteReq(
            `cart?user-id=${user.userId}&product-id=${productId}`
          );
          user.totalCartItems = await updateCartDetails(reqBody);
          setUser({ ...user });
        }
        console.log(
          'The item was added successfully to the wishlist database.'
        );
        //changes the heart icon
        state.isInWishList = true;
        setState({ ...state });
      } else {
        console.log('Could not fetch productData from the server');
      }
    } else {
      // local storage to guest users
    }
  };

  const handleDeleteFromWishList = async e => {
    const productId = Number(e.target.slot);
    //Delete from the wishlist page
    if (props.wishListItem) {
      await deleteReq(
        `wishlist?user-id=${user.userId}&product-id=${props.wishListItem.id}`
      );
      let products;
      do {
        products = await getReq(`wishlist?user-id=${user.userId}`);
      } while (
        props.wishListRender.wishList.find(
          wishlistItem =>
            wishlistItem.userId === user.userId &&
            wishlistItem.productId === productId
        )
      );

      props.wishListRender.setWishList([...products]);
      //Delete from products page
    } else {
      const isDeletedFromWishlist = await deleteReq(
        `wishlist?user-id=${user.userId}&product-id=${productId}`
      );
      if (isDeletedFromWishlist) {
        if (props.page === 'category') {
          do {
            props.productsState.state.userWishlist = await getReq(
              `wishlist?user-id=${user.userId}`
            );
          } while (
            props.productsState.state.userWishlist.find(
              wishListItem =>
                wishListItem.userId === user.userId &&
                wishListItem.productId === productId
            )
          );
          props.productsState.setState({ ...props.productsState.state });
        }
        console.log(
          'The item was deleted successfully from the wishlist database.'
        );
        //changes the heart icon
        state.isInWishList = false;
        setState({ ...state });
      } else {
        console.log('Could not fetch productData from the server');
      }
    }
  };

  const updateCartDetails = async reqBody => {
    await getReq(`cart/${user.userId}`);
    let userCart;
    do {
      userCart = await getReq(`cart/${user.userId}`);
    } while (
      userCart.find(
        cartItem =>
          cartItem.userId !== reqBody.userId &&
          cartItem.productId !== reqBody.productId
      )
    );

    const cartItemsAmount = userCart.reduce((a, b) => a + b.amount, 0);

    return cartItemsAmount;
  };

  const handleAddToCart = async e => {
    if (user) {
      const productId = Number(e.target.value);
      const amount = productsAmount[productId] ? productsAmount[productId] : 1;
      const reqBody = { userId: user.userId, productId, amount, checked: true };
      const isCartUpdated = await postReq('cart', reqBody);
      if (isCartUpdated) {
        user.totalCartItems = await updateCartDetails(reqBody);
        // If the product is in the wishlist also we need to delete it
        if (props.page === 'category' || props.page === 'product-page') {
          const userWishlist = await getReq(`wishlist?user-id=${user.userId}`);
          const isProductInWishlist = userWishlist.find(
            wishlistProduct => wishlistProduct.productId === productId
          );
          if (isProductInWishlist) {
            await deleteReq(
              `wishlist?user-id=${user.userId}&product-id=${productId}`
            );
            state.isInWishList = !state.isInWishList;
            setState({ ...state });
          }
        }
        // Delete the product from the wishlist when added to cart from the wishlist page
        if (props.page === 'wishlist') {
          await handleDeleteFromWishList(e);
        }
        setUser({ ...user });
      } else {
        console.log('Could not fetch productData from the server');
      }
    }
  };

  const isProductInWishlist = async productId => {
    const userWishlist = await getReq(`wishlist?user-id=${user.userId}`);
    const isProductInWishlist = userWishlist.find(
      wishlistData => wishlistData.productId === productId
    );

    if (isProductInWishlist) {
      state.isInWishList = true;
    } else {
      state.isInWishList = false;
    }
    setState({ ...state });
  };

  const setCartCheckBox = async () => {
    const userCart = await getReq(`cart/${user.userId}`);
    const currentProduct = userCart.find(
      cartItem => cartItem.productId === props.currentProduct.id
    );

    checkClick.isChecked = currentProduct.checked;

    setCheckClick({ ...checkClick });
  };

  useEffect(() => {
    if (props.page === 'product-page') {
      isProductInWishlist(props.productData.id);
    } else if (props.page === 'category') {
      isProductInWishlist(props.product.id);
    } else if (props.page === 'cart') {
      setCartCheckBox();
    }

    if (props.currentProduct && props.currentProduct.checked === undefined) {
      props.currentProduct.checked = true;
      setCheckClick(props.currentProduct.checked);
    }
  }, []);

  return (
    <>
      <Card
        className={props.page === 'product-page' ? 'col-sm' : 'product-card'}
      >
        {props.page === 'cart' && (
          <Form.Check
            name={props.currentProduct.id}
            className="choose-button"
            type="checkbox"
            id="default-checkbox"
            defaultChecked={checkClick.isChecked}
            onClick={handleCheckProductClick}
          />
        )}
        <Card.Body>
          {props.page === 'wishlist' && props.wishListItem && (
            <>
              <Card.Img src={props.wishListItem.image} />
              <Card.Title>{props.wishListItem.productName}</Card.Title>
              <Row className="card-buttons">
                <Col lg={3}>
                  <Button
                    onClick={handleAddToCart}
                    value={props.wishListItem.id}
                    disabled={props.wishListItem.unitsInStock ? false : true}
                    className="card-button col-md"
                  >
                    Add to cart
                  </Button>
                </Col>
                <Col lg={3}>
                  <Button
                    onClick={handleBuyNow}
                    value={props.wishListItem.id}
                    disabled={props.wishListItem.unitsInStock ? false : true}
                    className="card-button col-md"
                  >
                    Buy now
                  </Button>
                </Col>
                <Col lg={3}>
                  <Button
                    onClick={handleDeleteFromWishList}
                    value={props.wishListItem.id}
                    className="card-button col-md"
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {props.page === 'wishlist' && props.wishListMessage && (
            <Card.Title>{props.wishListMessage}</Card.Title>
          )}
          {props.page === 'category' && (
            <>
              <Link
                className="center-product-image"
                to={`/product/${props.product.id}`}
              >
                <Card.Img src={props.product.image} />
              </Link>
              <Row>
                <Card.Title>{props.product.productName}</Card.Title>
              </Row>
              <Row>
                <Card.Text className="price-section-category">
                  {props.product && props.product.discount ? (
                    <>
                      <span className="old-price">
                        {props.product.unitPrice}$
                      </span>
                      {` ${
                        props.product.unitPrice -
                        props.product.unitPrice * props.product.discount * 0.01
                      }`}
                      $
                    </>
                  ) : (
                    `${props.product ? `${props.product.unitPrice}$` : '20$'}`
                  )}
                </Card.Text>
              </Row>
              <Row className="amount-section">
                <Col className="amount">
                  <NumericInput
                    name={props.product.id}
                    onChange={handleAmountChange}
                    min={1}
                    max={100}
                    defaultValue={1}
                  />
                </Col>
                <Col>
                  <Card.Text
                    className={
                      props.product
                        ? props.product.unitsInStock
                          ? 'on-stock'
                          : 'out-of-stock'
                        : 'on-stock'
                    }
                  >
                    {props.product
                      ? props.product.unitsInStock
                        ? 'On Stock!'
                        : 'Out of Stock'
                      : 'On Stock!'}
                  </Card.Text>
                </Col>
              </Row>
              <Row className="card-buttons">
                <Button
                  onClick={handleBuyNow}
                  value={props.product.id}
                  disabled={props.product.unitsInStock ? false : true}
                >
                  Buy now
                </Button>
                <Button
                  onClick={handleAddToCart}
                  value={props.product.id}
                  disabled={props.product.unitsInStock ? false : true}
                >
                  Add to cart
                </Button>
                <a className="card-button col-md">
                  {state.isInWishList && (
                    <i
                      onClick={handleDeleteFromWishList}
                      slot={props.product.id}
                      className="fa fa-solid fa-heart"
                    ></i>
                  )}
                  {!state.isInWishList && (
                    <i
                      onClick={handleAddToWishlist}
                      slot={props.product.id}
                      className="far fa-heart"
                    ></i>
                  )}
                </a>
              </Row>
            </>
          )}

          {(props.page === 'cart' || props.page === 'review') && (
            <>
              <Link
                className="center-product-image"
                to={`/product/${props.currentProduct.id}`}
              >
                <Card.Img src={props.currentProduct.image} />
              </Link>
              <Card.Title>{props.currentProduct.productName}</Card.Title>
              <section className="card-buttons row">
                {props.page === 'cart' && (
                  <>
                    <Row>
                      <Card.Text className="price-section-category">
                        {props.currentProduct.discount ? (
                          <span>
                            {`${
                              props.currentProduct.unitPrice *
                                props.currentProduct.amount -
                              props.currentProduct.unitPrice *
                                props.currentProduct.amount *
                                (0.01 * props.currentProduct.discount)
                            }$ `}
                            <span className="old-price">
                              {`${
                                props.currentProduct.unitPrice *
                                props.currentProduct.amount
                              }$`}
                            </span>
                          </span>
                        ) : (
                          <span>
                            {` ${
                              props.currentProduct.unitPrice *
                              props.currentProduct.amount
                            }$`}
                          </span>
                        )}
                        <span className="price-per-unit">{` (${
                          props.currentProduct.discount
                            ? props.currentProduct.unitPrice -
                              props.currentProduct.unitPrice *
                                (0.01 * props.currentProduct.discount)
                            : props.currentProduct.unitPrice
                        }$ for 1 unit)`}</span>
                      </Card.Text>
                    </Row>

                    <Row>
                      <Col className="amount">
                        <NumericInput
                          onChange={props.onAmountChange}
                          min={1}
                          max={props.currentProduct.unitsInStock}
                          value={props.currentProduct.amount}
                          name={props.currentProduct.id}
                        />
                      </Col>
                      <Col className="stock-container">
                        <Card.Text
                          className={
                            props.currentProduct.unitsInStock
                              ? 'on-stock'
                              : 'out-of-stock'
                          }
                        >
                          {props.currentProduct.unitsInStock
                            ? 'On Stock!'
                            : 'Out of Stock'}
                        </Card.Text>
                      </Col>
                    </Row>

                    <Row className="buttons-section">
                      <Col lg={6}>
                        <Button
                          onClick={props.onDeleteClick}
                          name={props.currentProduct.id}
                        >
                          Delete
                        </Button>
                      </Col>
                      <Col lg={6}>
                        <Button
                          name={props.currentProduct.id}
                          onClick={props.onMoveToWishlistClick}
                        >
                          Move to Wishlist
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
                {props.page === 'review' && (
                  <Row>
                    <Col>
                      <Card.Text className="order-review-product-units">{`Units: ${props.currentProduct.amount}`}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Text className="price-section-review">
                        {props.currentProduct.discount ? (
                          <span>
                            {`${
                              props.currentProduct.unitPrice *
                                props.currentProduct.amount -
                              props.currentProduct.unitPrice *
                                props.currentProduct.amount *
                                (0.01 * props.currentProduct.discount)
                            }$ `}
                            <span className="old-price">
                              {`${
                                props.currentProduct.unitPrice *
                                props.currentProduct.amount
                              }$`}
                            </span>
                          </span>
                        ) : (
                          <span>
                            {` ${
                              props.currentProduct.unitPrice *
                              props.currentProduct.amount
                            }$`}
                          </span>
                        )}
                        <span className="price-per-unit">{` (${
                          props.currentProduct.discount
                            ? props.currentProduct.unitPrice -
                              props.currentProduct.unitPrice *
                                (0.01 * props.currentProduct.discount)
                            : props.currentProduct.unitPrice
                        }$ for 1 unit)`}</span>
                      </Card.Text>
                    </Col>
                  </Row>
                )}
              </section>
            </>
          )}

          {props.page === 'order-confirmation' && (
            <>
              <Link
                className="center-product-image"
                to={`/product/${props.purchasedProduct.productId}`}
              >
                <Card.Img
                  src={
                    props.purchasedProduct &&
                    props.purchasedProduct.productImage
                  }
                />
              </Link>
              <Row>
                <Card.Title>{props.purchasedProduct.productName}</Card.Title>
              </Row>
              <Row className="order-confirmation-details-container">
                <Col>
                  <Card.Text>
                    Quantity:{' '}
                    {props.purchasedProduct && props.purchasedProduct.amount}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text className="order-confirmation-float-right-price order-product-total-price">
                    Total Price:{' '}
                    {props.purchasedProduct &&
                      props.purchasedProduct.finalPrice}
                    $
                  </Card.Text>
                </Col>
              </Row>
            </>
          )}

          {props.page === 'my-orders' && (
            <Row className="order-confirmation-details-container">
              <Col
                sm={12}
                md={12}
                lg={3}
                className="order-product-image-column"
              >
                <Link to={`/product/${props.orderDetails.productId}`}>
                  <Card.Img src={props.orderDetails.productImage} />
                </Link>
              </Col>
              <Col className="order-product-details-column">
                <Row>
                  <Card.Title>{props.orderDetails.productName}</Card.Title>
                </Row>
                <Row className="order-product-details">
                  <Col sm={12} md={12} lg={4}>
                    <Card.Text>
                      Unit Price:{' '}
                      {props.orderDetails.finalPrice /
                        props.orderDetails.amount ===
                      props.orderDetails.unitPrice ? (
                        `${props.orderDetails.unitPrice}$`
                      ) : (
                        <span>
                          <span className="old-price">
                            {`${props.orderDetails.unitPrice}$`}
                          </span>
                          {` ${
                            props.orderDetails.finalPrice /
                            props.orderDetails.amount
                          }$`}
                        </span>
                      )}
                    </Card.Text>
                  </Col>
                  <Col sm={12} md={12} lg={4}>
                    <Card.Text>Quantity: {props.orderDetails.amount}</Card.Text>
                  </Col>
                  <Col sm={12} md={12} lg={4}>
                    <Card.Text className="order-product-total-price">
                      Total Price: {props.orderDetails.finalPrice}$
                    </Card.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}

          {props.page === 'product-page' && (
            <>
              <Card.Title>{props.productData.productName}</Card.Title>
              <Card.Text>{props.productData.description}</Card.Text>
              <section className="quantity">
                {props.productData.unitsInStock !== 0 && (
                  <NumericInput
                    name={props.productData.id}
                    onChange={handleAmountChange}
                    min={1}
                    max={props.productData.unitsInStock}
                    value={1}
                  />
                )}

                <span
                  className={
                    props.productData.unitsInStock ? 'on-stock' : 'out-of-stock'
                  }
                >
                  {props.productData.unitsInStock > 0
                    ? 'On Stock!'
                    : 'Out of Stock'}
                </span>
              </section>
              <Card.Title className="price">
                {props.productData.discount ? (
                  <>
                    Price: <span>{props.productData.unitPrice}$</span>
                    {` ${
                      props.productData.unitPrice -
                      props.productData.unitPrice *
                        props.productData.discount *
                        0.01
                    }`}
                    $ ({props.productData.discount}% discount)
                  </>
                ) : (
                  `Price: ${props.productData.unitPrice}$`
                )}
              </Card.Title>
              <Row className="buttons">
                <Col xl={3}>
                  <Button
                    onClick={handleBuyNow}
                    value={props.productData.id}
                    className="product-button"
                    disabled={props.productData.unitsInStock ? false : true}
                  >
                    Buy now!
                  </Button>
                </Col>
                <Col xl={3}>
                  <Button
                    onClick={handleAddToCart}
                    value={props.productData.id}
                    className="product-button"
                    disabled={props.productData.unitsInStock ? false : true}
                  >
                    Add to cart
                  </Button>
                </Col>
                <Col xl={3} className="product-wishlist">
                  {state.isInWishList && (
                    <i
                      onClick={handleDeleteFromWishList}
                      className="fa fa-solid fa-heart"
                      slot={props.productData.id}
                    ></i>
                  )}
                  {!state.isInWishList && (
                    <i
                      onClick={handleAddToWishlist}
                      className="far fa-heart"
                      slot={props.productData.id}
                    ></i>
                  )}
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
export default ProductCard;
