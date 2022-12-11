import { FC, useContext, memo} from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './HeaderDesktop.scss';
import Logo from '../../../images/Logo.png';
import { motion } from "framer-motion";
import { routes } from '../Header.data';
import { AppContext } from '../../AppProvider';

export const HeaderDesktop: FC = memo(() => {
	const {
    favouritesPhones,
    favouritesTablets,
    shoppingPhones,
    shoppingTablets, } = useContext(AppContext);

	const favouritesItems = favouritesPhones.length + favouritesTablets.length;
  const shoppingCartItems = shoppingPhones.length + shoppingTablets.length;

	return (
		<div className="navigation">
			<div className="navigation__box">
				<div className="navigation__wrapper">
					<div className="navigation__left">
						<Link
							to="/home"
							className="navigation__logo-link"
						>
							<img src={Logo} alt="Nice gadgets" className="navigation__logo-img" />
						</Link>

						<nav className="navigation__pages">
							<ul className="navigation__list">
								{routes.map((route, i) => {
									return (<motion.li
										className="navigation__item"
										key={route}
										initial={{ opacity: 0}}
										animate={{ opacity: 1}}
										exit={{ opacity: 0 }}
										transition={{delay: i * 0.3}}
									>
										<NavLink
											to={route}
											className={({ isActive }) => classNames(
												'navigation__link',
												{ 'navigation__link--active': isActive },
											)}
										>
											{route === '/' ? 'home' : route}
										</NavLink>
									</motion.li>);
								})}
							</ul>
						</nav>
					</div>

					<div className="navigation__right">
						<Link
							to="favourites"
							className="navigation__favourites"
						>
							{favouritesItems > 0 && (
								<div className="navigation__link-img-count">{favouritesItems}</div>
							)}
						</Link>

						<Link
							to="cart"
							className="navigation__cart"
						>
						{shoppingCartItems > 0 && (
								<div className="navigation__link-img-count">{shoppingCartItems}</div>
							)}
						</Link>
					</div>
				</div>
			</div>

		</div>
	)
});
