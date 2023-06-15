import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function HomePage() {
  var login='Login'
  return (
    <div>
        { (login=== 'Login') ? <Signup loginValue={login} /> : <Signup loginValue={login}/>}
    </div>
  )
}

export default HomePage