import NavSlider from './NavSlider';
import { navSlidersData } from './data/data';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import './styles/Navbar.css';
import Cookies from 'js-cookie';
import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from 'react';
import { getReq, deleteReq, patchReq } from './DAL/serverData';

function Navbar() {
  const [sliders, setSliders] = useState(navSlidersData());
  const { user, setUser } = useContext(UserContext);
  let [cartData, setCartData] = useState(null);

  const setTheCart = async () => {
    cartData = {};
    cartData.cart = await getReq(`cart/${user.userId}`);
    cartData.cartProducts = [];

    for (const cart of cartData.cart) {
      cartData.cartProducts.push(await getReq(`products/${cart.productId}`));
    }

    for (const product of cartData.cartProducts) {
      const productImg = (await getReq(`product-images/${product.id}`))[0]
        .imageSrc;
      product.image = productImg;
      const foundCart = cartData.cart.find(
        cart => cart.productId === product.id
      );
      product.amount = foundCart.amount;
    }

    cartData.totalAmount = cartData.cartProducts
      .map(product => product.amount)
      .reduce((a, b) => a + b, 0);

    cartData.totalPrice = cartData.cartProducts
      .map(product =>
        product.discount
          ? product.unitPrice * product.amount -
            product.unitPrice * product.amount * (0.01 * product.discount)
          : product.unitPrice * product.amount
      )
      .reduce((a, b) => a + b, 0);

    setCartData({ ...cartData });
    user.finalCart = cartData.cartProducts;
    user.totalCartItems = cartData.totalAmount;
    user.totalCartPrice = cartData.totalPrice;

    setUser({ ...user });
  };

  useEffect(() => {
    setTheCart();
    console.log(user);
  }, []);
  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/icons/workshop-logo.png" alt="Site Logo" />
          </Link>

          <div className="collapse-hamburger-container">
            <i
              onMouseEnter={() => {
                sliders.hamburger.collapseState = true;
                setSliders({ ...sliders });
              }}
              onMouseLeave={() => {
                sliders.hamburger.collapseState = false;
                setSliders({ ...sliders });
              }}
              className="navbar-toggler navbar-toggler-icon fa fa-solid fa-bars"
            ></i>
            {sliders.hamburger.collapseState && (
              <NavSlider
                isCategories={sliders.categories.collapseState}
                onMouseEnter={() => {
                  sliders.hamburger.collapseState = true;
                  setSliders({ ...sliders });
                }}
                showCategories={() => {
                  sliders.categories.collapseState = true;
                  setSliders({ ...sliders });
                }}
                onMouseLeave={() => {
                  sliders.hamburger.collapseState = false;
                  setSliders({ ...sliders });
                }}
                removeCategories={() => {
                  sliders.categories.collapseState = false;
                  setSliders({ ...sliders });
                }}
                name={sliders.hamburger.collapseName}
                categoryName={sliders.categories.collapseName}
                categoriesSections={sliders.categories.sections}
                sections={
                  Cookies.get('connect.sid')
                    ? sliders.hamburger.sections.connected
                    : sliders.hamburger.sections.disconnected
                }
              />
            )}
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <section className="icons-search">
              <input
                className="search-bar"
                type="text"
                placeholder="Search a tool"
              ></input>
              <Link to="/wishlist">
                <i className="fa fa-solid fa-heart"></i>
              </Link>
              <Link to="/shopping-cart">
                <i className="fa fa-shopping-cart"></i>
                {user.totalCartItems !== 0 && (
                  <div className="cart-amount-popon">
                    <Row>{user.totalCartItems}</Row>
                  </div>
                )}
              </Link>

              <div className="user-container">
                <i
                  onMouseEnter={() => {
                    sliders.user.state = true;
                    setSliders({ ...sliders });
                  }}
                  onMouseLeave={() => {
                    sliders.user.state = false;
                    setSliders({ ...sliders });
                  }}
                  className="fa fa-user"
                ></i>

                {sliders.user.state && (
                  <NavSlider
                    onMouseEnter={() => {
                      sliders.user.state = true;
                      setSliders({ ...sliders });
                    }}
                    onMouseLeave={() => {
                      sliders.user.state = false;
                      setSliders({ ...sliders });
                    }}
                    name={sliders.user.name}
                    sections={
                      Cookies.get('connect.sid')
                        ? sliders.user.sections.connected
                        : sliders.user.sections.disconnected
                    }
                  />
                )}
              </div>

              <div className="hamburger-container">
                <i
                  onMouseEnter={() => {
                    sliders.hamburger.state = true;
                    setSliders({ ...sliders });
                  }}
                  onMouseLeave={() => {
                    sliders.hamburger.state = false;
                    setSliders({ ...sliders });
                  }}
                  className="fa fa-solid fa-bars"
                ></i>
                {sliders.hamburger.state && (
                  <NavSlider
                    isCategories={sliders.categories.state}
                    onMouseEnter={() => {
                      sliders.hamburger.state = true;
                      setSliders({ ...sliders });
                    }}
                    showCategories={() => {
                      sliders.categories.state = true;
                      setSliders({ ...sliders });
                    }}
                    onMouseLeave={() => {
                      sliders.hamburger.state = false;
                      setSliders({ ...sliders });
                    }}
                    removeCategories={() => {
                      sliders.categories.state = false;
                      setSliders({ ...sliders });
                    }}
                    name={sliders.hamburger.name}
                    categoryName={sliders.categories.name}
                    categoriesSections={sliders.categories.sections}
                    sections={
                      Cookies.get('connect.sid')
                        ? sliders.hamburger.sections.connected
                        : sliders.hamburger.sections.disconnected
                    }
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
