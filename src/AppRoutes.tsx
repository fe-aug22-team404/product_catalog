import { FC } from 'react'
import { App } from './APP/App';
import {
  HashRouter as Router, Route, Navigate, Routes
} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';
import { HomePage } from './components/HomePage';
import { Products } from './pages/Products/Products';
import { ItemCard } from './components/ItemCard';
import { Cart } from './pages/Cart';
import { Favourites } from './components/Favourites';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';

export const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="phones">
            <Route index element={
              <Products />
            } />
            <Route path=":openedPhoneId" element={<ItemCard />} />
          </Route>

          <Route path="/tablets" element={<Tablets />} />

          <Route path="/accessories" element={<Accessories />} />


          <Route path="favourites">
            <Route index element={
              <Favourites />
            } />
          </Route>

          <Route path="/cart" element={<Cart />} />

          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Route>
    </Routes>
  </Router>
  )
}
