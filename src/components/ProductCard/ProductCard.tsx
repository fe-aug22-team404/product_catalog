import {
  FC,
  useMemo,
  useContext,
  memo,
} from 'react';
import cn from 'classnames';
import { Good } from '../../types/Good';

import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppProvider';

type Props = {
  path: string;
  good: Good;
};

export const ProductCard: FC<Props> = memo(({ good, path }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = good;
  const {
    favouritesPhones,
    favouritesTablets,
    shoppingPhones,
    shoppingTablets,
    changeFavouritesPhones,
    changeFavouritesTablets,
    changeShoppingPhones,
    changeShoppingTablets } = useContext(AppContext);
  const imagePath = require(`../../images/${image}`);
  const isPhone = category === 'phones';
  const isTablet = category === 'tablet';
  const phoneLink = useMemo(() => {
    return path !== 'phones'
      ? `/phones/${itemId}`
      : `${itemId}`
  }, [path]);

  const isShoppingPhonesIncludeId = isPhone ? shoppingPhones.includes(itemId) : null;
  const isShoppingTabletsIncludeId = isTablet ? shoppingTablets.includes(itemId) : null;
  const isFavouritesPhonesIncludeId = isPhone ? favouritesPhones.includes(itemId) : null;
  const isFavouritesTabletsIncludeId = isTablet ? favouritesTablets.includes(itemId) : null;
  const isFavorite = isFavouritesPhonesIncludeId || isFavouritesTabletsIncludeId;
  const isInCart = isShoppingPhonesIncludeId || isShoppingTabletsIncludeId;

  const handleShoppingCarts = () => {
    if (isPhone && isShoppingPhonesIncludeId) {
      const filteredShoppingCart = shoppingPhones.filter(id => id !== itemId);

      localStorage.setItem('shoppingPhones', filteredShoppingCart.join(','));
      changeShoppingPhones(filteredShoppingCart);
    }

    if (isPhone) {
      const addedShoppingCart = [...shoppingPhones, itemId];

      localStorage.setItem('shoppingPhones', addedShoppingCart.join(','));
      changeShoppingPhones(addedShoppingCart);
    }

    if (isTablet && isShoppingTabletsIncludeId) {
      const filteredShoppingCart = shoppingTablets.filter(id => id !== itemId);

      localStorage.setItem('shoppingTablets', filteredShoppingCart.join(','));
      changeShoppingTablets(filteredShoppingCart);
    }

    if (isTablet) {
      const addedShoppingCart = [...shoppingTablets, itemId];

      localStorage.setItem('shoppingTablets', addedShoppingCart.join(','));
      changeShoppingTablets(addedShoppingCart);
    }
  }

  const handleFavourites = () => {
    if (isPhone && isFavouritesPhonesIncludeId) {
      const filteredFavourites = favouritesPhones.filter(id => id !== itemId);

      localStorage.setItem('favouritesPhones', filteredFavourites.join(','));
      changeFavouritesPhones(filteredFavourites);

      return;
    }

    if (isPhone) {
      const completeFavourites = [...favouritesPhones, itemId];

      localStorage.setItem('favouritesPhones', completeFavourites.join(','));
      changeFavouritesPhones(completeFavourites);

      return;
    }

    if (isTablet && isFavouritesTabletsIncludeId) {
      const filteredFavourites = favouritesTablets.filter(id => id !== itemId);

      localStorage.setItem('favouritesTablets', filteredFavourites.join(','));
      changeFavouritesTablets(filteredFavourites);

      return;
    }

    if (isTablet) {
      const completeFavourites = [...favouritesTablets, itemId];

      localStorage.setItem('favouritesTablets', completeFavourites.join(','));
      changeFavouritesTablets(completeFavourites);

      return;
    }
  };

  return (
    <div className="card">
      <div className="card__image-container">
        <Link to={isPhone ? phoneLink : itemId}>
          <img
            className="card__image"
            src={imagePath}
            alt="phone"
          />
        </Link>

      </div>

      <Link to={isPhone ? phoneLink : itemId} className="card__title">
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
            'card__add-button--is-selected': isInCart
          })}
          onClick={handleShoppingCarts}
        >
          {!isInCart
            ? 'Add to card'
            : 'Added'}
        </button>

        <button
          className={cn('card__like-button', {
            'card__like-button--is-selected': isFavorite
          })}
          onClick={handleFavourites}
        />
      </div>
    </div>
  );
});
