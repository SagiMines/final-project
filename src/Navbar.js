import NavSlider from './NavSlider';
import { navSlidersData } from './data/data';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import './styles/Navbar.css';
import { UserContext } from './UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { getReq } from './DAL/serverData';
import SearchSlider from './SearchSlider';
import useComponentVisible from './custom-hooks/useComponentVisible';

function Navbar() {
  const [sliders, setSliders] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [cartData, setCartData] = useState({});
  // const searchRef = useRef();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const getCategories = async () => {
    return await getReq('categories');
  };

  const setCategoriesSlider = async () => {
    const navSliders = navSlidersData();
    navSliders.categories.sections = await getCategories();
    setSliders({ ...navSliders });
  };

  const setTheCart = async () => {
    cartData.cart = await getReq(`cart/${user.userId}`);
    if (cartData.cart.length) {
      cartData.cartProducts = [];

      for (const cart of cartData.cart) {
        const currentProduct = await getReq(`products/${cart.productId}`);
        if (
          cartData.cartProducts.length &&
          !cartData.cartProducts.find(
            product => product.id === currentProduct.id
          )
        ) {
          cartData.cartProducts.push(currentProduct);
        } else if (!cartData.cartProducts.length) {
          cartData.cartProducts.push(currentProduct);
        }
      }

      for (const product of cartData.cartProducts) {
        const productImg = (await getReq(`product-images/${product.id}`))[0]
          .imageSrc;
        product.image = productImg;
        const foundCart = cartData.cart.find(
          cart => cart.productId === product.id
        );
        product.amount = foundCart.amount;
        product.checked = foundCart.checked ? true : false;
      }

      cartData.totalAmount = cartData.cartProducts
        .map(product => product.checked && product.amount)
        .reduce((a, b) => a + b, 0);

      cartData.totalPrice = cartData.cartProducts
        .map(product =>
          product.discount
            ? product.unitPrice * product.amount -
              product.unitPrice * product.amount * (0.01 * product.discount)
            : product.unitPrice * product.amount
        )
        .reduce((a, b) => a + b, 0);

      user.totalCartItems = cartData.totalAmount;
    } else {
      user.totalCartItems = 0;
    }
    setCartData({ ...cartData });
    setUser({ ...user });
  };

  const updateSearchValue = e => {
    sliders.search.value = e.target.value;
    setSliders({ ...sliders });
  };

  useEffect(() => {
    setCategoriesSlider();
  }, []);

  useEffect(() => {
    if (user) {
      setTheCart();
    }
  }, [user]);

  return (
    <header>
      {sliders && (
        <nav className="navbar fixed-top navbar-expand-md">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <img src="/icons/workshop-logo.png" alt="Site Logo" />
            </Link>
            <div className="collapse-icons-container">
              <div
                onClick={() => setIsComponentVisible(true)}
                className="collapse-search-container"
              >
                {!isComponentVisible && (
                  <i
                    className="navbar-toggler navbar-toggler-icon fa fas fa-search"
                    onClick={() => {
                      sliders.search.collapseState =
                        !sliders.search.collapseState;
                      setSliders({ ...sliders });
                    }}
                  ></i>
                )}
                {isComponentVisible && (
                  <div className="search-container collapse-search-container">
                    <input
                      ref={ref}
                      onChange={updateSearchValue}
                      className="search-bar collapse-search-bar"
                      type="text"
                      placeholder="Search a tool"
                    ></input>
                    {sliders.search.value.length >= 2 && (
                      <SearchSlider
                        value={sliders.search.value}
                        name={sliders.search.name}
                      />
                    )}
                  </div>
                )}
              </div>
              {!isComponentVisible && (
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
                      isUser={sliders.user.collapseState}
                      onMouseEnter={() => {
                        sliders.hamburger.collapseState = true;
                        setSliders({ ...sliders });
                      }}
                      showCategories={() => {
                        sliders.categories.collapseState = true;
                        setSliders({ ...sliders });
                      }}
                      showUser={() => {
                        sliders.user.collapseState = true;
                        setSliders({ ...sliders });
                      }}
                      onMouseLeave={() => {
                        sliders.hamburger.collapseState = false;
                        setSliders({ ...sliders });
                      }}
                      removeUser={() => {
                        sliders.user.collapseState = false;
                        setSliders({ ...sliders });
                      }}
                      removeCategories={() => {
                        sliders.categories.collapseState = false;
                        setSliders({ ...sliders });
                      }}
                      name={sliders.hamburger.collapseName}
                      categoryName={sliders.categories.collapseName}
                      userName={sliders.user.collapseName}
                      categoriesSections={sliders.categories.sections}
                      userSections={sliders.user.sections.connected}
                      sections={
                        user
                          ? sliders.hamburger.sections.connected
                          : sliders.hamburger.sections.disconnected
                      }
                    />
                  )}
                </div>
              )}
            </div>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <section className="icons-search">
                <div className="search-container">
                  <input
                    ref={ref}
                    onClick={() => setIsComponentVisible(true)}
                    onChange={updateSearchValue}
                    className="search-bar"
                    type="text"
                    placeholder="Search a tool"
                  ></input>
                  {sliders.search.value.length >= 2 && isComponentVisible && (
                    <SearchSlider
                      value={sliders.search.value}
                      name={sliders.search.name}
                    />
                  )}
                </div>
                <Link to="/wishlist">
                  <i className="fa fa-solid fa-heart"></i>
                </Link>
                <Link to="/shopping-cart">
                  <i className="fa fa-shopping-cart"></i>
                  {user &&
                    user.totalCartItems !== 0 &&
                    user.totalCartItems !== undefined && (
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
                        user
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
                      isUser={sliders.user.hamburgerState}
                      onMouseEnter={() => {
                        sliders.hamburger.state = true;
                        setSliders({ ...sliders });
                      }}
                      showCategories={() => {
                        sliders.categories.state = true;
                        setSliders({ ...sliders });
                      }}
                      showUser={() => {
                        sliders.user.hamburgerState = true;
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
                      removeUser={() => {
                        sliders.user.hamburgerState = false;
                        setSliders({ ...sliders });
                      }}
                      name={sliders.hamburger.name}
                      categoryName={sliders.categories.name}
                      userName={sliders.user.hamburgerName}
                      categoriesSections={sliders.categories.sections}
                      userSections={sliders.user.sections.connected}
                      sections={
                        user
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
      )}
    </header>
  );
}

export default Navbar;
