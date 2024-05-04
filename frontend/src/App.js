import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/home';
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};




function App() {
  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
        <ScrollToTop/>
      </BrowserRouter>
    </>
  );
}

export default App;
