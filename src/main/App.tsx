import React from 'react';
import { Header } from '../components/Header/Header';
import { ItemCard } from '../components/ItemCard';
import { Path } from '../components/Path';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Path />
      <ItemCard />
    </div>
  );
}
