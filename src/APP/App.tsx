import { FC } from 'react';
import { Outlet } from 'react-router';
import { AppProvider } from '../components/AppProvider';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header/Header';

export const App: FC = () => {
  return (
    <AppProvider>
      <Header />

      {/* <Outlet />
      
      <Footer /> */}
    </AppProvider>
    );
}
