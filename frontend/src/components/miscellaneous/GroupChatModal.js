import React, { useState } from "react";
import UserListItem from "./UserListItem";
import GroupChatUserListItem from "./GroupChatUserListItem";
 import { ToastContainer, toast } from 'react-toastify';
export default function GroupChatModal({ authtoken, chatList, setchatList,chatId }) {
  const [GroupChatName, setGroupChatName] = useState();
  const [SelectedUsers, setSelectedUsers] = useState([]);
  const [isSelected, setIsselected] = useState(false);
  const [Search, setSearch] = useState("");
  const [SearchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(true);
  const [groupCreating,setGroupCreating]=useState(false);
  // console.log(chatList);
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      };
      const response = await fetch(
        `https://chat-app-jzgr.onrender.com/api/user?search=${query}`,
        config
      );
      const data = await response.json();
      // console.log(data);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error occured!");
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!GroupChatName || !SelectedUsers) {
      // Please fill all the fields
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setGroupCreating(true);
      const response = await fetch("https://real-time-chat-ymr8.onrender.com/api/chat/group", {
        method: "POST",
        headers: {
          authorization: `Bearer ${authtoken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: GroupChatName,
          users: JSON.stringify(SelectedUsers.map((u) => u._id)),
        }),
      });
      const data = await response.json();
      console.log(data);
      setchatList([data, ...chatList]);
      toast.success("Group Created Successfully");
      setGroupCreating(false);
      // console.log("a",chatList);
    } catch (error) {
      toast.error("Error occured");
      console.log("Error occured");
    }
  };

  const handleRemove = (object) => {
    setSelectedUsers((SelectedUsers) =>
      SelectedUsers.filter((obj) => obj !== object)
  
    );
  };

  return (
    <>
    <ToastContainer></ToastContainer>
    <div className="relative -left-40 bg-gray-100 text-center p-2 rounded-xl ">
      <p>Create Group Chat</p>
      <form onSubmit={handleSubmit}>
        <div className="p-1">
          <label>
            Chat Name:
            <input
              type="text"
              // value={chatName}
              placeholder="Chat Name"
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </label>
        </div>
        <div className="p-1">
          <label>
            Chat Users:
            <input
              type="text"
              // value={chatUsers}
              placeholder="Search Users"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="selectedTags">
          {SelectedUsers.length > 0 && (
            <div className="bg-gray-100 mt-4 p-2">
              {SelectedUsers.map((object, index) => (
                <div key={index} className="flex justify-between items-center bg-white" style={{height:20,borderRadius:10, padding:3,margin:3}}>
                  <span>{object.name}</span>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleRemove(object)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Selected Users */}
        {/* Refer line 43 create display for them and also to delete from here */}
        {/* Render Searched Users */}
        {!loading &&
          SearchResult?.slice(0, 6).map((user) => (
            <GroupChatUserListItem
              key={user._id}
              user={user}
              authtoken={authtoken}
              isSelected={isSelected}
              setIsselected={setIsselected}
              SelectedUsers={SelectedUsers}
              setSelectedUsers={setSelectedUsers}
              chatId={chatId}
            />
          ))}
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          {groupCreating && (
            "Creating..."
          )}
          {!groupCreating && (
            "Submit"
          )}
        </button>
      </form>
    </div>
    </>
  );
}
