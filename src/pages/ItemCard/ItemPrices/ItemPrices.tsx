import { FC, memo } from 'react';
import './ItemPrices.scss';

type Props = {
  priceDiscount: number,
  priceRegular: number
}

export const ItemPrices: FC<Props> = memo(({ priceDiscount, priceRegular }) => (
  <>
    <h2 className="item-prices__current-price">
      {`$${priceDiscount}`}
    </h2>

    <h2 className="item-prices__full-price">
      {`$${priceRegular}`}
    </h2>
  </>
));
