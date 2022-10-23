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
          <Nav.Item className="heading">
            <Nav.Link disabled>Categories</Nav.Link>
          </Nav.Item>
          {categories.map((category, idx) => (
            <Nav.Item key={idx.toString()}>
              <Nav.Item className="category-link-container">
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
              </Nav.Item>
            </Nav.Item>
          ))}
        </Nav>
      )}
    </aside>
  );
}

export default CategoryAside;
