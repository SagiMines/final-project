import CategoryAside from './CategoryAside';
import ProductCard from './ProductCard';
import { Row, Col } from 'react-bootstrap';
import SortBy from './SortBy';
import { sortByOptions } from './data/data';
import './styles/CategoryPage.css';
import { useParams } from 'react-router-dom';
import { getReq } from './DAL/serverData';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function CategoryPage() {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [state, setState] = useState();

  const chosenCategoryData = async id => {
    const category = await getReq(`categories/${id}`);
    const products = await getReq(`products?category-id=${id}`);
    for (const product of products) {
      const productImages = await getReq(`product-images/${product.id}`);
      product['image'] = productImages[0].imageSrc;
    }
    const userWishlist = await getReq(`wishlist?user-id=${user.userId}`);
    setState({ products, category, userWishlist });
  };

  useEffect(() => {
    chosenCategoryData(id);
  }, [id]);

  return (
    <div className="main-content">
      <CategoryAside />

      {state && state.userWishlist && (
        <Row className="categories-container">
          <section className="category-name-and-sort">
            <h1 className="categories-title">{state.category.categoryName}</h1>
            <SortBy options={sortByOptions()} />
          </section>

          {state.products.map((product, ind) => (
            <Col
              key={ind.toString()}
              className="card-container"
              xxl={3}
              lg={4}
              md={6}
              sm={6}
            >
              <ProductCard
                productsState={{ state, setState }}
                product={product}
                page="category"
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
export default CategoryPage;
