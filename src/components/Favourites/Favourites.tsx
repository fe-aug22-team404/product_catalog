import {FC, useCallback, useEffect, useState, useContext} from 'react';
import { Path } from '../Path';
import { getSelectedPhones } from '../../api/api';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader';
import { AppContext } from '../AppProvider/AppProvider';
import './Favourites.scss';

export const Favourites: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [reload, setReload] = useState(false);
  const { favourites } = useContext(AppContext);
  const favouritesItems = favourites.length;

  const getFavourites = async () => {
    setIsLoaded(true);

    try {
      const phonesFromApi = await getSelectedPhones(favourites.join(','));

      setIsLoaded(false);
      setPhones(phonesFromApi);
    } catch (err: any) {
      setIsLoaded(false);
      throw new Error(err);
    }
  };

  useEffect(() => {
    getFavourites();
  }, [reload]);

  useEffect(() => {
    setReload(curr => !curr)
  },[window.performance.timeOrigin]);

  useEffect(() => {
    const newPhones = phones.filter(({ phoneId }) => favourites.includes(phoneId));

    setPhones(newPhones);
  }, [favourites]);



  return (
      <div className="favourites">
        <Path />
        <div className="grid grid-mobile grid-tablet grid-desktop">
          <h1 className="favourites__title grid-mobile-1-5 grid-tablet-1-7 grid-desktop-1-7">
            Favourites
          </h1>

          {isLoaded && <Loader /> }

          {(!isLoaded && favourites.length !== 0) && (<>
                <div className="favourites__product-count grid-mobile-1-3 grid-tablet-1-3 grid-desktop-1-3">
                  {`${favouritesItems} items`}
                </div>

                <div className="
                  favourites__wrapper
                  grid-mobile-1-5
                  grid-tablet-1-13
                  grid-desktop-1-25"
                >
                  <div className="favourites__list">
                    {phones.map(phone => (
                      <div className='favorites__product-item' key={phone.id} >
                        <ProductCard
                          phone={phone}
                          path='favourites'
                        />
                      </div>)
                    )}
                  </div>
                </div>
              </>)}
            {(!isLoaded && favourites.length === 0) && (
                <div className='favourites__empty-box grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25'>
                  No products in the favourites
                </div>
              )}
        </div>
      </div>
  );
};
