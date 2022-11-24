import './styles/MyOrders.css';
import Order from './Order';
import { UserContext } from './UserContext';
import { useState, useEffect, useContext } from 'react';
import { getReq } from './DAL/serverData';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingGif from './LoadingGif';
import {
  faChevronRight,
  faChevronLeft,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState();
  const [pages, setPages] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const getUserOrders = async () => {
    const userOrders = await getReq(`orders/${user.userId}`);

    const ordersArr = [];
    if (userOrders) {
      for (const order of userOrders) {
        const orderData = await getReq(`orders/${order.id}?join=true`);
        for (const details of orderData.orderDetails) {
          details.productImage = (
            await getReq(`product-images/${details.productId}`)
          )[0].imageSrc;
          details.productName = (
            await getReq(`products/${details.productId}`)
          ).productName;
        }
        ordersArr.push(orderData);
      }
      getThePages(Math.ceil(ordersArr.length / 5));
    }
    const reversedOrdersArr = ordersArr.reverse();
    setOrders([...reversedOrdersArr]);
  };

  const getThePages = numberOfPages => {
    const chosenPage = Number(searchParams.get('page'));
    const pagesArr = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pagesArr.push(i);
    }
    window.scrollTo(0, 0);
    setPages({
      pagesArr: pagesArr,
      from: chosenPage ? chosenPage : 1,
      to: chosenPage
        ? numberOfPages > chosenPage + 4
          ? chosenPage + 4
          : numberOfPages
        : numberOfPages > 5
        ? 5
        : numberOfPages,
      chosenPage: chosenPage ? chosenPage : 1,
    });
  };

  const getTheRightPages = () => {
    return pages.pagesArr.slice(pages.from - 1, pages.to);
  };

  const getRelevantOrdersForPage = () => {
    const fromIndex = pages.chosenPage * 5 - 5;
    if (orders.length >= fromIndex + 5) {
      return orders.slice(fromIndex, fromIndex + 5);
    } else {
      return orders.slice(fromIndex, orders.length);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  useEffect(() => {
    if (orders) {
      getThePages(Math.ceil(orders.length / 5));
    }
  }, [searchParams.get('page')]);

  return (
    <div className="container my-orders-container">
      <h1 className="my-orders-title">Your Orders</h1>
      {!orders && <LoadingGif />}
      {orders && !orders.length && (
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>You haven't made any orders yet</Card.Title>
            </Card.Body>
          </Card>
        </Container>
      )}
      {orders &&
        getRelevantOrdersForPage().map(
          (order, idx) =>
            order.orderDetails.length > 0 && (
              <Order key={idx.toString()} order={order} />
            )
        )}
      {pages && pages.pagesArr.length > 1 && (
        <Container className="pages">
          <Row>
            {pages.from > 1 && (
              <>
                <Col>
                  <Link to="/my-orders?page=1">
                    <FontAwesomeIcon width={20} icon={faAngleDoubleLeft} />
                  </Link>
                </Col>
                <Col>
                  <Link
                    to={`/my-orders?page=${
                      pages.chosenPage > 1
                        ? pages.chosenPage - 1
                        : pages.chosenPage
                    }`}
                  >
                    <FontAwesomeIcon width={12} icon={faChevronLeft} />
                  </Link>
                </Col>
              </>
            )}
            {getTheRightPages().map((pageNum, idx) => (
              <Col key={idx.toString()}>
                <Link
                  to={`/my-orders?page=${pageNum}`}
                  className={
                    pageNum === pages.chosenPage ? 'chosen-page' : undefined
                  }
                >
                  {pageNum}
                </Link>
              </Col>
            ))}
            {pages.to !== pages.pagesArr.length && (
              <>
                <Col>
                  <Link
                    to={`/my-orders?page=${
                      pages.chosenPage < pages.pagesArr.length
                        ? pages.chosenPage + 1
                        : pages.chosenPage
                    }`}
                  >
                    <FontAwesomeIcon width={12} icon={faChevronRight} />
                  </Link>
                </Col>
                <Col>
                  <Link to={`/my-orders?page=${pages.pagesArr.length}`}>
                    <FontAwesomeIcon width={20} icon={faAngleDoubleRight} />
                  </Link>
                </Col>
              </>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default MyOrders;
