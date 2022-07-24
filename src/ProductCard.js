import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';

function StudentCard(props) {
  return (
    <>
      <Card>
        <Card.Img src="https://d3m9l0v76dty0.cloudfront.net/system/photos/7649724/large/2f4ab58b69e32e69c9ea56a346cf1271.jpg" />
        <Card.Body>
          <Card.Title>Dewalt DCD999 Hammer Drill</Card.Title>
          <Card.Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{' '}
          </Card.Text>
          <section className="card-buttons row">
            <Button className="card-button col-md">Add to cart</Button>
            <Button className="card-button col-md">Buy now</Button>
            <Button className="card-button col-md">Delete</Button>
          </section>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src="https://d3m9l0v76dty0.cloudfront.net/system/photos/7649724/large/2f4ab58b69e32e69c9ea56a346cf1271.jpg" />
        <Card.Body>
          <Card.Title>Dewalt DCD999 Hammer Drill</Card.Title>
          <Card.Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{' '}
          </Card.Text>
          <section className="card-buttons row">
            <Button className="card-button col-md">Add to cart</Button>
            <Button className="card-button col-md">Buy now</Button>
            <Button className="card-button col-md">Delete</Button>
          </section>
        </Card.Body>
      </Card>
    </>
  );
}
export default StudentCard;
