import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { getReq } from './DAL/serverData';
import './styles/CategoryAccordion.css';

function CategoryAccordion() {
  const [categories, setCategories] = useState();

  const getTheCategories = async () => {
    const categoriesData = await getReq(`categories`);
    const categoriesNames = categoriesData.map(
      category => category.categoryName
    );
    setCategories([...categoriesNames]);
  };

  useEffect(() => {
    getTheCategories();
  }, []);
  return (
    <Accordion className="category-accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accordion-header">
          Categories
        </Accordion.Header>
        {categories && (
          <Accordion.Body className="category-accordion-body">
            <ul className="category-accordion-list">
              {categories.map((category, index) => (
                <Link key={index} to={`/categories/${index + 1}`}>
                  <li>
                    <img
                      src={`/icons/categories-icons/${category.replaceAll(
                        ' ',
                        '-'
                      )}.png`}
                    />
                    <span>{category}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </Accordion.Body>
        )}
      </Accordion.Item>
    </Accordion>
  );
}

export default CategoryAccordion;
