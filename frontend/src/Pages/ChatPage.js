import { useLocation } from "react-router";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/miscellaneous/ChatBox";
import {
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import "../components/miscellaneous/loader.css";
import ProfileModal from "../components/miscellaneous/ProfileModal"
import { useNavigate } from "react-router";

import { useState, useEffect } from "react";
import GroupChatModal from "../components/miscellaneous/GroupChatModal";
const ChatPage = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatId, setChatId] = useState([]);
  const notiback="#cbba06";
  const { user, authtoken } = location.state || {};
  const userObject = {
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
    id: user._id
  };
  const [chatList, setchatList] = useState([]);
  const [chatmessages, setChatmessages] = useState([]);
  const [chatLoading, setchatLoading] = useState(false);
  const [group, setGroup] = useState(false);
  const [chatName, setchatName] = useState("");
  const [userList, setuserList] = useState();
  const [notification,setNotification] = useState();


  const handlenotification = (notifi) => {
    setNotification(notifi)
  }
  const logouthandler=()=>{
    localStorage.removeItem("token");
    navigate("/");
  }
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
      const response = await fetch("http://localhost:3001/api/chat", config);
      const chatlist = await response.json();
      const result = [];
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
    const chatid = e.currentTarget.id;
    await setChatId(chatid);
    const config = {
      headers: {
        authorization: `Bearer ${authtoken}`,
      },
    };
    const response = await fetch(
      `http://localhost:3001/api/message/${chatid}`,
      config
    );
    const allmessages = await response.json();
    setIsChatOpen(true);
    setGroup(allmessages[allmessages.length - 3]);
    setchatName(allmessages[allmessages.length - 2]);
    setuserList(allmessages[allmessages.length - 1]);
    allmessages.pop();
    allmessages.pop();
    allmessages.pop();
    allmessages.reverse();
    setChatmessages(allmessages);
    setchatLoading(true);
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
                      ></GroupChatModal>
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
                      <div className="w-1/6 px-2 py-2">
                        <img
                          src={chat.usersList[1]._id===user._id?chat.usersList[0].profilePic:chat.usersList[1].profilePic}
                          className="object-cover"
                          style={{ borderRadius: 24 }}
                        ></img>
                      </div>
                      <div className="flex-row items-center h-full w-5/6 px-2 font-['inter']">
                        <div className="p-1 h-1/2 font-Poppins font-bold">
                          {chat.usersList[1]._id===user._id?chat.usersList[0].name:chat.usersList[1].name}
                        </div>
                        <div className="p-1 h-1/2 font-['inter']">
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
                          src={chat.usersList[1].profilePic}
                          className="object-cover"
                          style={{ borderRadius: 24 }}
                        ></img>
                      </div>
                      <div className="flex-row items-center h-full w-5/6 px-2 font-['inter']">
                        <div className="p-1 h-1/2 font-Poppins font-bold">
                          {chat.chatName}
                        </div>
                        <div className="p-1 h-1/2 font-['inter']">
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
        </div>
        <div className="w-9/12 bg-white rounded-2xl mx-4 mt-2">
          {isChatOpen && (
            <ChatBox
              chatMessages={chatmessages}
              id={user._id}
              user={user}
              chatId={chatId}
              handlenotification={handlenotification}
              isGroupChat={group}
              chatName={chatName}
              userList={userList}
              authtoken={authtoken}
              onClose={() => setIsChatOpen(false)}
            />
          )}
          {!isChatOpen && (
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
        </div>
        <div>
          <div
            class="relative text-left bg-white  hover:bg-gray-300 w-620 flex items-center"
            style={{ borderRadius: 20 }}
          >
            <div className="px-2">
              <button className="hover:bg-gray-500 " style={{width:30,height:30,borderRadius:15}}>
                <i class="fa-solid fa-bell px-2" style={{ "color": { notiback } }}>
                  {/* <MenuList pl={2}>
                    {!notification && "No New Messages"}
                    {notification.map((notif) => (
                      <MenuItem
                        key={notif._id}
                      >
                        {notif.chat.isGroupChat
                          ? `New Message in ${notif.chat.chatName}`
                          : `New Message from ${notif.chat.usersList[0]._id===user._id?notif.chat.usersList[1].name:notif.chat.usersList[0].name}`}
                      </MenuItem>
                    ))}
                </MenuList> */}
                </i>
              </button>
            </div>
            <div className="dropdown">
              <div className="relative">
                <div>
                  <button
                    type="button"
                    className="px-4 py-2 text-black font-Poppins  focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    Options
                    <i class="fa-solid fa-caret-down px-3"></i>
                  </button>
                </div>
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded shadow-md">
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={openModal}
                    >
                      Open Profile
                    </button>
                    <ProfileModal User={user} isOpen={isModalOpen} onClose={closeModal} />
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={logouthandler}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
