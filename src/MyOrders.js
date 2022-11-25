import './styles/MyOrders.css';
import Order from './Order';
import { UserContext } from './UserContext';
import { useState, useEffect, useContext, useRef } from 'react';
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
  const [searchParams] = useSearchParams();
  const userOrdersCount = useRef();

  // Retrieve the relevant orders for each page
  const getUserOrders = async () => {
    if (!orders) {
      await countTheOrders();
    }
    const pageAttributes = getThePages();
    const userOrders = await getReq(
      `orders/${user.userId}?offset=${
        pageAttributes.from * 5 - 5 < userOrdersCount.current
          ? pageAttributes.from * 5 - 5
          : userOrdersCount.current
      }&jump=${
        pageAttributes.from * 5 < userOrdersCount.current
          ? 5
          : userOrdersCount.current - (pageAttributes.from * 5 - 5)
      }`
    );
    await createDetailedOrdersArr(userOrders);
    window.scrollTo(0, 0);
  };

  // A one time function that retrieves the number of orders that the user has from the database
  const countTheOrders = async () => {
    userOrdersCount.current = await getReq(`orders/${user.userId}?count=true`);
  };

  // Creates the state orders array that contains all the necessary data relevant to the user
  const createDetailedOrdersArr = async userOrders => {
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
    }
    setOrders([...ordersArr]);
  };

  // Creates a state that show what page are we on and what other pages numbers to show based on that
  const getThePages = () => {
    const numberOfPages = Math.ceil(userOrdersCount.current / 5);
    const chosenPage = Number(searchParams.get('page'));
    const pagesArr = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pagesArr.push(i);
    }
    const pagesBody = {
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
    };
    setPages({ ...pagesBody });
    return pagesBody;
  };

  // Returns an array of the relevant pages numbers to display on the browser
  const getTheRightPages = () => {
    return pages.pagesArr.slice(pages.from - 1, pages.to);
  };

  useEffect(() => {
    setOrders(undefined);
    getUserOrders();
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
        orders.map(
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
