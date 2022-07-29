import CategoryAside from './CategoryAside';
import ProductCard from './ProductCard';
import { Row, Col } from 'react-bootstrap';
import SortBy from './SortBy';
import './styles/CategoryPage.css';

function CategoryPage() {
  return (
    <div className="main-content">
      <CategoryAside />

      <Row className="categories-container">
        <section className="category-name-and-sort">
          <h1 className="categories-title">Category Name</h1>
          <SortBy
            options={[
              'Price - high to low',
              'Price - low to high',
              'Newest products',
            ]}
          />
        </section>

        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <ProductCard page="category" />
        </Col>
      </Row>
    </div>
  );
}

export default CategoryPage;
