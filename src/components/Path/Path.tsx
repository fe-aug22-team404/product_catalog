import { FC, Fragment, memo, useEffect, useState } from 'react'
import classNames from 'classnames';
import Home from '../../images/Home.png';
import Arrow from '../../images/path_stroke.svg'
import { useLocation } from 'react-router';
import './Path.scss';
import { Link } from 'react-router-dom';

export const Path: FC = memo(() => {
  const [paths, setPaths] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.slice(1).split('/');

    setPaths(currentPath);
  }, [location])

  return (
    <div className="path">
      <Link to='/home'>
        <img
          className='path__img-home'
          src={ Home }
          alt="Home"
        />
      </Link>
      {paths && paths.map((path, i) => {
        const isLast = i === paths.length - 1;

        return (
          <Fragment key={path}>
            <img
              className='path__img-arrow'
              src={ Arrow }
              alt="arrow"
            />
            {isLast
              ? <span className="path__name path__name--color-grey">{path}</span>
              : (<Link
                  to={`/${path}`}
                  className="path__name path__name--color-white path__name--cursor-pointer"
                >
                  {path}
                </Link>)}

          </Fragment>
        )
      })}
    </div>
  )
});
