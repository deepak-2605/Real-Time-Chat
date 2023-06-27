import {useLocation } from "react-router";
import Chatbox from "../components/miscellaneous/ChatBox";
import MyChats from "../components/miscellaneous/Chat";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  // const [fetchAgain, setFetchAgain] = useState(false);
  //  const token=localStorage.getItem('token');
    const location = useLocation();
  const { user,authtoken} = location.state || {};
   const userObject = {
    name: user.name,
    email: user.email,
    profilePic: user.profilePic
  };
  // console.log(userObject);
  // console.log(authtoken);
  return (
    <>
    <SideDrawer User={userObject}></SideDrawer>
    </>
  );
};

export default ChatPage;

