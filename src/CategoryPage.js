import CategoryAside from './CategoryAside';
import ProductCard from './ProductCard';
import { Row, Col } from 'react-bootstrap';
import SortBy from './SortBy';
import { sortByOptions } from './data/data';
import './styles/CategoryPage.css';

function CategoryPage(props) {
  return (
    <div className="main-content">
      <CategoryAside />

      <Row className="categories-container">
        <section className="category-name-and-sort">
          <h1 className="categories-title">
            {props.categoryData.category.category_name}
          </h1>
          <SortBy options={sortByOptions()} />
        </section>

        {props.categoryData.products.map(product => (
          <Col className="card-container" xxl={3} lg={4} md={6} sm={6}>
            <ProductCard product={product} page="category" />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoryPage;
