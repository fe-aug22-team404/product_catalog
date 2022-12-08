import ReactDOM from 'react-dom/client';
import './style.scss';
import { AppRoutes } from './AppRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppRoutes />
);
