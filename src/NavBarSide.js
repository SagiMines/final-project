import { useState, useContext, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { UserContext } from './UserContext';
import './styles/NavBarSide.css';
import { getReq, postReq } from './DAL/serverData';
import Cookies from 'js-cookie';
import { HashLink } from 'react-router-hash-link';
function NavBarSide(props) {
  const { user, setUser } = useContext(UserContext);
  const { setGuestTotalCartItems } = useContext(UserContext);
  const navigate = useNavigate();
  const [sidebarState, setSidebarState] = useState({
    user: {
      pressed: false,
    },
    categories: {
      pressed: false,
    },
  });
  const showSidebar = () => {
    props.sidebarState.setSidebar(!props.sidebarState.sidebar);
    sidebarState.user.pressed = false;
    sidebarState.categories.pressed = false;
    setSidebarState({ ...sidebarState });
  };
  const handlePress = e => {
    let element = e.target;
    while (element.nodeName !== 'SECTION') {
      element = element.parentElement;
    }
    const elementName = element.nonce;
    sidebarState[elementName].pressed = !sidebarState[elementName].pressed;

    setSidebarState({ ...sidebarState });
  };

  const logout = async () => {
    showSidebar();
    const userId = user.userId;
    const isValid = await postReq('logout', { userId });
    if (isValid) {
      if (!localStorage.getItem('guestCart')) {
        localStorage.setItem('guestCart', JSON.stringify([]));
        setGuestTotalCartItems(0);
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart'));
        const cartTotalItems = guestCart.reduce((accumulator, object) => {
          return accumulator + object.amount;
        }, 0);
        setGuestTotalCartItems(cartTotalItems);
      }
      if (!localStorage.getItem('guestWishlist')) {
        localStorage.setItem('guestWishlist', JSON.stringify([]));
      }
      if (process.env.NODE_ENV === 'production') {
        Cookies.remove('user_id', { domain: '.workshop-il.com' });
        Cookies.remove('connect.sid', { domain: '.workshop-il.com' });
      } else {
        Cookies.remove('user_id');
        Cookies.remove('connect.sid');
      }
      setUser(null);
      navigate('/');
    }
  };

  const getUserName = async () => {
    const userData = await getReq(`users/${user.userId}`);
    setSidebarState({ ...sidebarState, userName: userData.firstName });
  };

  useEffect(() => {
    if (user) {
      getUserName();
    }
  }, []);

  // If the window was press outside the sidebar while it is activated
  useEffect(() => {
    if (!props.isSidebarVisible) {
      sidebarState.user.pressed = false;
      sidebarState.categories.pressed = false;
      setSidebarState({ ...sidebarState });
    }
  }, [props.isSidebarVisible]);

  return (
    <nav
      className={
        props.sidebarState.sidebar && props.isSidebarVisible
          ? 'nav-menu active'
          : 'nav-menu'
      }
    >
      <ul className="nav-menu-items">
        <div className="sidebar-heading">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars" onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          <li className="sidebar-greetings">
            <span>
              Hello {sidebarState.userName ? sidebarState.userName : `Guest`}
            </span>
            <FaIcons.FaRegSmile />
          </li>
          {user && <hr />}
        </div>
        {SidebarData.map((item, index) =>
          (item.title === 'User' && user) ||
          item.title === 'Tool Categories' ? (
            <div key={index}>
              <li className={item.cName}>
                <section
                  nonce={item.nonceName}
                  className="sidebar-title space-between"
                  onClick={handlePress}
                >
                  <div>
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {sidebarState[item.nonceName].pressed ? (
                    <AiIcons.AiFillCaretUp className="arrow-sidebar" />
                  ) : (
                    <AiIcons.AiFillCaretDown className="arrow-sidebar" />
                  )}
                </section>
              </li>
              <section
                className={
                  sidebarState[item.nonceName].pressed ? 'sub-titles' : 'hidden'
                }
              >
                {item.subTitles.map((subTitle, index) => (
                  <li key={index}>
                    {subTitle.path ? (
                      <Link to={subTitle.path} onClick={showSidebar}>
                        <span className="sub-title">{subTitle.title}</span>
                      </Link>
                    ) : (
                      <span onClick={logout} className="sub-title">
                        {subTitle.title}
                      </span>
                    )}
                  </li>
                ))}
              </section>
            </div>
          ) : item.title !== 'User' &&
            item.title !== 'Contact Us' &&
            item.title !== 'About Us' ? (
            <li key={index} className={item.cName} onClick={showSidebar}>
              <Link className="sidebar-title" to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ) : item.title === 'Contact Us' || item.title === 'About Us' ? (
            <li key={index} className={item.cName} onClick={showSidebar}>
              <HashLink
                smooth
                data-toggle="tab"
                className="sidebar-title"
                to={item.path}
              >
                {item.icon}
                <span>{item.title}</span>
              </HashLink>
            </li>
          ) : (
            <div key={index}>
              <li className="guest-login-register-sidebar">
                <Link to="login" onClick={showSidebar}>
                  <span>Log In</span>
                </Link>
                <span>/</span>
                <Link to="register" onClick={showSidebar}>
                  <span>Register</span>
                </Link>
              </li>
              <hr />
            </div>
          )
        )}
      </ul>
    </nav>
  );
}

export default NavBarSide;
