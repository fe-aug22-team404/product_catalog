import { FC } from 'react';
import { useNavigate } from "react-router-dom";
import './BackButton.scss';

export const BackButton: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  }

  return (
    <button className='back-button' onClick={handleClick}>
      <div className='back-button__image'/>
      <span className='back-button__title'>Back</span>
    </button>
  )
};
