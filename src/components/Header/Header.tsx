import { useMemo, FC, memo } from 'react';
import './Header.scss';
import useWindowDimensions from '../../utils/customHooks/useWindowDimensions';
import { HeaderMobile } from './HeaderMobile';
import { HeaderDesktop } from './HeaderDesktop';

export const Header: FC = memo(() => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width < 640, [width]);


  return (
    <header className="header">
      {isMobile && <div className="header__burger burger">
        <HeaderMobile />
      </div>}

      {!isMobile &&
        <div className="header__desktop navigation">
          <HeaderDesktop />
      </div>}
    </header>
  );
});
