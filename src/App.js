import React from 'react';
import Home from './component/Home';
import High from './component/High'
import Nav from './component/Nav';
import Low from './component/Low'
import Medium from './component/Meduim';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/high' element={<High />} />
        <Route path='/medium' element={<Medium />} />
        <Route path='/low' element={<Low />} />
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
