import classNames from 'classnames';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { BackButton } from '../../components/Back-Button';
import { Good } from '../../types/Good';

import './Cart.scss';
import { PrimaryButton } from '../../components/PrimaryButton';
import { getSelectedPhones, getSelectedTablets } from '../../api/api';
import { Loader } from '../../components/Loader';
import { AppContext } from '../../components/AppProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Checkout } from '../../types/Checkout';

type Props = {};

type Count = {
  itemId: string;
  price: number
  count: number;
}

export const Cart: React.FC<Props> = () => {
  const {
    shoppingPhones,
    shoppingTablets,
    changeShoppingPhones,
    changeShoppingTablets
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [goods, setGoods] = useState<Good[]>([]);
  const [counts, setCounts] = useState<Count[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);

  const [checkout, setCheckout] = useState<Checkout>(Checkout.noCheck);

  const initiateCounts = useCallback(() => {
    if (!goods.length) {
      return;
    }

    const getCountsArray = goods.reduce((arr: Count[], good) => {
      const { itemId, price } = good;

      const count: Count = {
        itemId,
        price: price,
        count: 1,
      };

      arr.push(count);

      return arr;
    }, []);

    setCounts(getCountsArray);
  }, [goods]);

  const addCount = (itemId: string) => {
    setCounts(current => {
      const finded = current.find(count => count.itemId === itemId);

      if (finded && finded.count < 5) {
        finded.count += 1;

        return [
          ...current.filter(phone => phone.itemId !== itemId),
          finded,
        ];
      }

      return current;
    });
  };

  const removeCount = (itemId: string) => {
    setCounts(current => {
      const finded = current.find(count => count.itemId === itemId);

      if (finded && finded.count > 1) {
        finded.count -= 1;

        return [
          ...current.filter(phone => phone.itemId !== itemId),
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

  const loadGoods = async () => {
    setIsLoading(true);

    try {
      const [phones, tablets] = await Promise.all([
        getSelectedPhones(shoppingPhones.join(',')),
        getSelectedTablets(shoppingTablets.join(','))
      ]);
      const goods = [...phones, ...tablets];

      setGoods(goods);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const handlerDeleteMany = () => {
    const newShoppingPhones = shoppingPhones.filter(product => !selectedToDelete.includes(product));
    const newShoppingTablets = shoppingTablets.filter(product => !selectedToDelete.includes(product));

    setSelectedToDelete([]);
    localStorage.setItem('shoppingPhones', newShoppingPhones.join(','));
    localStorage.setItem('shoppingTablets', newShoppingTablets.join(','));
    changeShoppingPhones(newShoppingPhones);
    changeShoppingTablets(newShoppingTablets);
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
    const newShoppingPhones = shoppingPhones.filter(product => product !== productId);
    const newShoppingTablets = shoppingTablets.filter(product => product !== productId);

    localStorage.setItem('shoppingPhones', newShoppingPhones.join(','));
    localStorage.setItem('shoppingTablets', newShoppingTablets.join(','));
    changeShoppingPhones(newShoppingPhones);
    changeShoppingTablets(newShoppingTablets);
  };

  const handlerPrimaryButton = () => {
    setCheckout(Checkout.loadCheck);

    setTimeout(() => {
      setCheckout(Checkout.endCheck);
    }, 3000);
  };

  const handlerConfirmCheck = () => {
    localStorage.setItem('shoppingCart', '');
    changeShoppingPhones([]);
    changeShoppingTablets([]);

    setCheckout(Checkout.noCheck);
    navigate('/home');
  };

  useEffect(() => {
    loadGoods();
  }, [reload]);

  useEffect(() => {
    setReload(curr => !curr)
  }, [window.performance.timeOrigin])

  useEffect(() => {
    const newPhones = goods.filter(({ itemId }) => (
      shoppingPhones.includes(itemId) || shoppingTablets.includes(itemId)
    ));

    setGoods(newPhones);
  }, [shoppingPhones, shoppingTablets]);

  useEffect(() => {
    if (goods)  {
      initiateCounts();
    }
  }, [goods]);


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
        {(goods.length > 0 && !isLoading && checkout !== Checkout.endCheck) && (
          <>
          <div className='grid-desktop-1-17'>
            {goods.map(good => {
              const { image, name, price, itemId, category } = good; // here needs to destuction image path too!!!

              const imagePath = require('../../images/' + image);

              const count = counts
                .find(findedCount => findedCount.itemId === itemId);
              const isToDelete = selectedToDelete.includes(itemId);

              const linkPath = `/${category}/${itemId}`;

              return count && (
                <div className={classNames(
                  'cart__product-cart',
                  'product-cart',
                )} key={itemId}>
                  <div
                    className={classNames(
                      'product-cart__delete',
                      {
                        'product-cart__delete--selected': isToDelete,
                      },
                    )}
                    onClick={() => handlerDeleteFromCart(itemId)}
                    onContextMenu={(event) => {
                      handlerAddToDeleteList(event, itemId, isToDelete);
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
                    onClick={() => removeCount(itemId)}
                  />
                    <div className="counter__value"> {count.count} </div>
                    <div
                      className={classNames(
                        'counter__plus',
                        {
                          'counter__plus--disable': count.count === 5,
                        },
                      )}
                      onClick={() => addCount(itemId)}
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

        {(!goods.length && !isLoading) && (
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
