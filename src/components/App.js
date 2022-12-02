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
import FoodMapPage from "../pages/FoodMapPage/FoodMapPage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route exact path="/mappage" element={<MapPage />} />
          <Route exact path="/word" element={<WordPage />} />
          <Route exact path="/trend" element={<TrendPage />} />
          <Route exact path="/study" element={<StudyPage />} />
          <Route exact path="/chat/:hostid" element={<ChatPage />} />
          <Route exact path="/oldchat" element={<ChatPage_old />} />
          <Route exact path="/chatlist" element={<ChatList />} />
          <Route exact path="/list" element={<ListPage />} />
          <Route exact path="/upload" element={<UploadPage />} />
          <Route exact path="/detail/:foodid" element={<DetailPage />} />
          <Route exact path="/foodmap" element={<FoodMapPage />} />
        </Routes>
        {window.location.pathname !== "/chatlist" && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
