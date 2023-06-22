import React, { useState,useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ChatPage from "./ChatPage.js";
// import SideDrawer from "./miscellaneous/SideDrawer";
// import { useHistory } from "react-router-dom";
// import ChatDisplay from "./miscellaneous/ChatDisplay";


function HomePage() {
  const [activeComponent, setActiveComponent] = useState("login");
  const toggleComponent = (props) => {
    setActiveComponent(props);
  };
  if(activeComponent==='login'){
    return <Login toggleComponent={toggleComponent}/>
  }else if(activeComponent==="signup"){
    return <Signup toggleComponent={toggleComponent}/>
  }else if(activeComponent==="chats"){
    return <ChatPage/>
  }
}

export default HomePage;
