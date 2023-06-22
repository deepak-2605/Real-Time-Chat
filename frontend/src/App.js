import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage"
import './App.css';
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";


function AppRoutes() {
  const routes = useRoutes(
    [
      {path:'/',element:<HomePage/>},
      {path:'/chats',element:<ChatPage/>}
    ]
  )
  return routes;
}
function App(){
  return (
    <div className="App">
          <Router>
          <AppRoutes />
          </Router>
    </div>
  )
}

export default App;
