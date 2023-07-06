// import { ChatState } from "../../context/ChatProvider";
import React from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
const UserListItem = ({ user, authtoken, onClose, chatList, setChatList , setchatLoading, chatLoading }) => {
  const handleChatCreate = async (e) => {
        e.preventDefault();
        setchatLoading(false);
        const userid = user._id;
        const response = await fetch("http://localhost:3001/api/chat", {
            method: "POST",
            headers:{
                authorization: `Bearer ${authtoken}`,
                "content-type":"application/json",
            },
            body: JSON.stringify({
                "userId": userid,
            })
        });
      onClose();
    //   const func = ()=>{
    //       setTimeout(func = () => {
    //           toast.success(`Chat created with ${user.name}`);
    //           setChatList([response, ...chatList]);
    //           setchatLoading(true);
    //           console.log("hello");
    //           return;
    //       }, 3000);
    //   }
      
    };
    return (
        <>
        <ToastContainer></ToastContainer>
        <div onClick={handleChatCreate} className="flex items-center my-2 px-2 rounded-xl cursor-pointer box-border">
            <img className="rounded-3xl h-12" width='50rem' src={user.profilePic} alt="" />
            <div className="m-2">
                <div className="text-lg">{user.name}</div>
                <div className="text-xs">{user.email}</div>
            </div>
        </div>
      </>
    );
};

export default UserListItem;