import {
	FC,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
	memo,
} from 'react';
import classNames from 'classnames';
import './HeaderMobile.scss';
import { AppContext } from '../../AppProvider';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../images/Logo.png';
import { motion } from "framer-motion";
import { routes } from '../Header.data';

export const HeaderMobile: FC = memo(() => {
	const {
    favouritesPhones,
    favouritesTablets,
    shoppingPhones,
    shoppingTablets, } = useContext(AppContext);
	const [isOpen, setIsOpen] = useState(false);
  const favouritesItems = favouritesPhones.length + favouritesTablets.length;
  const shoppingCartItems = shoppingPhones.length + shoppingTablets.length;

	const body = useMemo(() => document.querySelector('body') as HTMLElement, []);

	const handleBurgerButton = useCallback(() => setIsOpen(current => !current), []);


	useEffect(() => {
		if (isOpen) {
			body.style.overflow = 'hidden';
		}

		if (!isOpen) {
			body.style.overflow = 'auto';
		}
	}, [isOpen])

	return (
		<div className={classNames(
			'burger__wrapper',
			{'burger__wrapper--opened': isOpen,
			'burger__wrapper--closed': !isOpen
			})}
		>
			<div className="burger__top">
				<Link
					to="/home"
					className="burger__top-link"
					onClick={handleBurgerButton}
				>
					<img src={Logo} alt="Nice gadgets" className="burger__top-img" />
				</Link>

				<div className={classNames(
					'burger__opener',
					{'burger__opener-closed': !isOpen,
					'burger__opener-opened': isOpen
					})}
					onClick={handleBurgerButton}
				></div>
			</div>

			{isOpen && <motion.nav
				className="burger__nav"
				initial={{ opacity: 0 }}
      	animate={{ opacity: 1 }}
      	exit={{ opacity: 0 }}
			>
				<ul className="burger__nav-list">
					{routes.map((route, i) => {
						return (<motion.li
							className="burger__nav-item"
							key={route}
							initial={{ opacity: 0, x: i % 2 ? -1000 : 1000}}
      				animate={{ opacity: 1, x: 0}}
      				exit={{ opacity: 0 }}
							transition={{delay: i * 0.3}}
						>
							<NavLink
								to={route}
								className={({ isActive }) => classNames(
									'burger__nav-link',
									{ 'burger__nav-link--active': isActive },
								)}
								onClick={handleBurgerButton}
							>
								{route === '/' ? 'home' : route}
							</NavLink>
						</motion.li>);
					})}
				</ul>
			</motion.nav>}

			{isOpen && <div className="burger__bottom">
				<Link
					to="favourites"
					className="burger__favourites"
					onClick={handleBurgerButton}
				>
					{favouritesItems > 0 && (
						<div className="burger__link-img-count">{favouritesItems}</div>
					)}
				</Link>

				<Link
					to="cart"
					className="burger__cart"
					onClick={handleBurgerButton}
				>
				{shoppingCartItems > 0 && (
						<div className="burger__link-img-count">{shoppingCartItems}</div>
					)}
				</Link>
			</div>}
		</div>
	)
});
