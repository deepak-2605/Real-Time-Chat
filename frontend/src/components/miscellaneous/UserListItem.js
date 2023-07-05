// import { ChatState } from "../../context/ChatProvider";
import React from "react";
import { useNavigate } from "react-router";
 import { ToastContainer, toast } from 'react-toastify';
const UserListItem = ({ user , authtoken,chatList,setchatList,setchatLoading,chatLoading}) => {
    const handleChatCreate= async(e) => {
        setchatLoading(false);
        e.preventDefault();
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
        toast.success(`Chat created with ${user.name}`);
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
        setchatLoading(true);
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
    }
    return (
        <>
        <ToastContainer></ToastContainer>
        <div onClick={handleChatCreate} className="flex items-center my-2 px-2 rounded-xl cursor-pointer">
            <img className="rounded-xl" width='50px' src={user.profilePic} alt="" />
            <div className="m-2">
                <div className="text-lg">{user.name}</div>
                <div className="text-xs">{user.email}</div>
            </div>
        </div>
      </>
    );
};

export default UserListItem;