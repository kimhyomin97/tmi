import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import firebase from './firebase.js';


import HomePage from './views/HomePage/HomePage';
import Header from './views/Header/Header';
import LandingPage from './views/LandingPage/LandingPage';
import MapPage from './views/MapPage/MapPage';
import Footer from './views/Footer/Footer';
import WordPage from './views/WordPage/WordPage';
import TrendPage from './views/TrendPage/TrendPage';
import StudyPage from './views/StudyPage/StudyPage';
import ChatPage from './views/ChatPage/ChatPage';
import Header_test from './views/Header/Header_test.js';
import ListPage from './views/ListPage/ListPage.js';
import UploadPage from './views/UploadPage/UploadPage.js';
import DetailPage from './views/DetailPage/DetailPage.js';

function App() {
  // console.log(firebase);
  return (
    <>
    <BrowserRouter>
      {/* <Header /> */}
      <Header_test/>
      <Route exact path ="/" component={LandingPage} />
      <Route exact path ="/homepage" component = {HomePage} />
      <Route exact path ="/mappage" component = {MapPage} />
      <Route exact path ="/word" component = {WordPage} />
      <Route exact path ="/trend" component = {TrendPage} />
      <Route exact path ="/study" component = {StudyPage} />
      <Route exact path ="/chat" component = {ChatPage} />
      <Route exact path ="/list" component = {ListPage} />
      <Route exact path ="/upload" component = {UploadPage} />
      <Route exact path ="/detail/:foodid" component = {DetailPage} />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
