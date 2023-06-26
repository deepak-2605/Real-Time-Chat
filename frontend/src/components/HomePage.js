import React, { useState,useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ChatPage from "./ChatPage.js";
import {BrowserRouter, Routes,Route } from "react-router-dom";
// import SideDrawer from "./miscellaneous/SideDrawer";
// import { useHistory } from "react-router-dom";
// import ChatDisplay from "./miscellaneous/ChatDisplay";


function HomePage() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/chat" element={<ChatPage/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default HomePage;
