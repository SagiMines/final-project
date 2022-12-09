import './styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="text-center">
        <section className="social">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </section>

        <span>Copyright Work Shop &copy;{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default Footer;
