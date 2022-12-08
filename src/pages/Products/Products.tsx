import React, { useState, useEffect, useMemo } from 'react';
import { getAllPhones, getAllTablets } from '../../api/api';
import { Filter } from '../../components/Filter';
import { Pagination } from '../../components/Pagination';
import { Path } from '../../components/Path';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';
import { Good } from '../../types/Good';
import { SortBy, sortByOptions } from '../../types/SortyBy';
import './Products.scss';
import { useLocation } from 'react-router';

const perPageOptions = [16, 12, 8, 4];

type Props = {
  category: string,
  title: string
}

export const Products: React.FC<Props> = ({ category, title }) => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [visibleGoods, setVisibleGoods] = useState<Good[]>([])
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);
  const [perPage, setPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();

  const loadGoods = async () => {
    setIsLoaded(true);

    try {
      let goodsData;

      if (category === 'phones') {
        goodsData = await getAllPhones();
        setGoods(goodsData);
      }

      if (category === 'tablets') {
        goodsData = await getAllTablets();
        setGoods(goodsData);
      }

      setIsLoaded(false);
      getVisibleGoods();
    } catch {
      setIsLoaded(false);
      throw new Error('something wrong');
    }
  };

  const getVisibleGoods = () => {
    const start = perPage * (currentPage - 1);
    const end = perPage * (currentPage);
    const realEnd = end > goods.length ? goods.length : end;

    const visibleGoods = [...goods].sort((goodA, goodB) => {
      switch (sortBy) {
        case SortBy.Newest: {
          if (goodA.year && goodB.year) {
            return goodA.year - goodB.year;
          }

          return 0;
        }

        case SortBy.Oldest: {
          if (goodA.year && goodB.year) {
            return goodB.year - goodA.year;
          }

          return 0;
        }

        case SortBy.Cheaper:
          return goodA.price - goodB.price;

        case SortBy.More_Expensive:
          return goodB.price - goodA.price;

        default:
          return 0;
      }
    }).slice(start, realEnd);

    setVisibleGoods(visibleGoods);
  }

  const handleQuantityChange = (quantity: string) => {
    setPerPage(+quantity);
    setCurrentPage(1);
  }

  const handleTypeSortChange = (type: string) => {
    setSortBy(type as SortBy);
    setCurrentPage(1);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollBy({ top: -100000, behavior: 'smooth' });
  }

  useEffect(() => {
    if (goods.length === 0) {
      loadGoods();
    }

    getVisibleGoods();
  }, [goods, sortBy, perPage, currentPage]);

  useEffect(() => {
    loadGoods();
    setSortBy(SortBy.Newest);
    setCurrentPage(1);
    setPerPage(16);
  }, [pathname]);

  return (
    <div className="phones">
      <div>
        <Path />

        <div className="phones-page">
          <section className='phones-page__products products grid grid-mobile grid-tablet grid-desktop'>
            <h1 className='products__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-10'>
              {title}
            </h1>

            {isLoaded
              ? <Loader />
              : (
                <>
                  <div className='products__length grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-3'>
                    {`${goods.length} models`}
                  </div>

                  {goods.length !== 0 && <div className='products__filters grid-mobile-1-5 grid-tablet-1-8 grid-desktop-1-9'>
                    <div className="products__filter products__filter--left">
                      <Filter
                        title='Sort by'
                        optionsList={sortByOptions}
                        selectedFilter={sortBy}
                        handleFilterChange={handleTypeSortChange}
                      />
                    </div>

                    <div className="products__filter products__filter--right">
                      <Filter
                        title='Items per page'
                        optionsList={perPageOptions}
                        selectedFilter={perPage}
                        handleFilterChange={handleQuantityChange}
                      />
                    </div>
                  </div>}

                  <div className="
                    products__cards-wrapper
                    grid-mobile-1-5
                    grid-tablet-1-13
                    grid-desktop-1-25"
                  >
                    <div className="products__container">
                      {visibleGoods.map((good) => {

                        return (
                          <div className={
                            `products__product-container`
                          }
                            key={good.itemId}
                          >
                          <ProductCard
                            good={good}
                            path='phones'
                          />
                        </div>
                        )
                      })}
                    </div>

                    {goods.length !== 0 && <div className='
                      products__pagination-container
                      grid-mobile-1-5
                      grid-tablet-1-13
                      grid-desktop-1-25'
                    >
                      <Pagination
                        total={goods.length}
                        perPage={perPage}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                      />
                    </div>}
                  </div>
                </>
              )}
          </section>
        </div>
      </div>
    </div>
  );
};
