import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import HomePage from './views/HomePage/HomePage';
import Header from './views/Header/Header';
import LandingPage from './views/LandingPage/LandingPage';
import MapPage from './views/MapPage/MapPage';
import Footer from './views/Footer/Footer';
import WordPage from './views/WordPage/WordPage';
import TrendPage from './views/TrendPage/TrendPage';
import StudyPage from './views/StudyPage/StudyPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Route exact path ="/" component={LandingPage} />
      <Route exact path ="/homepage" component = {HomePage} />
      <Route exact path ="/mappage" component = {MapPage} />
      <Route exact path ="/word" component = {WordPage} />
      <Route exact path ="/trend" component = {TrendPage} />
      <Route exact path ="/study" component = {StudyPage} />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
