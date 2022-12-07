import './Footer.scss';

import logo from '../../images/Logo-footer.svg';
import vector from '../../images/Vector.svg';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <footer className="footer">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <Link to="/home">
              <img src={logo} alt="img" />
            </Link>
          </div>
          <nav className="footer__nav">
            <a href="https://github.com/fe-aug22-team404/product_catalog" target="blanc" className="footer__nav-link">
              Github
            </a>
            <a href="https://github.com/fe-aug22-team404/product_catalog/graphs/contributors" className="footer__nav-link" target="blanc">
              Contacts
            </a>
            <a href="*" className="footer__nav-link" target="blanc">
              Rights
            </a>
          </nav>

          <div
            className="footer__back"
            onClick={handleScrollToTop}
          >
            <p className="footer__back-article">
              Back to top
            </p>
            <div
              className="footer__back-link"
              id="back"
            >
              <img className="footer__back-img" src={vector} alt="img" />
            </div>
          </div>
        </div>
      </footer>
    );
}
