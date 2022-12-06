import {
  FC,
  useEffect,
  useMemo,
  useState,
  useContext
} from 'react';
import cn from 'classnames';
import { Phone } from '../../types/Phone';

import './ProductCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppProvider';

type Props = {
  path: string;
  phone: Phone;
};

export const ProductCard: FC<Props> = ({ phone, path }) => {
  const {
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = phone;
  const { favourites, shoppingCart, changeFavourites, changeShoppingCart } = useContext(AppContext);
  const imagePath = require(`../../images/${image}`);
  const linkPath = useMemo(() => {
    return path !== 'phones'
      ? `/phones/${phoneId}`
      : `${phoneId}`
  }, [path])

  const isShoppingCartIncludeId = shoppingCart.includes(phoneId);
  const isFavouritesIncludeId = favourites.includes(phoneId);

  const handleShoppingCarts = () => {
    if (isShoppingCartIncludeId) {
      const filteredShoppingCart = shoppingCart.filter(id => id !== phoneId);

      localStorage.setItem('shoppingCart', filteredShoppingCart.join(','));
      changeShoppingCart(filteredShoppingCart);
    } else {
      const addedShoppingCart = [...shoppingCart, phoneId];

      localStorage.setItem('shoppingCart', addedShoppingCart.join(','));
      changeShoppingCart(addedShoppingCart);
    }
  }

  const handleFavourites = () => {
    if (isFavouritesIncludeId) {
      const filteredFavourites = favourites.filter(id => id !== phoneId);

      localStorage.setItem('favourites', filteredFavourites.join(','));
      changeFavourites(filteredFavourites);
    } else {
      const completeFavourites = [...favourites, phoneId];

      localStorage.setItem('favourites', completeFavourites.join(','));
      changeFavourites(completeFavourites);
    }
  };

  return (
    <div className="card">
      <div className="card__image-container">
        <Link to={linkPath}>
          <img
            className="card__image"
            src={imagePath}
            alt="phone"
          />
        </Link>
      </div>

      <Link to={linkPath} className="card__title">
        {name}
      </Link>

      <div className="card__price-container">
        <h2 className="card__current-price">
          {`$${price}`}
        </h2>

        <h2 className="card__full-price">
          {`$${fullPrice}`}
        </h2>
      </div>

      <hr className="card__line"/>

      <div className="card__info-container">
        <div className="card__info-raw">
          <span className="card__info-text">
            Screen
          </span>

          <span className="card__info-value">
            {screen}
          </span>
        </div>
        <div className="card__info-raw">
          <span className="card__info-text">
            Capacity
          </span>

          <span className="card__info-value">
            {capacity}
          </span>
        </div>
        <div className="card__info-raw">
          <span className="card__info-text">
            RAM
          </span>

          <span className="card__info-value">
            {ram}
          </span>
        </div>
      </div>

      <div className="card__buttons-container">
        <button
          className={cn('card__add-button', {
            'card__add-button--is-selected': isShoppingCartIncludeId
          })}
          onClick={handleShoppingCarts}
        >
          {!isShoppingCartIncludeId
            ? 'Add to card'
            : 'Added'}
        </button>

        <button
          className={cn('card__like-button', {
            'card__like-button--is-selected': isFavouritesIncludeId
          })}
          onClick={handleFavourites}
        />
      </div>
    </div>
  );
};
