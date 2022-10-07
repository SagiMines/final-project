import { Link } from 'react-router-dom';
import { getUserIdFromCookie, postReq } from './DAL/serverData';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function NavSlider(props) {
  const navigate = useNavigate();
  const logOut = async () => {
    const userId = await getUserIdFromCookie();
    const isValid = await postReq('logout', { userId });
    if (isValid) {
      Cookies.remove('user_id');
      Cookies.remove('connect.sid');
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
        {props.sections.map(section =>
          section === 'Categories' ? (
            <label
              className="nav-slider-name"
              onMouseEnter={() => props.showCategories()}
              onMouseLeave={() => props.removeCategories()}
            >
              {section}
            </label>
          ) : section === 'Log Out' ? (
            <label className="nav-slider-name" onClick={logOut}>
              {section}
            </label>
          ) : (
            <Link to={section.route}>
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
          {props.categoriesSections.map(category => (
            <Link to={`/categories/${category.id}`}>
              <label className="nav-slider-name">{category.categoryName}</label>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default NavSlider;
