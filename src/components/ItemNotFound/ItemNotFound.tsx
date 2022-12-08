import { FC } from 'react';
import { Link } from 'react-router-dom';
import './ItemNotFound.scss';

export const ItemNotFound: FC = () => {
  return (
    <div className="item-not-found">
      <h1 className="item-not-found__title">Item not found</h1>

      <Link
        to='/home'
        className="item-not-found__button"
      >
        Go Home
      </Link>
    </div>
  )
}
