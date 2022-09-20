import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { useContext, useEffect, useState } from 'react';
import './styles/ProductCard.css';
import { UserContext } from './UserContext';
import { postReq } from './DAL/serverData';

function ProductCard(props) {
  const { user, setUser } = useContext(UserContext);
  const [productsAmount, setProductsAmount] = useState({});
  const [checkClick, setCheckClick] = useState(true);

  const handleAmountChange = (valueAsNumber, valueAsString, input) => {
    productsAmount[input.name] = valueAsNumber;
    setProductsAmount({ ...productsAmount });
  };

  const handleCheckProductClick = () => {
    // const id = Number(e.target.name);

    // const foundCart = cartData.cartProducts.find(cart => cart.id === id);
    if (!checkClick) {
      props.currentProduct.checked = true;
      //calculate the price with or without the discount
      user.totalCartPrice =
        user.totalCartPrice +
        (props.currentProduct.discount
          ? props.currentProduct.amount * props.currentProduct.unitPrice -
            props.currentProduct.amount *
              props.currentProduct.unitPrice *
              (props.currentProduct.discount * 0.01)
          : props.currentProduct.amount * props.currentProduct.unitPrice);
      user.totalCartItems = user.totalCartItems + props.currentProduct.amount;
    } else {
      props.currentProduct.checked = false;
      user.totalCartPrice =
        user.totalCartPrice -
        (props.currentProduct.discount
          ? props.currentProduct.amount * props.currentProduct.unitPrice -
            props.currentProduct.amount *
              props.currentProduct.unitPrice *
              (props.currentProduct.discount * 0.01)
          : props.currentProduct.amount * props.currentProduct.unitPrice);
      user.totalCartItems = user.totalCartItems - props.currentProduct.amount;
    }
    const foundUser = user.finalCart.find(
      cart => cart.id === props.currentProduct.id
    );
    if (foundUser) {
      foundUser.checked = props.currentProduct.checked;
    }

    console.log(checkClick);
    console.log(user);
    setUser({ ...user });
    setCheckClick(!checkClick);
  };

  const handleBuyNow = e => {
    // local storage to a specific item and redirect to order-review
  };

  const handleAddToWishlist = async e => {
    if (user) {
      const productId = Number(e.target.slot);
      const reqBody = { userId: user.userId, productId };
      try {
        await postReq('wishlist', reqBody);
      } catch {
        console.log('Could not fetch data from the server');
      }
    } else {
      // local storage to guest users
    }
  };

  const handleAddToCart = async e => {
    if (user) {
      const productId = Number(e.target.value);
      const amount = productsAmount[productId]
        ? productsAmount[e.target.value]
        : 1;
      const reqBody = { userId: user.userId, productId, amount };
      try {
        await postReq('cart', reqBody);
      } catch {
        console.log('Could not fetch data from the server');
      }
    } else {
      // local storage to guest users
    }
  };

  useEffect(() => {
    if (props.currentProduct && props.currentProduct.checked === undefined) {
      props.currentProduct.checked = true;
      setCheckClick(props.currentProduct.checked);
    }

    // remove this if when done with the purchase process
    if (props.currentProduct) {
      if (!user.finalCart) {
        user.finalCart = [];
        user.finalCart.push(props.currentProduct);
      } else {
        const found = user.finalCart.find(
          cart => cart.id === props.currentProduct.id
        );
        if (!found) {
          user.finalCart.push(props.currentProduct);
        } else {
          found.checked = props.currentProduct.checked;
          console.log(user);
        }
      }
    }
    setUser({ ...user });
    console.log(user);
  }, []);

  return (
    <>
      <Card className="product-card">
        {props.page === 'cart' && (
          <Form.Check
            name={props.currentProduct.id}
            className="choose-button"
            type="checkbox"
            id="default-checkbox"
            defaultChecked={checkClick}
            onClick={handleCheckProductClick}
          />
        )}

        {/* <Card.Img
          src={
            (props.product && props.product.image) ||
            'https://d3m9l0v76dty0.cloudfront.net/system/photos/7649724/large/2f4ab58b69e32e69c9ea56a346cf1271.jpg'
          }
        /> */}
        <Card.Body>
          {/* <Card.Title>
            {(props.product && props.product.productName) ||
              'Dewalt DCD999 Hammer Drill'}
          </Card.Title> */}
          {props.page === 'wishlist' && (
            <Card.Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.{' '}
            </Card.Text>
          )}
          {props.page === 'category' && (
            <>
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
            </>
          )}
          {props.page === 'order-confirmation' && (
            <Card.Text>Price: 10$</Card.Text>
          )}
          {props.page === 'wishlist' && (
            <Row className="card-buttons">
              <Col lg={3}>
                <Button className="card-button col-md">Add to cart</Button>
              </Col>
              <Col lg={3}>
                <Button className="card-button col-md">Buy now</Button>
              </Col>
              <Col lg={3}>
                <Button className="card-button col-md">Delete</Button>
              </Col>
            </Row>
          )}
          {props.page === 'category' && (
            <section className="card-buttons row">
              <Button
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
                <i
                  onClick={handleAddToWishlist}
                  slot={props.product.id}
                  className="fa fa-solid fa-heart"
                ></i>
              </a>
            </section>
          )}
          {(props.page === 'cart' || props.page === 'review') && (
            <>
              <Card.Img src={props.currentProduct.image} />
              <Card.Title>{props.currentProduct.productName}</Card.Title>
              <section className="card-buttons row">
                <Row>
                  {props.page === 'cart' && (
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
                  )}
                </Row>

                {props.page === 'cart' && (
                  <>
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
                        <Button>Move to Wishlist</Button>
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
            <Card.Text>Quantity: 1</Card.Text>
          )}
          {props.page === 'order-confirmation' && (
            <Card.Text>Total Price: 10$</Card.Text>
          )}
          <div></div>
        </Card.Body>
      </Card>
    </>
  );
}
export default ProductCard;
