import {
  FC,
  useEffect,
  useState,
  useContext,
  memo,
  useCallback,
} from 'react';
import { getSelectedPhones, getSelectedTablets } from '../../api/api';
import { ProductList } from './ProductList';
import { Loader } from '../../components/Loader';
import { Path } from '../../components/Path';
import { AppContext } from '../../components/AppProvider';
import { Good } from '../../types/Good';
import './Favourites.scss';

export const Favourites: FC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [goods, setGoods] = useState<Good[]>([]);
  const [reload, setReload] = useState(false);

  const { favouritesPhones, favouritesTablets } = useContext(AppContext);

  const favouritesItems = favouritesPhones.length + favouritesTablets.length;

  const getFavourites = useCallback(async () => {
    setIsLoaded(true);

    try {
      const [phones, tablets] = await Promise.all([
        getSelectedPhones(favouritesPhones.join(',')),
        getSelectedTablets(favouritesTablets.join(','))
      ]);
      const goods = [...phones, ...tablets];

      setIsLoaded(false);
      setGoods(goods);
    } catch (err: any) {
      setIsLoaded(false);
      throw new Error(err);
    }
  }, [reload]);

  useEffect(() => {
    getFavourites();
  }, [reload]);

  useEffect(() => {
    setReload(curr => !curr);
  },[window.performance.timeOrigin]);

  useEffect(() => {
    const modifiedGoods = goods.filter(({ itemId }) => (
      favouritesPhones.includes(itemId) || favouritesTablets.includes(itemId)
    ));

    setGoods(modifiedGoods);
  }, [favouritesPhones, favouritesTablets]);

  return (
    <div className="favourites">
      <Path />

      <div className="
        grid
        grid-mobile
        grid-tablet
        grid-desktop"
      >
        <h1 className="
          favourites__title
          grid-mobile-1-5
          grid-tablet-1-7
          grid-desktop-1-7"
        >
          Favourites
        </h1>

        {isLoaded && <Loader /> }

        {(!isLoaded && favouritesItems !== 0) && (
          <>
            <p className="
                favourites__product-count
                grid-mobile-1-3
                grid-tablet-1-3
                grid-desktop-1-3"
            >
              {`${favouritesItems} items`}
            </p>

            <ProductList goods={goods} />
          </>
        )}

        {(!isLoaded && favouritesItems === 0) && (
          <h3 className='favourites__empty-box grid-desktop-1-25'>
            No products in the favourites
          </h3>
        )}
      </div>
    </div>
  );
});
