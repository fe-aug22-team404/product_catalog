import { FC } from 'react';
import { ProductCard } from '../../../components/ProductCard';
import { Good } from '../../../types/Good';
import './ProductList.scss';

type Props = {
  goods: Good[];
};

export const ProductList: FC<Props> = ({ goods }) => {
  return (
    <div className="
      product-items__wrapper
      grid-mobile-1-5
      grid-tablet-1-13
      grid-desktop-1-25"
    >
      <ul className="product-items__list">
        {goods.map(good => (
          <li
            className='favorites__product-item'
            key={good.id}
          >
            <ProductCard
              good={good}
              path='favourites'
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
