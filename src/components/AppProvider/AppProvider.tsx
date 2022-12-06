import { FC, createContext, useState, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
}

type Context = {
  favourites: string[],
  shoppingCart: string[],
  changeFavourites: (value: string[]) => void,
  changeShoppingCart: (value: string[]) => void
}

export const AppContext = createContext<Context>({
  favourites: [],
  shoppingCart: [],
  changeFavourites: () => {},
  changeShoppingCart: () => {}
})

export const AppProvider: FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [shoppingCart, setShoppingCart] = useState<string[]>([]);

  const changeFavourites = (newFavourites: string[]) => {
    setFavourites(newFavourites);
  }

  const changeShoppingCart = (newShoppingCart: string[]) => {
    setShoppingCart(newShoppingCart);
  }

  useEffect(() => {
    const favouriteFromStorage = localStorage.getItem('favourites');
    const favouritesData = favouriteFromStorage
      ? favouriteFromStorage.split(',')
      : [];

    const shoppingCartFromStorage = localStorage.getItem('shoppingCart');
    const shoppingCartData = shoppingCartFromStorage
      ? shoppingCartFromStorage.split(',')
      : [];

    if (favouritesData) {
      setFavourites(favouritesData);
    }

    if (shoppingCartData) {
      setShoppingCart(shoppingCartData);
    }
  }, [])

  const contextValue = {
    favourites,
    shoppingCart,
    changeFavourites,
    changeShoppingCart
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}
