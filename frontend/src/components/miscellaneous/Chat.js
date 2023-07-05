import React from 'react'
import "./drawer.css";

const Chat = ({User}) => {
    const {name,profilePic,chat}=User;
  return (
    <div>
        <div class="h-16 bg-gray-300 rounded-xl mb-3 flex items-center justify-evenly">
                <div className="dp w-1/6 px-2 py-2">
                    <img src={profilePic} className="w-12 h-12 object-cover" style={{borderRadius:24}}></img>
                </div>
                <div className="message flex-row items-center w-5/6 px-2 ">
                    <div className="sender">
                       <p>{name}</p>
                    </div>
                    <div className="senderMessage overflow-hidden" style={{textOverflow: ellipsis, whiteSpace: nowrap}}>
                         {chat}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Chat