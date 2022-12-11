import { FC, memo, useEffect } from 'react';
import { Path } from '../../components/Path';
import './Contributors.scss';
import { contributorsData } from './Contributors.data';
import { Person } from './Person';

export const Contributors: FC = memo(() => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [])

	return (
		<div className="contributors">
      <Path />

			<div className="
        grid
        grid-mobile
        grid-tablet
        grid-desktop"
      >
				<h1 className="
          contributors__title
          grid-mobile-1-5
          grid-tablet-1-7
          grid-desktop-1-7"
        >
          Contributors
        </h1>
				
				<div className="contributors__info
					grid-mobile-1-5
          grid-tablet-1-13
          grid-desktop-1-25"
				>
					{contributorsData.map(contributor => (
						<Person person={contributor} key={contributor.linkedIn} />
					))}
				</div>
			</div>
		</div>
	)
});
