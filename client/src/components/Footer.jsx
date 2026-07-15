import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>INBARE</h3>
          <p>Premium Streetwear · Sri Lanka</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/category/t-shirts">All Products</Link>
            <Link to="/category/t-shirts">New Arrivals</Link>
            <Link to="/category/hoodies">Collections</Link>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <Link to="/">FAQ</Link>
            <Link to="/">Returns</Link>
            <Link to="/">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© 2026 INBARE. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
