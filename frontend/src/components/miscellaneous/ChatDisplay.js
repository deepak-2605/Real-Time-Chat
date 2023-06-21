import React from "react";
import "./drawer.css";
import Chat from "./Chat";
const ChatDisplay = ({User}) => {
  const {name,profilePic,chat}=User;
  return (
    <div>
      <div className="display w-96 mx-2 h-full bg-white rounded-2xl px-3 py-4">
        <div className="flex">
          <div className="h-12 pr-40">
            <h1>My Chats</h1>
          </div>
          <div>
            <button
              className="flex items-centre justify-center hover:bg-gray-300"
              style={{ borderRadius: 15, height: 30, padding: 4 }}
            >
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
          <div>
            <Chat User={User}/>
            <Chat User={User}/>
            <Chat User={User}/>
            <Chat User={User}/>
            <Chat User={User}/>
            <Chat User={User}/>
            <Chat User={User}/>
            <Chat User={User}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDisplay;
