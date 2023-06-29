import React, { useState} from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ChatPage from "./ChatPage.js";
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import SideDrawer from "./miscellaneous/SideDrawer";
// import ChatDisplay from "./miscellaneous/ChatDisplay";


function HomePage() {
  const [message, setmessage] = useState("Please Login into your account");
  const handleregister=(message)=> {
    setmessage(message);
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login message={message} />} />
      <Route path="/signup" element={<Signup handleregister={handleregister} />} />
      <Route path="/chat" element={<ChatPage/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default HomePage;
