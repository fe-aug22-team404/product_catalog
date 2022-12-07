import React, { useContext, useState } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import './Header.scss';
import Logo from '../../images/Logo.png';
import Cart from '../../images/cart.svg';
import Like from '../../images/like.svg';
import Burger from '../../images/Burger.svg';
import Cross from '../../images/Cross.svg';
import { AppContext } from '../AppProvider/AppProvider';

export const Header :React.FC = () => {
  const { favourites, shoppingCart } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false);

  const removeMenu = () => {
    setIsOpen((curr: boolean) => false);
  };

  const favouritesItems = favourites.length;
  const shoppingCartItems = shoppingCart.length;

  return (
    <>
      <header className="header">
        <section className="header__left-mobile">
          <Link to="/">
            <img className="header__logo" src={Logo} alt="logo" />
          </Link>
          <div
            onClick={() => {
              setIsOpen((curr: boolean) => !curr);
            }}
            className="header__link-cross"
          >
            <div className="header__link-wrap">
              <img className="header__link-img" src={Burger} alt="burger" />
            </div>
          </div>
        </section>
        <section className="header__left">
          <Link to="/">
            <img className="header__logo" src={Logo} alt="logo" />
          </Link>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <NavLink to="/" className="header__nav-link">
                  home
                </NavLink>
              </li>

              <li className="header__nav-item">
                <NavLink to="/phones" className="header__nav-link">
                  phones
                </NavLink>
              </li>

              <li className="header__nav-item">
                <NavLink to="/tablets" className="header__nav-link">
                  tablets
                </NavLink>
              </li>

              <li className="header__nav-item">
                <NavLink to="/accessory" className="header__nav-link">
                  accessory
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>

        <section className="header__right">
          <NavLink to="/favourites" className="header__link">
            <div className="header__link-wrap">
              <img src={Like} className="header__link-img" alt="btn-like" />
              {favouritesItems > 0 && (
                <div className="header__link-img-count">{favouritesItems}</div>
              )}
            </div>
          </NavLink>

          <NavLink to="/cart" className="header__link">
            <div className="header__link-wrap">
              <img src={Cart} className="header__link-img" alt="link-img" />
              {shoppingCartItems > 0 && (
                <div className="header__link-img-count">
                  {shoppingCartItems}
                </div>
              )}
            </div>
          </NavLink>
        </section>
      </header>
      {isOpen && (
        <aside className="menu" id="menu">
          <section className="menu__top">
            <Link
              to="/"
              onClick={() => {
                removeMenu();
              }}
            >
              <img className="menu__logo" src={Logo} alt="logo" />
            </Link>
            <Link to="/">
              <div
                className="menu__link-cross"
                onClick={() => {
                  removeMenu();
                }}
              >
                <div className="menu__link-wrap">
                  <img className="menu__link-img" src={Cross} alt="burger" />
                </div>
              </div>
            </Link>
          </section>

          <nav className="menu__nav">
            <ul className="menu__nav-list">
              <li className="menu__nav-item">
                <NavLink
                  to="/"
                  className="menu__nav-link"
                  onClick={() => {
                    removeMenu();
                  }}
                >
                  home
                </NavLink>
              </li>

              <li className="menu__nav-item">
                <NavLink
                  to="/phones"
                  className="menu__nav-link"
                  onClick={() => {
                    removeMenu();
                  }}
                >
                  phones
                </NavLink>
              </li>

              <li className="menu__nav-item">
                <NavLink
                  to="/tablets"
                  className="menu__nav-link"
                  onClick={() => {
                    removeMenu();
                  }}
                >
                  tablets
                </NavLink>
              </li>

              <li className="menu__nav-item">
                <NavLink
                  to="/accessory"
                  className="menu__nav-link"
                  onClick={() => {
                    removeMenu();
                  }}
                >
                  accessory
                </NavLink>
              </li>
            </ul>
          </nav>

          <section className="menu__bottom">
            <NavLink
              to="/favorites"
              className="menu__link"
              onClick={() => {
                removeMenu();
              }}
            >
              <div className="menu__link-wrap">
                <img src={Like} className="menu__link-img" alt="btn-like" />
                {favouritesItems > 0 && (
                  <div className="menu__link-img-count">{favouritesItems}</div>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className="menu__link"
              onClick={() => {
                removeMenu();
              }}
            >
              <div className="menu__link-wrap">
                <img src={Cart} className="menu__link-img" alt="link-img" />
                {shoppingCartItems > 0 && (
                  <div className="menu__link-img-count">
                    {shoppingCartItems}
                  </div>
                )}
              </div>
            </NavLink>
          </section>
        </aside>
      )}
    </>
  );
}
