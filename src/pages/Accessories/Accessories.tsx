import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Accessories.scss';

export const Accessories: FC = () => {
  return (
    <div className="accessories">
      <h1 className="accessories__title">Section is under construction</h1>

      <Link
        to='/home'
        className="accessories__button"
      >
        Go Home
      </Link>
    </div>
  )
}
