import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage"
import './App.css';
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";


function App(){
  return (
    <div className="App">
          <HomePage/>
    </div>
  )
}

export default App;
