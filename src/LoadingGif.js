import { Container } from 'react-bootstrap';

function LoadingGif() {
  return (
    <div className="container-center">
      <Container className="loading-gif">
        <img src="/icons/loading.gif"></img>
      </Container>
    </div>
  );
}

export default LoadingGif;
