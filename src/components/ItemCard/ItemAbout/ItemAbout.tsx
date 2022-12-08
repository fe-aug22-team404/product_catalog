import { FC, Fragment, memo } from 'react';
import classNames from 'classnames';
import Description from '../../../types/PhoneDescription';
import './ItemAbout.scss';

type Props = {
  description: Description[],
}

export const ItemAbout: FC<Props> = memo(({
  description,
}) => (
  <>
    <h4 className="item-about__title">
      About
    </h4>

    {description.map(({title, text}) => {
      return (
        <Fragment key={title}>
          <h5 className="item-about__subtitle">
            {title}
          </h5>

          {text.map((paragraph, i) => {
            const isLast = text.length - 1 === i;

            return (
              <p
                key={paragraph}
                className={classNames(
                  'item-about__text',
                  {'item-about__text--position-last': isLast}
                )}
              >
                {paragraph}
              </p>
            );
          })}
        </Fragment>
      )
    })}
  </>
));
