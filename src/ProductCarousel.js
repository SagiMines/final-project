import { Carousel, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/ProductCarousel.css';

function ProductCarousel(props) {
  return (
    <Carousel
      controls={props.images && props.images.length === 1 ? false : true}
      indicators={props.images && props.images.length === 1 ? false : true}
      fade
      variant="dark"
      className={props.images ? 'product-page-carousel col-sm' : 'col-sm'}
    >
      {props.images &&
        props.images.map((image, idx) => (
          <Carousel.Item key={idx.toString()}>
            <img
              className="d-block w-100"
              src={image.imageSrc}
              title={props.name}
              alt={props.name}
            />
          </Carousel.Item>
        ))}
      {props.topProducts &&
        props.topProducts.map((topProduct, idx) => (
          <Carousel.Item key={idx.toString()}>
            <Link
              className="carousel-link-to-product"
              to={`/product/${topProduct.id}`}
            >
              <img
                className="top-product-img d-block w-100 "
                src={topProduct.productImages[0].imageSrc}
                title={topProduct.productName}
                alt={`${topProduct.productName} - Top product`}
              />

              <Container>
                <p className="top-product-title-container">
                  <span className="top-product-title">
                    {topProduct.productName}
                  </span>
                </p>
                <svg
                  xmlns="//www.w3.org/2000/svg"
                  version="1.1"
                  className="svg-filters"
                  style={{ display: 'none' }}
                >
                  <defs>
                    <filter id="marker-shape">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0 0.15"
                        numOctaves="1"
                        result="warp"
                      />
                      <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        scale="30"
                        in="SourceGraphic"
                        in2="warp"
                      />
                    </filter>
                  </defs>
                </svg>
              </Container>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ProductCarousel;
