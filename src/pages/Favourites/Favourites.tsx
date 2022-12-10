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
          grid-tablet-1-13
          grid-desktop-1-25"
        >
          Favourites
        </h1>

        {isLoaded && <Loader /> }


          {(!isLoaded && favouritesItems !== 0) && (
            <>
              <p className="
                favourites__product-count
                grid-mobile-1-5
                grid-tablet-1-7
                grid-desktop-1-25"
              >
                {`${favouritesItems} items`}
              </p>

              <div className="favourites__items-wrapper
                grid-mobile-1-5
                grid-tablet-1-13
                grid-desktop-1-25"
              >
                <ProductList goods={goods} />
              </div>
            </>
          )}

        {(!isLoaded && favouritesItems === 0) && (
          <h3 className='favourites__empty-box
            grid-mobile-1-5
            grid-tablet-1-13
            grid-desktop-1-25'
          >
            No products in the favourites
          </h3>
        )}
      </div>
    </div>
  );
});
