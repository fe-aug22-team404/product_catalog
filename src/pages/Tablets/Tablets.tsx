import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Tablets.scss';

export const Tablets: FC = () => {
  return (
    <div className="tablets">
      <h1 className="tablets__title">Section is under construction</h1>

      <Link
        to='/home'
        className="tablets__button"
      >
        Go Home
      </Link>
    </div>
  )
}
