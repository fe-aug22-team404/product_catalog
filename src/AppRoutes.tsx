import { FC } from 'react'
import { App } from './APP/App';
import {
  HashRouter as Router, Route, Navigate, Routes
} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';
import { Products } from './pages/Products/Products';
import { ItemCard } from './pages/ItemCard';
import { Cart } from './pages/Cart';
import { Favourites } from './pages/Favourites';
import { Accessories } from './pages/Accessories';
import { HomePage } from './pages/HomePage';
import { DescriptionNotFound } from './components/DescriptionNotFound';
import { Contributors } from './pages/Contributors';

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
              <Products category='phones' title='Mobile phones' />
            } />
            <Route path=":openedPhoneId" element={<ItemCard />} />
          </Route>

          <Route path="tablets">
            <Route index element={
              <Products category='tablets' title='Tablets' />
            } />
            <Route path=":openedTabletId" element={<DescriptionNotFound />} />
          </Route>

          <Route path="/accessories" element={<Accessories />} />


          <Route path="favourites">
            <Route index element={
              <Favourites />
            } />
          </Route>

          <Route path="/cart" element={<Cart />} />

          <Route path="/contributors" element={<Contributors />} />

          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Route>
    </Routes>
  </Router>
  )
}
