import { useState } from "react";
import Chatbox from "../components/miscellaneous/ChatBox";
import MyChats from "../components/miscellaneous/Chat";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const ChatPage = () => {
  // const [fetchAgain, setFetchAgain] = useState(false);
  // const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />}
      <div d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div> */}
          Aditya here
    </div>
  );
};

export default ChatPage;

