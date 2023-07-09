import React from "react";
import "./drawer.css";
import { useState } from "react";
import UserListItem from "./UserListItem";
 import { ToastContainer, toast } from 'react-toastify';
const Drawer = ({ isOpen, onClose, searchLoader, authtoken,chatList,setChatList,setchatLoading,chatLoading }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  if (!isOpen) {
    return null;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!searchValue) {
      toast.error("Enter something");
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    };
    const response = await fetch(
      `https://real-time-chat-ymr8.onrender.com/api/user?search=${searchValue}`,
      config
    );
    const data = await response.json();
    setSearchResult(data);
    setLoading(false);
  };

  return (
    <>
    <ToastContainer></ToastContainer>
    <div
      className="fixed left-0 top-0 h-full bg-gray-600 text-white w-11/12 sm:w-96 p-4 "
      style={{ borderRadius: 10,position:'absolute', zIndex:10 }}
    >
      <div>
        <button onClick={onClose}>
          <i class="fa-solid fa-caret-left"></i>
        </button>
      </div>
      <h5 className="text-2xl font-bold mb-4">
        Search for friends, family contacts...
      </h5>
      <div>
        <div class="flex items-center mb-6">
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter Username or Email"
              width="70%"
            />
          </div>
          <div className="px-2">
            <button
              class="shadow bg-blue-500 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSearch}
            >
              Go
            </button>
          </div>
        </div>
        <div>
          <div id="animate-pulse" class="animate-pulse">
            {loading && (
              <div>
                <div class="h-12 bg-gray-300 rounded-xl mb-4"></div>
                <div class="h-12 bg-gray-300 rounded-xl mb-4"></div>
                <div class="h-12 bg-gray-300 rounded-xl mb-4"></div>
                <div class="h-12 bg-gray-300 rounded-xl mb-4"></div>
                <div class="h-12 bg-gray-300 rounded-xl mb-4"></div>
                <div class="h-12 bg-gray-300 rounded-xl mb-4"></div>
                <div class="h-12 bg-gray-300 rounded-xl mb-4"></div>
              </div>
            )}
          </div>
          <div id="search_result" style={{overflow:"auto"}} className="flex-col">
            {!loading &&
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  authtoken={authtoken}
                  onClose={onClose}
                  chatList={chatList}
                  setChatList={setChatList}
                  setchatLoading={setchatLoading}
                  chatLoading={chatLoading}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Drawer;
