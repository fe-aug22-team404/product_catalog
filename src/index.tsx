import ReactDOM from 'react-dom/client';
import { AppRoutes } from './AppRoutes';
import './style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppRoutes />
);
