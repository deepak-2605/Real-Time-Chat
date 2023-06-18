import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function HomePage() {
  const [activeComponent,setActiveComponent]=useState('login');
  const toggleComponent=()=>{
    setActiveComponent(activeComponent==='login'?'signup':'login');
  }
  return (
      <div>
      {activeComponent === 'login' ? (
        <Login toggleComponent={toggleComponent}/>
      ) : (
        <Signup toggleComponent={toggleComponent}/>
      )}
    </div>
  )
}

export default HomePage