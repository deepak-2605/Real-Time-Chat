import React from 'react'
import { useState } from 'react';
export default function GroupChatUserListItem({user,authtoken,isSelected,setIsselected,SelectedUsers,setSelectedUsers,chatId}) {
     const handleGroup=(UserToBeAdded)=>{
         setIsselected(true)
         if(SelectedUsers.includes(UserToBeAdded)){
            // console.log("User Already Present");
         }else{
            setSelectedUsers([...SelectedUsers,UserToBeAdded]);
         }
   }
  return (
    <div>
         <div onClick={() => handleGroup(user)} className="flex items-center my-2 px-2 rounded-xl bg-white cursor-pointer">
            <img className="rounded-xl" width='50px' src={user.profilePic} alt="" />
            <div className="m-2">
                <div className="text-lg">{user.name}</div>
                <div className="text-xs">{user.email}</div>
            </div>
        </div>
    </div>
  )
}
