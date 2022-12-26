import { navSlidersData } from './data/data';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import './styles/Navbar.css';
import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';
import SearchSlider from './SearchSlider';
import useComponentVisible from './custom-hooks/useComponentVisible';
import useSidebarVisible from './custom-hooks/useSidebarVisible';
import NavBarSide from './NavBarSide';
import _ from 'lodash';

function Navbar() {
  const [sliders, setSliders] = useState(null);
  const [cartData, setCartData] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { guestTotalCartItems, setGuestTotalCartItems } =
    useContext(UserContext);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { sidebarRef, isSidebarVisible, setIsSidebarVisible } =
    useSidebarVisible(false);

  // const getCategories = async () => {
  //   return await getReq('categories');
  // };

  const setSearchSlider = async () => {
    const navSliders = navSlidersData();
    // navSliders.categories.sections = await getCategories();
    setSliders({ ...navSliders });
  };

  const setTheCart = async () => {
    //User
    if (user) {
      cartData.cart = await getReq(`cart/${user.userId}`);
      //Guest
    } else {
      cartData.cart = JSON.parse(localStorage.getItem('guestCart'));
    }
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
        if (foundCart) {
          product.amount = foundCart.amount;
          product.checked = foundCart.checked ? true : false;
        }
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

      //User
      if (user) {
        user.totalCartItems = cartData.totalAmount;
        setUser({ ...user });
        //Guest
      } else {
        setGuestTotalCartItems(cartData.totalAmount);
      }
    } else {
      //User
      if (user) {
        user.totalCartItems = 0;
        setUser({ ...user });
        //Guest
      } else {
        setGuestTotalCartItems(0);
      }
    }
    setCartData({ ...cartData });
  };

  const updateSearchValue = e => {
    sliders.search.value = e.target.value;
    setSliders({ ...sliders });
  };

  useEffect(() => {
    setSearchSlider();
    setTheCart();
  }, []);

  return (
    <header>
      {!_.isEmpty(cartData) && (
        <nav className="navbar fixed-top navbar-expand-md bg-white">
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
                <>
                  <i
                    onClick={() => {
                      if (!isSidebarVisible && sidebar) {
                        setIsSidebarVisible(true);
                        setSidebar(true);
                      } else {
                        setIsSidebarVisible(!sidebar);
                        setSidebar(!sidebar);
                      }
                    }}
                    className="navbar-toggler navbar-toggler-icon fa fa-solid fa-bars"
                  ></i>
                </>
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
                  {!user &&
                    guestTotalCartItems !== 0 &&
                    guestTotalCartItems !== undefined && (
                      <div className="cart-amount-popon">
                        <Row>{guestTotalCartItems}</Row>
                      </div>
                    )}
                </Link>

                <i
                  onClick={() => {
                    if (!isSidebarVisible && sidebar) {
                      setIsSidebarVisible(true);
                      setSidebar(true);
                    } else {
                      setIsSidebarVisible(!sidebar);
                      setSidebar(!sidebar);
                    }
                  }}
                  className="fa fa-solid fa-bars"
                ></i>
              </section>
            </div>
          </div>

          <div ref={sidebarRef}>
            <NavBarSide
              isSidebarVisible={isSidebarVisible}
              sidebarState={{ sidebar, setSidebar }}
            />
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
