import { FC } from 'react';
import './ImageBar.scss';
import classNames from 'classnames';

type Props = {
  altName: string,
  currentImage: number,
  images: string[],
  handleImageChange: (index: number) => void
}

export const ImageBar: FC<Props> = ({
  altName, currentImage, images, handleImageChange
}) => {
  return (
    <>
      {images.map((imageLink, i) => {
        const isSelected = i === currentImage;

        return (
          <div
            key={imageLink}
            className={classNames(
              'single-photo-box',
              {'single-photo-box--border-white': isSelected,
              'single-photo-box--border-grey': !isSelected,}
            )}
            onClick={() => handleImageChange(i)}
          >
            <img
              src={require(`../../../images/${imageLink}`)}
              alt={altName}
              className="single-photo-box__preview-image"
            />
          </div>
        );
      })}
    </>
  )
}
