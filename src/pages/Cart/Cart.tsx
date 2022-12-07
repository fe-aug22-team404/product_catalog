import classNames from 'classnames';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { BackButton } from '../../components/Back-Button';
import { Phone } from '../../types/Phone';

import './Cart.scss';
import { PrimaryButton } from '../../components/PrimaryButton';
import { getSelectedPhones } from '../../api/phoneDescription';
import { Loader } from '../../components/Loader';
import { AppContext } from '../../components/AppProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Checkout } from '../../types/Checkout';

type Props = {};

type Count = {
  phoneId: string;
  price: number
  count: number;
}

export const Cart: React.FC<Props> = () => {
  const { shoppingCart, changeShoppingCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [phones, setPhones] = useState<Phone[]>([]);
  const [counts, setCounts] = useState<Count[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);

  const [checkout, setCheckout] = useState<Checkout>(Checkout.noCheck);

  const initiateCounts = useCallback(() => {
    const getCountsArray = phones.reduce((arr: Count[], phone) => {
      const { phoneId, price } = phone;

      const count: Count = {
        phoneId,
        price: price,
        count: 1,
      };

      arr.push(count);

      return arr;
    }, []);

    setCounts(getCountsArray);
  }, [phones]);

  const addCount = (phoneId: string) => {
    setCounts(current => {
      const finded = current.find(count => count.phoneId === phoneId);

      if (finded && finded.count < 5) {
        finded.count += 1;

        return [
          ...current.filter(phone => phone.phoneId !== phoneId),
          finded,
        ];
      }

      return current;
    });
  };

  const removeCount = (phoneId: string) => {
    setCounts(current => {
      const finded = current.find(count => count.phoneId === phoneId);

      if (finded && finded.count > 1) {
        finded.count -= 1;

        return [
          ...current.filter(phone => phone.phoneId !== phoneId),
          finded,
        ];
      }

      return current;
    });
  };

  const totalPrice = counts.reduce((sum, count) => {
    return sum + (count.count * count.price);
  }, 0);

  const totalItems = counts.reduce((sum, count) => sum + count.count, 0);

  const loadPhones = useCallback(async(isLoad: boolean = false) => {
    if (isLoad) {
      setIsLoading(true);
    }

    try {
      const phonesData = await getSelectedPhones(shoppingCart.join(','));

      setPhones(phonesData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, []);
  
  const handlerDeleteMany = () => {
    const newShoppingCart = shoppingCart.filter(product => !selectedToDelete.includes(product));

    localStorage.setItem('shoppingCart', newShoppingCart.join(','));
    changeShoppingCart(newShoppingCart);
  };

  const handlerAddToDeleteList = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    phoneId: string,
    isToDelete: boolean,
  ) => {
    event.preventDefault();

    if (isToDelete) {
      setSelectedToDelete(curr => curr
        .filter(id => id !== phoneId));
    } else {
      setSelectedToDelete(curr => [
        ...curr,
        phoneId
      ]);                    
    }
  };

  const handlerDeleteFromCart = (productId: string) => {
    const newShoppingCart = shoppingCart.filter(product => product !== productId);

    localStorage.setItem('shoppingCart', newShoppingCart.join(','));
    changeShoppingCart(newShoppingCart);
  };

  const handlerPrimaryButton = () => {
    setCheckout(Checkout.loadCheck);

    setTimeout(() => {
      setCheckout(Checkout.endCheck);
    }, 3000);
  };

  const handlerConfirmCheck = () => {
    localStorage.setItem('shoppingCart', '');
    changeShoppingCart([]);

    setCheckout(Checkout.noCheck);
    navigate('/home');
  };

  useEffect(() => {
    loadPhones(true);
  }, []);

  useEffect(() => {
    const newPhones = phones.filter(({ phoneId }) => shoppingCart.includes(phoneId));

    setPhones(newPhones);
  }, [shoppingCart]);

  useEffect(() => {
    initiateCounts();
  }, [phones, initiateCounts]);


  return (
    <div className='container'>
      <section className='cart'>
      <BackButton />

      <h1 className='cart__title'>
        Cart
      </h1>

      <div className="
        cart__container
        grid
        grid-desktop"
      >
        {isLoading && <Loader />}
        {(phones.length > 0 && !isLoading && checkout !== Checkout.endCheck) && (
          <>
          <div className='grid-desktop-1-17'>
            {phones.map(phone => {
              const { image, name, price, phoneId, category } = phone; // here needs to destuction image path too!!!

              const imagePath = require('../../images/' + image);

              const count = counts
                .find(findedCount => findedCount.phoneId === phoneId);              
              const isToDelete = selectedToDelete.includes(phoneId);

              const linkPath = `/${category}/${phoneId}`;

              return count && (
                <div className={classNames(
                  'cart__product-cart',
                  'product-cart',
                )} key={phoneId}>
                  <div
                    className={classNames(
                      'product-cart__delete',
                      {
                        'product-cart__delete--selected': isToDelete,
                      },
                    )}
                    onClick={() => handlerDeleteFromCart(phoneId)}
                    onContextMenu={(event) => {
                      handlerAddToDeleteList(event, phoneId, isToDelete);                     
                    }}
                  />

                  <Link
                    to={linkPath}
                    className='product-cart__image-box'
                  >
                    <img
                      src={ imagePath }
                      className='product-cart__image'
                      alt="Phone"
                    />
                  </Link>

                  <Link
                    to={linkPath}
                    className='product-cart__title'
                  >
                    {name}
                  </Link>

                  <div className='product__counter counter'>
                    <div className={classNames(
                      'counter__minus',
                      {
                        'counter__minus--disable': count.count === 1,
                      }
                    )}
                    onClick={() => removeCount(phoneId)}
                  />
                    <div className="counter__value"> {count.count} </div>
                    <div
                      className={classNames(
                        'counter__plus',
                        {
                          'counter__plus--disable': count.count === 5,
                        },
                      )}
                      onClick={() => addCount(phoneId)}
                    />
                  </div>
                  <div className="product-cart__price">
                    ${price}
                  </div>
                </div>
              );
          })}
        </div>

        <div className={classNames(
          'cart__bill grid-desktop-17-25 bill',
          {
            'bill--operation': checkout === Checkout.loadCheck,
          }
        )}>
          <div className="bill__total-price">
            ${totalPrice}
          </div>

          <div className='bill__items'>
            {`Total for ${totalItems} items`}
          </div>

          <div className='bill__line'/>          
            <div className='bill__buttons-box'>
              <PrimaryButton
                title='Checkout'
                handler={handlerPrimaryButton}
              />

            {selectedToDelete.length > 0 && (
              <div
                className='bill__clear-button'
                onClick={handlerDeleteMany}
              >
                Clear
              </div>
            )}
          </div>
        </div>
      </>
      )}

        {(phones.length === 0 && !isLoading) && (
          (
            <div className='cart__empty-box grid-desktop-1-25'>
              No products in the cart
            </div>
          )
        )}
      </div>

      {checkout === Checkout.endCheck && (
        <div className='grid grid-desktop'>
          <div className="cart__bill bill grid-desktop-8-17">
            <div className="bill__total-price">
              The order is successful
            </div>

            <div className='bill__items'>
              {`Order №` + Array(4)
                .fill(null)
                .map(_ => String(Math.random()).slice(-4) + '-')
                .join('')
                .slice(0, -1)
              }
            </div>

            <PrimaryButton
              title='Go home'
              handler={handlerConfirmCheck}
            />
          </div>
        </div>
      )}
    </section>
    </div>
  )
};
