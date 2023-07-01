import { useLocation } from "react-router";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/miscellaneous/ChatBox";
import "../components/miscellaneous/loader.css"
import ChatDisplay from "../components/miscellaneous/ChatDisplay";
// import "../components/miscellaneous/profilePhoto.js"
import { useState, useEffect } from "react";
import GroupChatModal from "../components/miscellaneous/GroupChatModal";
const ChatPage = () => {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, authtoken } = location.state || {};
  //console.log(user);
  const userObject = {
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
  };
  // Accessing all chats of the user
  const [chatList, setchatList] = useState([]);
  const [chatmessages, setChatmessages] = useState([]);
  const [chatLoading, setchatLoading] = useState(false);

  useEffect(() => {
    const getchatlist = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${authtoken}`,
        },
      };
      const response = await fetch("http://localhost:3001/api/chat", config);
      const chatlist = await response.json();
      const result = [];
      console.log(chatlist);
      chatlist.forEach((element) => {
        result.push(element);
      });
      if (result.length !== chatList.length) {
        setchatList(result);
      } else {
        setchatLoading(true);
      }
      return;
    };
    getchatlist();
    return () => {
      return;
    };
  }, [chatList]);
  // This is for opening particular chat
  const openChat = async (e) => {
    e.preventDefault();
    const chatId = e.currentTarget.id;
    const config = {
      headers: {
        authorization: `Bearer ${authtoken}`,
      },
    };
    const response = await fetch(
      `http://localhost:3001/api/message/${chatId}`,
      config
    );
    const allmessages = await response.json();
    setIsChatOpen(true);
    allmessages.reverse();
    setChatmessages(allmessages);
    console.log(allmessages);
  };
  // Group Chat Functionality
  const [GroupModal, setGroupModal] = useState(false);
  const handleClickNewGroup = () => {
    setGroupModal(!GroupModal);
  };
  return (
    <div style={{ height: 700 }}>
      <SideDrawer
        User={userObject}
        authtoken={authtoken}
        chatList={chatList}
        setchatList={setchatList}
      ></SideDrawer>
      <div className="flex">
        <div className="display w-3/12 mx-2 h-full bg-green-600 rounded-2xl px-3 py-4 mt-2">
          <div className="flex mb-2 " style={{ alignItems: "center" }}>
            <div className="pr-32">
              <h1 className="text-white font-['inter']">My Chats</h1>
            </div>
            <div>
              {/* Group chat Modal starts */}
              <div>
                <div className="px-2 font-['inter']">
                  <div className="text-white" onClick={handleClickNewGroup}><button
                    className="flex items-centre justify-evenly hover:bg-gray-300"
                    style={{ borderRadius: 15, height: 30, padding: 4 }}
                  >New Group <i class="fa-solid p-1 fa-plus"></i>
                  </button>
                  </div>
                  <div className="absolute">
                    {GroupModal && (
                      <GroupChatModal authtoken={authtoken} chatList={chatList}
                        setchatList={setchatList}></GroupChatModal>
                    )}
                  </div>
                </div>
              </div>
              {/* Group Chat Modal ends */}
            </div>
          </div>
          <div
            className="flex-col p-2"
            style={{ height: 600, overflow: "auto" }}
          >
            {chatLoading &&
              chatList?.map((chat) => (
                <div
                  id={chat._id}
                  onClick={openChat}
                  className="h-16 bg-white rounded-xl mb-3 flex items-center justify-evenly"
                >
                  {
                    console.log(chat)
                  }
                  <div className="w-1/6 px-2 py-2">
                    <img src={chat.usersList[1].profilePic} className="object-cover" style={{ borderRadius: 24 }}></img>
                  </div>
                  <div className="flex-row items-center h-full w-5/6 px-2 font-['inter']">
                    <div className="p-1 h-1/2 font-Poppins font-bold">
                      {chat.usersList[1].name}
                    </div>
                    <div className="p-1 h-1/2 font-['inter']">
                      {chat.recentMessage &&
                        chat.recentMessage.length > 0 &&
                        chat.recentMessage[0].content}
                    </div>
                  </div>
                </div>
              ))}
            {!chatLoading && (
              <div className="h-full flex file justify-center" style={{ alignItems: "center" }}>
                <div class="flex items-center justify-center">
                  <div class="dot animate-dot1"></div>
                  <div class="dot animate-dot2"></div>
                  <div class="dot animate-dot3"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-9/12 bg-white rounded-2xl mx-4 mt-2">
          {isChatOpen && (
            <ChatBox
              chatMessages={chatmessages}
              id={user._id}
              onClose={() => setIsChatOpen(false)}
            />
          )}
          {!isChatOpen && <div className="h-full" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
            <div className="font-['inter']">Start a Conversation<i class="fa-solid fa-messages"></i></div>
          </div>}
        </div>
      </div>

    </div>

  );
};

export default ChatPage;
