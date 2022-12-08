import React, { useState, useEffect } from "react";
import './HomePage.scss';

import { getAllTablets, getAllAccessories } from "../../api/api";
import { getAllPhones } from "../../api/phoneDescription";

import { ProductsSlider } from "../ProductsSlider";
import { Carusel } from "../Carusel";
import { Categories } from "../Categories";

export const HomePage: React.FC = () => {
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);
  const tablets = async () => getAllTablets();
  const accessories = async () => getAllAccessories();

  const loadPhones = async () => {
    await getAllPhones().then(res => {
      setPhonesCount(res.length)
    })
  }

  useEffect(() => {
    loadPhones()
  }, [])

  return (
    <div className="homepage grid grid-mobile grid-tablet grid-desktop">
      <h1 className="homepage__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-17">
        Welcome to Nice Gadgets store!
      </h1>

      <ProductsSlider />

      <Carusel
        orderType="year"
        title="Brand new models"
        path='home'
      />

      <Categories
        phonesCount={phonesCount}
        tabletCount={tabletsCount}
        accessoriesCount={accessoriesCount}
       />

      <Carusel
        orderType="price"
        title="Hot prices"
        path='home'
      />
    </div>
  )
}
