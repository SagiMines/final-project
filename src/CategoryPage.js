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
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [state, setState] = useState();
  // Handles the rendering of the SortBy component
  const [sortByKey, setSortByKey] = useState(Math.random());

  // Handles changes in the SortBy component
  const onSortByChange = e => {
    const route = e.target.value;
    sortTheProducts(route);
  };

  // Sorts the products by the values given in the SortBy component
  const sortTheProducts = async route => {
    state.products = await getReq(
      `products/${route}?category-id=${state.category.id}`
    );
    await attachImagesToProducts(state.products);
    setState({ ...state });
  };

  // Sets all the data needed for the CategoryPage
  const chosenCategoryData = async id => {
    const category = await getReq(`categories/${id}`);
    const products = await getReq(`products?category-id=${id}`);
    await attachImagesToProducts(products);
    let wishlist;
    if (user) {
      wishlist = await getReq(`wishlist?user-id=${user.userId}`);
    } else if (localStorage.getItem('guestWishlist')) {
      wishlist = JSON.parse(localStorage.getItem('guestWishlist'));
    }

    setState({ products, category, userWishlist: wishlist });
  };

  // Attaches images to the products
  const attachImagesToProducts = async products => {
    for (const product of products) {
      const productImages = await getReq(`product-images/${product.id}`);
      product['image'] = productImages[0].imageSrc;
    }
  };

  useEffect(() => {
    // Re-renders the SortBy component
    setSortByKey(Math.random());
    chosenCategoryData(id);
  }, [id]);

  return (
    <div className="main-content">
      <CategoryAside />

      {state && state.userWishlist && (
        <Row className="categories-container">
          <section className="category-name-and-sort">
            <h1 className="categories-title">{state.category.categoryName}</h1>
            <SortBy
              key={sortByKey}
              onChange={onSortByChange}
              options={sortByOptions()}
            />
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
