import {useLocation } from "react-router";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { useState,useEffect } from "react";
const ChatPage = () => {
  const location = useLocation();
    const { user,authtoken} = location.state || {};
    const userObject = {
      name: user.name,
      email: user.email,
      profilePic: user.profilePic
    };
    // Accessing all chats of the user
    const [chatList, setchatList] = useState([]);
    const [chatLoading, setchatLoading] = useState(false);
      useEffect(() => {
    const getchatlist = async () => {
      const config = {
          headers:{
              authorization: `Bearer ${authtoken}`,
          },
      }
      const response = await fetch("http://localhost:3001/api/chat", config);
      const chatlist = await response.json();
      const result = [];
      console.log(chatlist);
      chatlist.forEach(element => {
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
  },[chatList]);
  // This is for opening particular chat
     const openChat = async (e) => {
    e.preventDefault();
    const chatId = e.currentTarget.id;
    const config = {
        headers:{
            authorization: `Bearer ${authtoken}`,
        },
    }
    const response = await fetch(`http://localhost:3001/api/message/${chatId}`, config);
    const allmessages = await response.json();
    console.log(allmessages);
  }
  return (
    <>
    <SideDrawer User={userObject} authtoken={authtoken} chatList={chatList} setchatList={setchatList
    }></SideDrawer>
     <div className="border-blue-900 border-4 w-7/12">
          <div className="flex">
            <div className="h-12 pr-40">
              <h1>My Chats</h1>
            </div>
            <div>
              <button
                className="flex items-centre justify-center hover:bg-gray-300"
                style={{ borderRadius: 15, height: 30, padding: 4 }}>
                <div className="px-2">
                  <p>New Group</p>
                </div>
                <div>
                  <i class="fa-solid fa-plus"></i>
                </div>
              </button>
            </div> 
          </div>
          <div>
            {chatLoading && chatList?.map((chat) => (
              <div id={ chat._id} onClick={openChat} className="flex-row border-4 border-gray-400 h-20">
                <div className="block my-3">
                    {chat.usersList[1].name}
                </div>
            <div>
        {chat.recentMessage &&
          chat.recentMessage.length > 0 &&
          chat.recentMessage[0].content}
      </div>
              </div>
            ))
            }
          </div>
        </div>
    </>
  );
};

export default ChatPage;

