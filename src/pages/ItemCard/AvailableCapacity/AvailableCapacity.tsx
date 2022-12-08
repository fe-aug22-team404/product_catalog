import { FC, memo } from 'react';
import './AvailableCapacity.scss';
import classNames from 'classnames';

type Props = {
  capacityAvailable: string[],
  currentCapacity: string,
  handleCapacityChange: (currCapacity: string, newCapacity: string) => void
}

export const AvailableCapacity: FC<Props> = memo(({
  capacityAvailable, currentCapacity, handleCapacityChange
}) => {
  return (
    <>
      <h4 className="available-capacity__title">
        Select capacity
      </h4>

      <div className="available-capacity__options">
        {capacityAvailable.map(capacity => {
          const isCurrent = capacity === currentCapacity;

          return (
            <div
              className={classNames(
                {'available-capacity__box--current': isCurrent,
                'available-capacity__box--option': !isCurrent,
                }
              )}
              key={capacity}
              onClick={() => handleCapacityChange(currentCapacity, capacity)}
            >
              {capacity}
            </div>
          );
        })}
      </div>
    </>
  )
});
