import React, { FC, memo } from 'react';

type Props = {
  altName: string,
  imageLink: string
}

export const MainImage: FC<Props> = memo(({
  altName, imageLink
}) => (
  <div
    className="phone-card__main-image-box"
  >
    <img
      src={require(`../../../images/${imageLink}`)}
      alt={altName}
      className="phone-card__main-image"
    />
  </div>
));
