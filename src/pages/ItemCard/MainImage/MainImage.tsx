import React, { FC, memo } from 'react';

type Props = {
  handleMouseDown: (event: React.MouseEvent, imageAmount: number) => void,
  imageAmount: number,
  altName: string,
  imageLink: string
}

export const MainImage: FC<Props> = memo(({
  handleMouseDown, imageAmount, altName, imageLink
}) => (
  <div
    className="phone-card__main-image-box grid-mobile-1-5 grid-tablet-2-8 grid-desktop-3-13"
    onMouseDown={event => handleMouseDown(event, imageAmount)}
  >
    <img
      src={require(`../../../images/${imageLink}`)}
      alt={altName}
      className="phone-card__main-image"
    />
  </div>
));
