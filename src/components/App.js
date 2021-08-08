import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import HomePage from './views/HomePage/HomePage.js';
import Header from './views/Header/Header.js';
import LandingPage from './views/LandingPage/LandingPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Route exact path ="/" component={LandingPage} />
      <Route exact path ="/homepage" component = {HomePage} />
    </BrowserRouter>
    </>
  );
}

export default App;
