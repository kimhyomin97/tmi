import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import firebase from './firebase.js';

import HomePage from "./components/views/HomePage/HomePage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import MapPage from "./components/views/MapPage/MapPage";
import Footer from "./components/views/Footer/Footer";
import WordPage from "./components/views/WordPage/WordPage";
import TrendPage from "./components/views/TrendPage/TrendPage";
import StudyPage from "./components/views/StudyPage/StudyPage";
import ChatPage from "./components/views/ChatPage/ChatPage";
import Header from "./components/views/Header/Header.js";
import ListPage from "./components/views/ListPage/ListPage.js";
import UploadPage from "./components/views/UploadPage/UploadPage.js";
import DetailPage from "./components/views/DetailPage/DetailPage.js";
import LoginPage from "./components/views/LoginPage/LoginPage.js";
import ChatPage_old from "./components/views/ChatPage/old_files/ChatPage_old.js";
import ChatList from "./components/views/ChatList/ChatList.js";
import FoodMapPage from "./pages/FoodMapPage/FoodMapPage.tsx";
import ComponentPage from "./pages/ComponentPage/ComponentPage.tsx";

import TestStore from "./store/Context.js";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <TestStore>
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
              <Route exact path="/component" element={<ComponentPage />} />
            </Routes>
            {window.location.pathname !== "/chatlist" && <Footer />}
          </BrowserRouter>
        </TestStore>
      </Provider>
    </>
  );
}

export default App;
