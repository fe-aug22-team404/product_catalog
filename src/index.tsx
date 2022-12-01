import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import { App } from './main/App';
import {
  HashRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Routes>
    <Route path="/" element={<App />}>
        <Route
          index
          element={<App />}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="*"
          element={<PageNotFound />}
        />
        {/* <Route path="tabs">
          <Route index element={<TabsPage />} />
          <Route path=":tabId" element={<TabsPage />} />
        </Route> */}
      </Route>
    </Routes>
    {/* <App /> */}
  </Router>
);

