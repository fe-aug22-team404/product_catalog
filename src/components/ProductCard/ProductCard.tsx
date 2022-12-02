import {
  FC,
  useEffect,
  useState,
  memo,
} from 'react';
import cn from 'classnames';
import { Phone } from '../../types/Phone';

import './ProductCard.scss';

type Props = {
  phone: Phone;
};

export const ProductCard: FC<Props> = memo(({ phone }) => {
  const {
    itemId,
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = phone;

  const [phonesInCart, setPhonesInCart] = useState<string[]>([]);
  const [favouritePhones, setFavouritePhones] = useState<string[]>([]);

  const imagePath = require(`../../images/${image.replace('.jpg', '.png')}`);

  const handlePhonesInCart = () => {
    if (phonesInCart.includes(phoneId)) {
      setPhonesInCart(prevPhonesInCart => {
        const filteredPhonesInCart = prevPhonesInCart.filter(id => (
          id !== phoneId
        ));

        return filteredPhonesInCart;
      });
    } else {
      setPhonesInCart((prevPhonesInCart) => {
        return [...prevPhonesInCart, itemId];
      });
    }
  }
  const handleFavouritePhones = () => {
    if (favouritePhones.includes(phoneId)) {
      setFavouritePhones(prevFavouritePhones => {
        const filteredFavouritePhones = prevFavouritePhones.filter(id => (
          id !== phoneId
        ));

        return filteredFavouritePhones;
      });
    } else {
      setFavouritePhones((prevFavouritePhones) => {
        return [...prevFavouritePhones, itemId];
      });
    }
  };

  const isPhonesInCartIncludeId = localStorage.getItem('phonesInCart')?.includes(phoneId);
  const isFavouritePhonesIncludeId = favouritePhones.includes(phoneId);

  useEffect(() => {
    const phonesInCartToStr = phonesInCart.join(',');

    localStorage.setItem('phonesInCart', phonesInCartToStr);
  }, [phonesInCart]);

  useEffect(() => {
    const favouritePhonesToStr = favouritePhones.join(',');

    localStorage.setItem('favouritePhones', favouritePhonesToStr);
  }, [favouritePhones]);

  return (
    <div className="card">
      <div className="card__image-container">
        <img
          className="card__image"
          src={imagePath}
          alt="phone"
        />
      </div>

      <a href={'/'} className="card__title">
        {name}
      </a>

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
            'card__add-button--is-selected': isPhonesInCartIncludeId
          })}
          onClick={handlePhonesInCart}
        >
          {!isPhonesInCartIncludeId
            ? 'Add to card'
            : 'Added'}
        </button>

        <button
          className={cn('card__like-button', {
            'card__like-button--is-selected': isFavouritePhonesIncludeId
          })}
          onClick={handleFavouritePhones}
        />
      </div>
    </div>
  );
});
