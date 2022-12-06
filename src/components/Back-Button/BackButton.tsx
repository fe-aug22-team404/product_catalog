import { FC } from 'react';
import { Link } from 'react-router-dom';

import './BackButton.scss';

type Props = {};

export const BackButton: FC<Props> = () => {
  return (
    <Link to='/' className='back-button'>
      <div className='back-button__image'/>
      <span className='back-button__title'>Back</span>
    </Link>
  )
};