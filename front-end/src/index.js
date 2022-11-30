import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/Style.css';
import App from './pages/App';
import Layout from './pages/Layout';
import About from './pages/About';
import StopStatus from './pages/StopStatus';
import BusStatus from './pages/BusStatus';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="stop_status" element={<StopStatus />} />
          <Route path="bus_status" element={<BusStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
);