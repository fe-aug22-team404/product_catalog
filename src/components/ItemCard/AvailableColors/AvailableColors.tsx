import { FC, memo } from 'react';
import './AvailableColors.scss';
import classNames from 'classnames';

type Props = {
  colorsAvailable: string[],
  currentColor: string,
  handleColorChange: (currColor: string, newColor: string) => void
}

export const AvailableColors: FC<Props> = memo(({
  colorsAvailable, currentColor, handleColorChange
}) => {
  return (
    <>
      <h4 className="available-colors__title">
        Available colors
      </h4>

      <div className="available-colors__colors-options">
        {colorsAvailable.map(color => {
        const isCurrent = color === currentColor;

        return (
          <div
            className={classNames(
              'available-colors__color-box',
              `${color}`,
              {'available-colors__color-box--border-white': isCurrent,
              'available-colors__color-box--border-gray': !isCurrent,
              }
            )}
            key={color}
            onClick={() => handleColorChange(currentColor, color)}
          >
          </div>
        )})}
      </div>
    </>
  )
});
