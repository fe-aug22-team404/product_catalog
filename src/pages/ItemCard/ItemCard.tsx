import { FC, useEffect, useState, useContext, useCallback } from 'react';
import classNames from 'classnames';
import { getPhoneDescription } from '../../api/api';
import PhoneDescr from '../../types/PhoneDescription';
import { useLocation, useNavigate, useParams } from 'react-router';
import { PhoneProperties } from '../../types/PhoneProperties';
import './ItemCard.scss';
import { Path } from '../../components/Path';
import { Loader } from '../../components/Loader';
import { ItemNotFound } from '../../components/ItemNotFound';
import { ItemAbout } from './ItemAbout';
import { ItemProperties } from './ItemProperties';
import { MainImage } from './MainImage';
import { ImageBar } from './ImageBar';
import { ItemPrices } from './ItemPrices';
import { AvailableCapacity } from './AvailableCapacity';
import { AvailableColors } from './AvailableColors';
import { Carusel } from '../../components/Carusel';
import { AppContext } from '../../components/AppProvider';

export const ItemCard: FC = () => {
  const { openedPhoneId = '' } = useParams();
  const [phoneData, setPhoneData] = useState<PhoneDescr | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [phoneId, setPhoneId] = useState(openedPhoneId);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState('')
  const {
    favouritesPhones,
    shoppingPhones,
    changeFavouritesPhones,
    changeShoppingPhones} = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isShoppingCartIncludeId = shoppingPhones.includes(phoneId);
  const isFavouritesIncludeId = favouritesPhones.includes(phoneId);
  const itemProperties: PhoneProperties = {
    Screen: phoneData?.screen || null,
    Resolution: phoneData?.resolution || null,
    Processor: phoneData?.processor || null,
    RAM: phoneData?.ram || null
  };
  const itemTechProperties = {
    Screen: phoneData?.screen || null,
    Resolution: phoneData?.resolution || null,
    Processor: phoneData?.processor || null,
    RAM: phoneData?.ram || null,
    'Built in memory': phoneData?.capacity || null,
    Camera: phoneData?.camera || null,
    Zoom: phoneData?.zoom || null,
    Cell: phoneData?.cell || null
  }

  const handleShoppingCarts = () => {
    if (isShoppingCartIncludeId) {
      const filteredShoppingCart = shoppingPhones.filter(id => id !== phoneId);

      localStorage.setItem('shoppingPhones', filteredShoppingCart.join(','));
      changeShoppingPhones(filteredShoppingCart);
    } else {
      const addedShoppingCart = [...shoppingPhones, phoneId];

      localStorage.setItem('shoppingPhones', addedShoppingCart.join(','));
      changeShoppingPhones(addedShoppingCart);
    }
  }

  const handleFavourites = () => {
    if (isFavouritesIncludeId) {
      const filteredFavourites = favouritesPhones.filter(id => id !== phoneId);

      localStorage.setItem('favouritesPhones', filteredFavourites.join(','));
      changeFavouritesPhones(filteredFavourites);
    } else {
      const completeFavourites = [...favouritesPhones, phoneId];

      localStorage.setItem('favouritesPhones', completeFavourites.join(','));
      changeFavouritesPhones(completeFavourites);
    }
  };

  const loadPhoneDescription = async () => {
    try {
      const phoneDataFromAPI: PhoneDescr = await getPhoneDescription(phoneId);

      setPhoneData(phoneDataFromAPI);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const handleImageChange = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  const handleMouseDown = (event: React.MouseEvent, imageAmount: number) => {
    const currentHalfWidth = document.body.clientWidth < 640
      ? document.body.clientWidth / 2
      : (7 * document.body.clientWidth / 24) + 40;
    const click = event.clientX;

    if (click < currentHalfWidth) {
      setCurrentImage(curr => {
        return curr ? curr - 1 : imageAmount - 1
      })
    }

    if (click > currentHalfWidth) {
      setCurrentImage(curr => {
        return curr === imageAmount - 1 ? 0 : curr + 1
      })
    }
  };

  const handleColorChange = useCallback((currentColor: string, color: string) => {
    setPhoneId(current => (
      current.replace(currentColor, color)
    ));
  }, []);

  const handleCapacityChange = useCallback((currentCapacity: string, capacity: string) => {
    setPhoneId(current => (
      current.replace(currentCapacity.toLowerCase(), capacity.toLowerCase())
    ));
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath !== path) {
      const newId = location.pathname.slice(1).split('/')[1];

      setPhoneId(newId)
    }
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    loadPhoneDescription();
    navigate(`/phones/${phoneId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const currentPath = location.pathname;
    setPath(currentPath);
  }, [phoneId]);

  return (
    <>
      {isLoading && !phoneData && <Loader />}
      {isError
        ? <ItemNotFound />
        : (
          <div className='item-card'>
            {phoneData &&
              <div className='item-card__phone-card phone-card grid grid-mobile grid-tablet grid-desktop'>
                <div className='grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25'>
                  <Path />
                </div>

                <h1 className='phone-card__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25'>
                  {phoneData.name}
                </h1>

                <MainImage
                  handleMouseDown={handleMouseDown}
                  imageAmount={phoneData.images.length}
                  altName={phoneData.name}
                  imageLink={phoneData.images[currentImage]}
                />

                <div className="phone-card__other-photo-box grid-mobile-1-5 grid-tablet-1-2 grid-desktop-1-3">
                  <ImageBar
                    images={phoneData.images}
                    currentImage={currentImage}
                    handleImageChange={handleImageChange}
                    altName={phoneData.name}
                  />
                </div>

                <div className="phone-card__short-info short-info grid-mobile-1-5 grid-tablet-8-13 grid-desktop-14-21">
                  <div className="short-info__phone-id">
                    ID: 802301
                  </div>

                  <div className="short-info__colors available-colors">
                    <AvailableColors
                      colorsAvailable={phoneData.colorsAvailable}
                      currentColor={phoneData.color}
                      handleColorChange={handleColorChange}
                    />
                  </div>

                  <div className="short-info__capacity available-capacity">
                    <AvailableCapacity
                      capacityAvailable={phoneData.capacityAvailable}
                      currentCapacity={phoneData.capacity}
                      handleCapacityChange={handleCapacityChange}
                    />
                  </div>

                  <div className="short-info__price-container item-prices">
                    <ItemPrices
                      priceDiscount={phoneData.priceDiscount}
                      priceRegular={phoneData.priceRegular}
                    />
                  </div>

                  <div className="short-info__buttons-container">
                    <button
                      className={classNames('short-info__add-button', {
                        'short-info__add-button--is-selected': isShoppingCartIncludeId
                      })}
                      onClick={handleShoppingCarts}
                    >
                      {!isShoppingCartIncludeId
                        ? 'Add to cart'
                        : 'Added'}
                    </button>

                    <button
                      className={classNames('short-info__like-button', {
                        'short-info__like-button--is-selected': isFavouritesIncludeId
                      })}
                      onClick={handleFavourites}
                    />
                  </div>

                  <div className="short-info__properties item-properties">
                    <ItemProperties
                      itemProperties={itemProperties}
                      additionalClasses={[]}
                    />
                  </div>
                </div>

                <div className="phone-card__about item-about grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-13">
                  <ItemAbout
                    description={phoneData.description}
                  />
                </div>

                <div className="phone-card__technical grid-mobile-1-5 grid-tablet-1-13 grid-desktop-14-25">
                  <h4 className="phone-card__technical-title">
                    Tech specs
                  </h4>

                  <div className="short-info__properties item-properties">
                    <ItemProperties
                      itemProperties={itemTechProperties}
                      additionalClasses={['item-properties__name--font-size', 'item-properties__value--font-size']}
                    />
                  </div>
                </div>
            </div>}

            {phoneData && (
              <div className="item-card__carusel">
                <Carusel
                  orderType="random"
                  title="You may also like"
                  path='itemCard'
                />
              </div>)
            }
          </div>
        )
      }
    </>
  )
}
