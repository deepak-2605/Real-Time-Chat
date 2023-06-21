import React, { useState,useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ChatPage from "./ChatPage.js";
import SideDrawer from "./miscellaneous/SideDrawer";
import { useHistory } from "react-router-dom";
import ChatDisplay from "./miscellaneous/ChatDisplay";
// import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [activeComponent, setActiveComponent] = useState("login");
  const toggleComponent = () => {
    setActiveComponent(activeComponent === "login" ? "signup" : "login");
  };
  // const history = useHistory();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));

  //   if (user) history.push("/chats");
  // }, [history]);
  
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));

  //   if (user) navigate("/chats");
  // }, []);
  const user2={
    "name":"Aditya2",
    "profilePic":"./images/profilePhoto.png",
    "chat":"Hello World"
  }
  return (
    <div>
      {/* {activeComponent === 'login' ? (
        <Login toggleComponent={toggleComponent}/>
      ) : (
        <Signup toggleComponent={toggleComponent}/>
      )} */}
      <SideDrawer />
      <ChatDisplay User={user2} />
    </div>
  );
}

export default HomePage;
