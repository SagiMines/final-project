import { Link } from 'react-router-dom';
import { getUserIdFromCookie, postReq } from './DAL/serverData';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';

function NavSlider(props) {
  const { user, setUser } = useContext(UserContext);
  const { setGuestTotalCartItems } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = async () => {
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

  return (
    <>
      <div
        onMouseEnter={() => props.onMouseEnter()}
        onMouseLeave={() => props.onMouseLeave()}
        className={`${props.name}-slider-pointer`}
      ></div>
      <div
        onMouseEnter={() => props.onMouseEnter()}
        onMouseLeave={() => props.onMouseLeave()}
        className={`${props.name}-slider`}
      >
        {props.sections.map((section, idx) =>
          section === 'Categories' ? (
            <label
              key={idx.toString()}
              className="nav-slider-name"
              onMouseEnter={() => props.showCategories()}
              onMouseLeave={() => props.removeCategories()}
            >
              {section}
            </label>
          ) : section === 'Log Out' ? (
            <label
              key={idx.toString()}
              className="nav-slider-name"
              onClick={logOut}
            >
              {section}
            </label>
          ) : section === 'Account' ? (
            <label
              key={idx.toString()}
              className="nav-slider-name"
              onMouseEnter={() => props.showUser()}
              onMouseLeave={() => props.removeUser()}
            >
              {section}
            </label>
          ) : (
            <Link key={idx.toString()} to={section.route}>
              <label className="nav-slider-name">{section.name}</label>
            </Link>
          )
        )}
      </div>
      {props.isCategories && (
        <div
          onMouseEnter={() => {
            props.showCategories();
            props.onMouseEnter();
          }}
          onMouseLeave={() => {
            props.removeCategories();
            props.onMouseLeave();
          }}
          className={`${props.categoryName}-slider`}
        >
          {props.categoriesSections.map((category, idx) => (
            <Link key={idx.toString()} to={`/categories/${category.id}`}>
              <label className="nav-slider-name">{category.categoryName}</label>
            </Link>
          ))}
        </div>
      )}
      {props.isUser && (
        <div
          onMouseEnter={() => {
            props.showUser();
            props.onMouseEnter();
          }}
          onMouseLeave={() => {
            props.removeUser();
            props.onMouseLeave();
          }}
          className={`${props.userName}-slider`}
        >
          {props.userSections.map((section, idx) =>
            section === 'Log Out' ? (
              <label
                onClick={logOut}
                key={idx.toString()}
                className="nav-slider-name"
              >
                {section}
              </label>
            ) : (
              <Link key={idx.toString()} to={`/${section.route}`}>
                <label className="nav-slider-name">{section.name}</label>
              </Link>
            )
          )}
        </div>
      )}
    </>
  );
}

export default NavSlider;
