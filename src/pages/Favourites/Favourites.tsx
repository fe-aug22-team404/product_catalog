import {
  FC,
  useEffect,
  useState,
  useContext,
  memo,
  useCallback,
} from 'react';
import { getSelectedPhones } from '../../api/api';
import { ProductList } from './ProductList';
import { Loader } from '../../components/Loader';
import { Path } from '../../components/Path';
import { AppContext } from '../../components/AppProvider';
import { Phone } from '../../types/Phone';
import './Favourites.scss';

export const Favourites: FC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [reload, setReload] = useState(false);

  const { favourites } = useContext(AppContext);

  const favouritesItems = favourites.length;

  const getFavourites = useCallback(async () => {
    setIsLoaded(true);

    try {
      const phonesFromApi = await getSelectedPhones(favourites.join(','));

      setIsLoaded(false);
      setPhones(phonesFromApi);
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
    const newPhones = phones.filter(({ phoneId }) => favourites.includes(phoneId));

    setPhones(newPhones);
  }, [favourites]);

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

        {(!isLoaded && favourites.length !== 0) && (
          <>
            <p className="
                favourites__product-count
                grid-mobile-1-3
                grid-tablet-1-3
                grid-desktop-1-3"
            >
              {`${favouritesItems} items`}
            </p>

            <ProductList phones={phones} />
          </>
        )}

        {(!isLoaded && !favourites.length) && (
          <h3 className='favourites__empty-box grid-desktop-1-25'>
            No products in the favourites
          </h3>
        )}
      </div>
    </div>
  );
});
