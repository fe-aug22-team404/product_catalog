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
import classNames from 'classnames';

export const Header :React.FC = () => {
  const { favourites, shoppingCart } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false);

  const [burgetMenuImagePath, setImagePath] = useState(Burger);

  const imagePath = async() => {
    if (!isOpen) {
      setTimeout(() => {
        setImagePath(Cross);
      }, 300);
      return;
    }

    setTimeout(() => {
      setImagePath(Burger);
    }, 300);
  }

  const removeMenu = () => {
    setIsOpen((curr: boolean) => false);
  };

  const favouritesItems = favourites.length;
  const shoppingCartItems = shoppingCart.length;

  return (
    <>
      <header className={classNames(
        'header',
        {
          'header--open': isOpen
        },
      )}>
        <section className={"header__container"}>
            <Link
              to="/"
              className='header__logo-box'
            >
              <img
                className="header__logo"
                src={Logo} alt="logo"
                onClick={removeMenu}
              />
            </Link>
          <div
            onClick={() => {
              setIsOpen((curr: boolean) => !curr);
              imagePath();
            }}
            className="header__link-burger"
          >
            <div className="header__link-wrap">
              <img
                className="header__link-img"
                src={burgetMenuImagePath}
                alt="burger"
              />
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
        {isOpen && (
        <aside className="menu" id="menu">
          <nav className="menu__nav">
            <ul className="menu__nav-list">
              <li className="menu__nav-item menu__nav-item--1">
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

              <li className="menu__nav-item menu__nav-item--2">
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

              <li className="menu__nav-item  menu__nav-item--3">
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

              <li className="menu__nav-item  menu__nav-item--4">
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
              to="/favourites"
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
      </header>
      
    </>
  );
}
