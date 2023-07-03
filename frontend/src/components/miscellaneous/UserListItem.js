// import { ChatState } from "../../context/ChatProvider";
import React from "react";
const UserListItem = ({ user , authtoken}) => {
    const handleChatCreate= async(e) => {
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
    }
    return (
        <div onClick={handleChatCreate} className="flex items-center my-2 px-2 rounded-xl cursor-pointer">
            <img className="rounded-xl" width='50px' src={user.profilePic} alt="" />
            <div className="m-2">
                <div className="text-lg">{user.name}</div>
                <div className="text-xs">{user.email}</div>
            </div>
        </div>

    );
};

export default UserListItem;