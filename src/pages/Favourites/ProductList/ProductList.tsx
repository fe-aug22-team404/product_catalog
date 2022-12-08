import { FC } from 'react';
import { ProductCard } from '../../../components/ProductCard';
import { Phone } from '../../../types/Phone';
import './ProductList.scss';

type Props = {
  phones: Phone[];
};

export const ProductList: FC<Props> = ({ phones }) => {
  return (
    <div className="
      product-items__wrapper
      grid-mobile-1-5
      grid-tablet-1-13
      grid-desktop-1-25"
    >
      <ul className="product-items__list">
        {phones.map(phone => (
          <li
            className='favorites__product-item'
            key={phone.id}
          >
            <ProductCard
              phone={phone}
              path='favourites'
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
