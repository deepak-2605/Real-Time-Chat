import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage"
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
