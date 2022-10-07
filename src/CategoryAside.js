import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getReq } from './DAL/serverData';
import './styles/CategoryAside.css';

function CategoryAside() {
  const [categories, setCategories] = useState(null);

  // Gets the categories from the DB
  const getCategoriesFromDb = async () => {
    setCategories(await getReq(`categories`));
  };

  useEffect(() => {
    getCategoriesFromDb();
  }, []);

  return (
    <aside className="category-aside">
      {categories && (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky"></div>
          <Nav.Item className="heading">
            <Nav.Link disabled>Categories</Nav.Link>
          </Nav.Item>
          {categories.map(category => (
            <Nav.Item>
              <Nav.Link>
                <img
                  src={`/icons/categories-icons/${category.categoryName.replaceAll(
                    ' ',
                    '-'
                  )}.png`}
                />
                <Link
                  className="category-link"
                  to={`/categories/${category.id}`}
                >
                  {category.categoryName}
                </Link>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      )}
    </aside>
  );
}

export default CategoryAside;
