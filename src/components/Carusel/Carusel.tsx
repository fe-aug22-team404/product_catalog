import classNames from 'classnames';
import { FC, useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Good } from '../../types/Good';
import { ProductCard } from '../ProductCard';
import './Carusel.scss';
import leftArrow from '../../images/arrow-left.svg';
import rightArrow from '../../images/arrow-right.svg';
import useWindowDimensions from '../../utils/customHooks/useWindowDimensions';
import { getArrangedPhones } from '../../api/api';
import { Loader } from '../Loader';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

type Props = {
  title: string;
  orderType: string;
  path: string;
};

export const Carusel: FC<Props> = ({ orderType, title, path }) => {
  const [position, setPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [phones, setPhones] = useState<Good[] | null>(null);
	const swiperRef = useRef<SwiperRef>(null);
  const { width } = useWindowDimensions();
  const step = useMemo(() => {
    const start = 310;
    const usedWidth = width < 1200 ? width : 1200;
    
    return Math.round(usedWidth / start * 10) / 10;
    
  }, [width, phones]);

  const getPhones = async () => {
    setIsLoaded(true);

    try {
      const phonesFromApi = await (await getArrangedPhones(orderType)).slice(0, 10);

      if (orderType === 'price') {
        phonesFromApi.sort((phoneA, phoneB) => {
          const discountPhoneA: number = phoneA.fullPrice - phoneA.price;
          const discountPhoneB: number = phoneB.fullPrice - phoneB.price;

          return discountPhoneB - discountPhoneA;
        })
      }
      setIsLoaded(false);
      setPhones(phonesFromApi);
    } catch (err: any) {
      setIsLoaded(false);
      throw new Error(err);
    }
  };

  const isStart = position === 0;

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
    setIsEnd(false);
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    setPosition(0);
  }, [width, phones])

  useEffect(() => {
    getPhones();
  }, [])

  return (
    <section className="Carusel grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
      <div className="Carusel__top">
        <h2 className="Carusel__title">{title}</h2>

        <div className="Carusel__btns">
          <button
            className={classNames('Carusel__btn', {
                'Carusel__btn--off': isStart
              }
            )}
            type="button"
            onClick={handlePrev}
            disabled={isStart}
          >
            <img
              className={classNames(
                { 'Carusel__img-off': isStart },
              )}
              src={leftArrow}
              alt="btn"
            />
          </button>
          <button
            className={classNames('Carusel__btn', {
                'Carusel__btn--off': isEnd
              }
            )}
            type="button"
            onClick={handleNext}
            disabled={isEnd}
          >
            <img
              className={classNames(
                { 'Carusel__img-off': isEnd },
              )}
              src={rightArrow}
              alt="btn"
            />
          </button>
        </div>
      </div>

      {isLoaded
        ? <Loader />
        : (<div className="Carusel__wrap grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
            <ul
              className="Carusel__list"
            >
              <Swiper
                  initialSlide={position}
                  spaceBetween={16}
                  slidesPerView={step}
                  scrollbar={{ draggable: true }}
                  onSlideChange={(swiper) => {
                    setPosition(swiper.activeIndex);
                    setIsEnd(false);
                  }}
                  onSwiper={(swiper) => {
                    setPosition(swiper.activeIndex);
                  }}
                  onReachEnd={() => setIsEnd(true)}
                  ref={swiperRef}
                >
                  
                  {phones?.map((phone) => {
                    return (<SwiperSlide
                      key={phone.name}
                    >
                      <div className="carusel__card">
                        <ProductCard
                          key={phone.name}
                          path={path}
                          good={phone}
                        />
                      </div>
                    </SwiperSlide>)
                  })}
                </Swiper>
            </ul>
          </div>)
      }
    </section>
  );
};
