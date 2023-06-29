import React from "react";
import "./drawer.css";
import Chat from "./Chat";
const ChatDisplay = ({chatName, recentMessage}) => {
  return (
    <div>
      {/* <div className="display w-96 mx-2 h-full bg-white rounded-2xl px-3 py-4"> */}
        {/* <div className="flex">
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
          </div> */}
        {/* </div> */}
        {/* <div className="flex border-4 border-gray-400 h-20">
          <div>
            {chatName}
          </div>
          <div>
            {recentMessage}
          </div>
        </div> */}
      </div>
    // </div>
  );
};

export default ChatDisplay;
