import React from "react";
import classNames from "classnames";

const ChatBox = ({chatMessages,id}) => {
  return (
    <div className="mx-3 h-full">
      <div className="h-full">
        <div className="flex flex-col justify-end w-full h-full p-4">
          {/* Chat Messages */}
          <div className="flex flex-col-reverse w-full h-5/6">
            {chatMessages?.map((message) => (
                console.log(id,message.sender._id),
              <div
                key={message._id}
                className={classNames("p-2 rounded-lg mb-2", {
                  "bg-gray-200 self-end": message.sender._id === id,
                  "bg-blue-200 self-start": message.sender._id !== id,
                })}
              >
                <span className="font-bold font-['inter']">{message.sender.name}:</span>{" "}
                {message.content}
                <span className="text-xs text-gray-500 ml-1">
                  {/* {message.timestamp} */}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-1/6">
            <div className="bg-gray-200 p-4 w-full">
              {/* Message Box */}
              <form className="flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-white border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r-lg px-4 py-2 ml-2"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
