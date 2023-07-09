import { useLocation } from "react-router";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/miscellaneous/ChatBox";
import { MenuList, MenuItem } from "@material-tailwind/react";
import "../components/miscellaneous/loader.css";
import Loader from "../components/miscellaneous/Loader.js"
import "../components/miscellaneous/loader.css"
import ProfileModal from "../components/miscellaneous/ProfileModal";
import { useNavigate } from "react-router";

import { useState, useEffect } from "react";
import GroupChatModal from "../components/miscellaneous/GroupChatModal";
const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatId, setChatId] = useState([]);
  const notiback = "#cbba06";
  const { user, authtoken } = location.state || {};
  const userObject = {
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
    id: user._id,
    about: user.about,
  };
  const [chatList, setchatList] = useState([]);
  const [chatmessages, setChatmessages] = useState([]);
  const [chatLoading, setchatLoading] = useState(false);
  const [group, setGroup] = useState(false);
  const [chatName, setchatName] = useState("");
  const [userList, setuserList] = useState();
  const [notification, setNotification] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      const fetchedData = 'Loaded Data';
      setIsLoading(false);
    }, 2000);
  };

  const handlenotification = (notifi) => {
    setNotification(notifi);
  };
  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  useEffect(() => {
    const getchatlist = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${authtoken}`,
        },
      };
      const response = await fetch("https://real-time-chat-ymr8.onrender.com/api/chat", config);
      const chatlist = await response.json();
      const result = [];
      chatlist.forEach((element) => {
        result.push(element);
      });
      if (result && result.length !== chatList.length) {
        setchatList(result);
      } else {
        setchatLoading(true);
      }
      return;
    };
    getchatlist();
  });
  // This is for opening particular chat
  const openChat = async (e) => {
    e.preventDefault();
    setIsChatOpen(false);
    const chatid = e.currentTarget.id;
    setIsLoading(true)
    await setChatId(chatid);
    const config = {
      headers: {
        authorization: `Bearer ${authtoken}`,
      },
    };
    const response = await fetch(
      `https://real-time-chat-ymr8.onrender.com/api/message/${chatid}`,
      config
    );
    const allmessages = await response.json();
    setIsLoading(false);
    setGroup(allmessages[allmessages.length - 3]);
    setchatName(allmessages[allmessages.length - 2]);
    setuserList(allmessages[allmessages.length - 1]);
    allmessages.pop();
    allmessages.pop();
    allmessages.pop();
    allmessages.reverse();
    setChatmessages(allmessages);
    setchatLoading(true);
    setIsChatOpen(true);
  };
  // Group Chat Functionality
  const [GroupModal, setGroupModal] = useState(false);
  const handleClickNewGroup = () => {
    setGroupModal(!GroupModal);
  };
  // const modstyle={
  //   height:height
  // }
  return (
    <div style={{ height: 700 }}>
      <SideDrawer
        User={userObject}
        authtoken={authtoken}
        chatList={chatList}
        setchatList={setchatList}
        setchatLoading={setchatLoading}
        chatLoading={chatLoading}
      ></SideDrawer>
      <div className="flex flex-col md:flex-row w-full">
        {(!isChatOpen || window.innerWidth >= 768) && (<div className="display w-full mr-2 sm:w-full md:w-1/3 mx-2 h-full bg-green-600 rounded-2xl px-3 py-4 mt-2">
          <div
            className="flex flex-col md:flex-row  mb-2"
            style={{ alignItems: "center", justifyContent: "space-around" }}
          >
            <div className="">
              <h1 className="text-white font-['inter']">My Chats</h1>
            </div>
            <div>
              <div>
                <div className="px-2 font-['inter']">
                  <div className="text-white" onClick={handleClickNewGroup}>
                    <button
                      className="flex items-centre justify-evenly hover:bg-gray-300"
                      style={{ borderRadius: 15, height: 30, padding: 4 }}
                    >
                      New Group <i class="fa-solid p-1 fa-plus"></i>
                    </button>
                  </div>
                  <div className="absolute">
                    {GroupModal && (
                      <GroupChatModal
                        authtoken={authtoken}
                        chatList={chatList}
                        setchatList={setchatList}
                        chatId={chatId}
                      ></GroupChatModal>
                    )}
                  </div>
                </div>
              </div>
              {/* Group Chat Modal ends */}
            </div>
          </div>
          <div
            className="flex-col p-2 "
            style={{ height: 600, overflow: "auto" }}
          >
            {chatLoading &&
              chatList?.map((chat) => (
                <div>
                  {!chat.isGroupChat && (
                    <div
                      id={chat._id}
                      isGroup={false}
                      onClick={openChat}
                      className="h-16 bg-white rounded-xl mb-3 flex items-center justify-evenly"
                    >
                      {/* {console.log("chat", chat)} */}
                      {/* {chat.userList[0]._id === userObject.id ? setchatName(chat.userList[1].name) : setchatName(chat.userList[0].name)} */}
                      <div className=" w-1/6 px-2 py-2">
                        <img
                          src={
                            (chat.usersList)[1]._id === user._id
                              ? (chat.usersList)[0].profilePic
                              : (chat.usersList)[1].profilePic
                          }
                          width="50rem"
                          className="object-cover h-12"
                          style={{ borderRadius: 24 }}
                        ></img>
                      </div>
                      <div className="flex-row items-center h-full w-5/6 px-2 font-['inter']">
                        <div className="p-1 h-1/2 font-Poppins font-bold">
                          {(chat.usersList[1])._id === user._id
                            ? (chat.usersList[0]).name
                            : (chat.usersList[1]).name}
                        </div>
                        <div className="p-1 h-1/2 font-['inter']" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {chat.recentMessage &&
                            chat.recentMessage.length > 0 &&
                            chat.recentMessage[0].content}
                        </div>
                      </div>
                    </div>
                  )}
                  {chat.isGroupChat && (
                    <div
                      id={chat._id}
                      isGroup={true}
                      onClick={openChat}
                      className="h-16 bg-white rounded-xl mb-3 flex items-center justify-evenly"
                    >
                      {/* {console.log("chat", chat)} */}
                      <div className="w-1/6 px-2 py-2">
                        <img
                          // src={chat.usersList[1].profilePic}
                          className="object-cover"
                          style={{ borderRadius: 24 }}
                        ></img>
                      </div>
                      <div className="flex-row items-center h-full w-5/6 px-2 font-['inter']">
                        <div className="p-1 h-1/2 font-Poppins font-bold">
                          {chat.chatName}
                        </div>
                        <div className="p-1 h-1/2 font-['inter']" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {chat.recentMessage &&
                            chat.recentMessage.length > 0 &&
                            chat.recentMessage[0].content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            {!chatLoading && (
              <div
                className="h-full flex file justify-center"
                style={{ alignItems: "center" }}
              >
                <div class="flex items-center justify-center">
                  <div class="dot animate-dot1"></div>
                  <div class="dot animate-dot2"></div>
                  <div class="dot animate-dot3"></div>
                </div>
              </div>
            )}
          </div>
        </div>)}
        <div className="w-10/12 sm:w-9/12 bg-white rounded-2xl mx-4 mt-2">
          {isChatOpen && (
            <ChatBox
              chatMessages={chatmessages}
              chatList={chatList}
              id={user._id}
              user={user}
              chatId={chatId}
              handlenotification={handlenotification}
              isGroupChat={group}
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              chatName={chatName}
              userList={userList}
              authtoken={authtoken}
              onClose={() => setIsChatOpen(false)}
            />
          )}
          {(!isChatOpen && !isLoading && window.innerWidth >= 768) && (
            <div
              className="h-full"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              <div className="font-['inter']">
                Start a Conversation<i class="fa-solid fa-messages"></i>
              </div>
            </div>
          )}
          {(!isChatOpen && isLoading && window.innerWidth>768) && (
            <div className="h-full flex items-center justify-center" >
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default ChatPage;
