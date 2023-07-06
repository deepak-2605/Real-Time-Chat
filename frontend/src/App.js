import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import React, { useState, useEffect } from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
// import backgroundImage from "../public/images/Chatting-Online-in-2022.jpg";

function App() {
  const getHeight = () => {
    return window.innerWidth <= 600 ? "900px" : "800px";
  };
  const [height, setHeight] = useState(getHeight());
  useEffect(() => {
    const handleResize = () => {
      setHeight(getHeight());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const appStyle = {
    // backgroundImage: `url('../public/images/Chatting-Online-in-2022.jpg')`,
    height: getHeight(),
  };
  return (
    <div className="App" style={appStyle}>
      <HomePage />
    </div>
  );
}

export default App;
