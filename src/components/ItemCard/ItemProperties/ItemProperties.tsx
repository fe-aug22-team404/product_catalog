import { FC, memo } from 'react';
import { PhoneProperties } from '../../../types/PhoneProperties';
import './ItemProperties.scss';

type Props = {
  itemProperties: PhoneProperties,
  additionalClasses: string[],
}

export const ItemProperties: FC<Props> = memo(({ itemProperties, additionalClasses }) => (
  <>
    {Object.entries(itemProperties).map(([key, value]) => {
      if (key === 'Camera') {
        value = `${value} ${value.split('+').length === 3 ? '(Triple)' : '(Double)'}`;
      }

      if (key === 'Cell') {
        value = value.join(', ');
      }

      const keyClass = additionalClasses?.length
        ? `item-properties__name ${ additionalClasses[0] }`
        : 'item-properties__name';
      const valueClass = additionalClasses?.length
        ? `item-properties__value ${ additionalClasses[1] }`
        : 'item-properties__value';


      return value && (<div
        className="item-properties__line"
        key={key}
      >
        <div className={keyClass}>{key}</div>
        <div className={valueClass}>{value}</div>
      </div>
      )})}
  </>
));
