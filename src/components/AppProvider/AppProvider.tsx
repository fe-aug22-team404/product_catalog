import { FC, createContext, useState, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
}

type Context = {
  favouritesPhones: string[],
  favouritesTablets: string[],
  shoppingPhones: string[],
  shoppingTablets: string[],
  changeFavouritesPhones: (value: string[]) => void,
  changeFavouritesTablets: (value: string[]) => void,
  changeShoppingPhones: (value: string[]) => void,
  changeShoppingTablets: (value: string[]) => void
}

export const AppContext = createContext<Context>({
  favouritesPhones: [],
  favouritesTablets: [],
  shoppingPhones: [],
  shoppingTablets: [],
  changeFavouritesPhones: () => {},
  changeFavouritesTablets: () => {},
  changeShoppingPhones: () => {},
  changeShoppingTablets: () => {}
})

export const AppProvider: FC<Props> = ({ children }) => {
  const [favouritesPhones, setFavouritesPhones] = useState<string[]>([]);
  const [favouritesTablets, setFavouritesTablets] = useState<string[]>([]);
  const [shoppingPhones, setShoppingPhones] = useState<string[]>([]);
  const [shoppingTablets, setShoppingTablets] = useState<string[]>([]);

  const changeFavouritesPhones = (newFavourites: string[]) => {
    setFavouritesPhones(newFavourites);
  }

  const changeFavouritesTablets = (newFavourites: string[]) => {
    setFavouritesTablets(newFavourites);
  }

  const changeShoppingPhones = (newShoppingCart: string[]) => {
    setShoppingPhones(newShoppingCart);
  }
  const changeShoppingTablets = (newShoppingCart: string[]) => {
    setShoppingTablets(newShoppingCart);
  }

  useEffect(() => {
    const favouritePhonesFromStorage = localStorage.getItem('favouritesPhones');
    const favouritesPhonesData = favouritePhonesFromStorage
      ? favouritePhonesFromStorage.split(',')
      : [];

    const favouriteTabletsFromStorage = localStorage.getItem('favouritesTablets');
    const favouritesTabletsData = favouriteTabletsFromStorage
      ? favouriteTabletsFromStorage.split(',')
      : [];

    const shoppingPhonesFromStorage = localStorage.getItem('shoppingPhones');
    const shoppingPhonesData = shoppingPhonesFromStorage
      ? shoppingPhonesFromStorage.split(',')
      : [];

    const shoppingTabletsFromStorage = localStorage.getItem('shoppingTablets');
    const shoppingTabletsData = shoppingTabletsFromStorage
      ? shoppingTabletsFromStorage.split(',')
      : [];

    if (favouritesPhonesData) {
      setFavouritesPhones(favouritesPhonesData);
    }

    if (favouritesTabletsData) {
      setFavouritesTablets(favouritesTabletsData);
    }

    if (shoppingPhonesData) {
      setShoppingPhones(shoppingPhonesData);
    }

    if (shoppingTabletsData) {
      setShoppingTablets(shoppingTabletsData);
    }
  }, [])

  const contextValue = {
    favouritesPhones,
    favouritesTablets,
    shoppingPhones,
    shoppingTablets,
    changeFavouritesPhones,
    changeFavouritesTablets,
    changeShoppingPhones,
    changeShoppingTablets
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}
