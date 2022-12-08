import React, { useState, useEffect } from "react";
import './HomePage.scss';
import { getPhonesQuantity, getTabletQuantity } from "../../api/api";
import { Carusel } from "../../components/Carusel";
import { ProductsSlider } from "./ProductsSlider";
import { Categories } from "./Categories";

export const HomePage: React.FC = () => {
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);

  const loadDeviceQuantity = async () => {
    try {
      const phonesQuantity = await getPhonesQuantity('phones');
      const tabletsQuantity = await getTabletQuantity('tablets');

      setPhonesCount(phonesQuantity);
      setTabletsCount(tabletsQuantity)
    } catch(error) {
      throw new Error();
    }
  }

  useEffect(() => {
    loadDeviceQuantity();
  }, []);

  return (
    <div className="homepage grid grid-mobile grid-tablet grid-desktop">
      <h1 className="homepage__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-17">
        Welcome to Nice Gadgets store!
      </h1>

      <div className="homepage__slider grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
        <ProductsSlider />
      </div>

      <div className="homepage__carusel grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
        <Carusel
          orderType="year"
          title="Brand new models"
          path='home'
        />
      </div>

      <div className="homepage__categories grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
        <Categories
          phonesCount={phonesCount}
          tabletCount={tabletsCount}
          accessoriesCount={accessoriesCount}
        />
      </div>

      <div className="homepage__carusel grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
        <Carusel
          orderType="price"
          title="Hot prices"
          path='home'
        />
      </div>
    </div>
  )
}
