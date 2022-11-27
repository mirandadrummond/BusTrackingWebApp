import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";import './index.css';
import App from './pages/App';
import Layout from './pages/Layout';
import About from './pages/About';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
);