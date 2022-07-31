import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import firebase from './firebase.js';

import HomePage from "./views/HomePage/HomePage";
import LandingPage from "./views/LandingPage/LandingPage";
import MapPage from "./views/MapPage/MapPage";
import Footer from "./views/Footer/Footer";
import WordPage from "./views/WordPage/WordPage";
import TrendPage from "./views/TrendPage/TrendPage";
import StudyPage from "./views/StudyPage/StudyPage";
import ChatPage from "./views/ChatPage/ChatPage";
import Header from "./views/Header/Header.js";
import ListPage from "./views/ListPage/ListPage.js";
import UploadPage from "./views/UploadPage/UploadPage.js";
import DetailPage from "./views/DetailPage/DetailPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import ChatPage_old from "./views/ChatPage/old_files/ChatPage_old.js";
import ChatList from "./views/ChatList/ChatList.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/homepage" component={HomePage} />
          <Route exact path="/mappage" component={MapPage} />
          <Route exact path="/word" component={WordPage} />
          <Route exact path="/trend" component={TrendPage} />
          <Route exact path="/study" component={StudyPage} />
          <Route exact path="/chat/:hostid" component={ChatPage} />
          <Route exact path="/oldchat" component={ChatPage_old} />
          <Route exact path="/chatlist" component={ChatList} />
          <Route exact path="/list" component={ListPage} />
          <Route exact path="/upload" component={UploadPage} />
          <Route exact path="/detail/:foodid" component={DetailPage} />
        </Routes>
        {window.location.pathname !== "/chatlist" && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;