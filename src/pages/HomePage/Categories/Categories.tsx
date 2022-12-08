import React from 'react';
import { NavLink } from 'react-router-dom';
import './Categories.scss';

import Phones from '../../../images/Phones.png';
import Tablets from '../../../images/Tablets.png';
import Accessories from '../../../images/Accessories.png';

type Props = {
  phonesCount: number;
  tabletCount: number;
  accessoriesCount: number;
};

export const Categories: React.FC<Props> = ({
    phonesCount,
    tabletCount,
    accessoriesCount,
  },
) => {
  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <ul className="categories__list">
        <li className="categories__item">
          <NavLink className="categories__link" to="/phones">
            <div
              className="categories__link-container"
            >
              <img
                src={Phones}
                alt="phones"
                className="categories__img"
              />
            </div>

            <h4 className="categories__subtitle">Mobile phones</h4>
          </NavLink>
          <span className="categories__info">
            {`${phonesCount} models`}
          </span>
        </li>

        <li className="categories__item">
          <NavLink className="categories__link" to="/tablets">
            <div
              className="categories__link-container"
            >
              <img
                src={Tablets}
                alt="tablets"
                className="categories__img"
              />
            </div>

            <h4 className="categories__subtitle">Tablets</h4>
          </NavLink>
          <span className="categories__info">
            {`${tabletCount} models`}
          </span>
        </li>

        <li className="categories__item">
          <NavLink className="categories__link" to="/accessory">
            <div
              className="categories__link-container"
            >
              <img
                src={Accessories}
                alt="category"
                className="categories__img"
              />
            </div>

            <h4 className="categories__subtitle">Accessories</h4>
          </NavLink>
          <span className="categories__info">
            {`${accessoriesCount} models`}
          </span>
        </li>
      </ul>
    </section>
  );
};
