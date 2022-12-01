import logo from './images/Logo.svg';

export const Footer: React.FC = () => {
    return (
      <footer className="footer">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <a href="*">
              <img src={logo} alt="img"/>
            </a>
          </div>
          <nav className="footer__nav">
              <a href="*" className="footer__nav-link">
                Github
              </a>
              <a href="*" className="footer__nav-link">
                Contacts
              </a>
              <a href="*" className="footer__nav-link">
                rights
              </a>
          </nav>
          <div className="footer__back">
            <p className="footer__back-article">Back to top</p>
            <a className="footer__back-link" href="*">
              &gt;
            </a>
          </div>
        </div>
      </footer>
    ); 
}