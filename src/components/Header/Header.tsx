import React, { useContext } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import './Header.scss';
import Logo from '../../images/Logo.png';
import Cart from '../../images/cart.svg';
import Like from '../../images/like.svg';
import { AppContext } from '../AppProvider';

export const Header :React.FC = () => {
  const { favourites, shoppingCart } = useContext(AppContext)

  const favouritesItems = favourites.length;
  const shoppingCartItems = shoppingCart.length;

  return (
    <header className="header">
      <section className="header__left">
        <Link to="/">
          <img className="header__logo" src={ Logo } alt="logo" />
        </Link>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="/"
                className="header__nav-link"
              >
                home
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/phones"
                className="header__nav-link"
              >
                phones
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/tablets"
                className="header__nav-link"
              >
                tablets
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/accessory"
                className="header__nav-link"
              >
                accessory
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>

      <section className="header__right">
        <NavLink
          to="/favourites"
          className="header__link"
        >
          <div className="header__link-wrap">
            <img
              src={ Like }
              className="header__link-img"
              alt="btn-like"
            />
            {favouritesItems > 0 && (
              <div className="header__link-img-count">
                {favouritesItems}
              </div>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className="header__link">
          <div className="header__link-wrap">
            <img
              src={ Cart }
              className="header__link-img"
              alt="link-img"
            />
            {shoppingCartItems > 0 && (
              <div className="header__link-img-count">
                {shoppingCartItems}
              </div>
            )}
          </div>
        </NavLink>
      </section>
    </header>
  );
}
