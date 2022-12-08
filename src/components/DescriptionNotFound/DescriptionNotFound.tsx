import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './DescriptionNotFound.scss';

export const DescriptionNotFound: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="description-not-found">
      <h1 className="description-not-found__title">Description not found</h1>

      <button
        className="description-not-found__button"
        onClick={handleClick}
      >
        Go Back
      </button>
    </div>
  );
}
