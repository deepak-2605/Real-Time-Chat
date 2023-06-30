import React, { useState } from 'react'
import UserListItem from './UserListItem';
import GroupChatUserListItem from './GroupChatUserListItem';
export default function GroupChatModal({authtoken,chatList,setChatList}) {
    const [GroupChatName,setGroupChatName]=useState();
    const [SelectedUsers,setSelectedUsers]=useState([]);
    const [Search,setSearch]=useState("");
    const [SearchResult,setSearchResult]=useState();
    const [loading,setLoading]=useState(true);
    // console.log(chatList);
    const handleSearch=async (query)=>{
      setSearch(query);
      if(!query){
        return;
      }

      try{
          setLoading(true);
           const config = {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      }
    };
    const response = await fetch(
      `http://localhost:3001/api/user?search=${query}`,
      config
    );
    const data = await response.json();
    // console.log(data);
    setSearchResult(data);
    setLoading(false);
      } catch(error){
        console.log("Error occured");
        setLoading(false);
      }
   }
//    console.log(SelectedUsers);

//    Creating function for handling request to create group chat

  const handleSubmit=async (e)=>{
    e.preventDefault();
      if(!GroupChatName||!SelectedUsers){
        // Please fill all the fields
        return;
      }

   try{
       const response = await fetch("http://localhost:3001/api/chat/group", {
            method: "POST",
            headers:{
                authorization: `Bearer ${authtoken}`,
                "content-type":"application/json",
            },
            body: JSON.stringify({
               name:GroupChatName,
               users:JSON.stringify(SelectedUsers.map((u)=>u._id)),
            })
        });
     const data=await response.json();
     console.log(data);
     setChatList([data,...chatList]);
   }catch(error){
    console.log("Error occured");
   }
  }
  return (
    <div>
      <p>Create Group Chat</p>
       <form onSubmit={handleSubmit}>
      <div>
        <label>
          Chat Name:
          <input
            type="text"
            // value={chatName}
            placeholder='Chat Name'
            onChange={(e)=>setGroupChatName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Chat Users:
          <input
            type="text"
            // value={chatUsers}
            placeholder='Search Users'
            onChange={(e)=>(handleSearch(e.target.value))}
          />
        </label>
      </div>
      {/* Selected Users */}
      {/* Refer line 43 create display for them and also to delete from here */}
      {/* Render Searched Users */}
       {!loading &&
              SearchResult?.slice(0,6).map((user) => (
                <GroupChatUserListItem
                  key={user._id}
                  user={user}
                  authtoken={authtoken}
                  SelectedUsers={SelectedUsers}
                  setSelectedUsers={setSelectedUsers}
                />
              ))}
      <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
    </form>
    </div>
  )
}
