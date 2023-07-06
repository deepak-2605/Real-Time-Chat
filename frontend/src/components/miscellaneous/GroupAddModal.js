import { React, useState } from "react";
import UserListItem from "./UserListItem";
import GroupChatUserListItem from "./GroupChatUserListItem";
 import { ToastContainer, toast } from 'react-toastify';
const GroupAddModal = ({ chatName, userList,setUserList, isOpen, onClose, authtoken,chatId,chatList,user }) => {
  const [searchBox, setsearchBox] = useState(false);
  const [GroupChatName, setGroupChatName] = useState();
  const [SelectedUsers, setSelectedUsers] = useState([]);
  const [isSelected, setIsselected] = useState(false);
  const [Search, setSearch] = useState("");
  const [SearchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(true);
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
        `http://localhost:3001/api/user?search=${query}`,
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

  const handleRemove = (object) => {
    setSelectedUsers((SelectedUsers) =>
      SelectedUsers.filter((obj) => obj !== object)
    );
  };
  // Remove user from group
  // user1 is the user which need to be removed
 
  return (
    <>
    <ToastContainer></ToastContainer>
    <div>
      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50 rounded-xl">
            <div className=" bg-gray-200 p-0 rounded shadow-lg border-black border-4">
              {/* <div className="flex"> */}
              <div className="bg-green-300 flex h-16">
                <h2 className="text-2xl font-bold text-center self-center mb-4 flex-1">
                  {chatName}
                </h2>
                {/* </div> */}
                <button onClick={onClose} className="self-start">
                  <i class="fa-solid fa-xmark" />
                </button>
              </div>
              {userList?.map((user) => (
                <div className="bg-slate-500 m-2 text-white rounded-lg flex px-2 w-72">
                  <UserListItem
                    key={user._id}
                    user={user}
                    authtoken={authtoken}
                  />
                </div>
              ))}
              {/* <button
                onClick={() => setsearchBox(true)}
                className="bg-blue-400 hover:bg-blue-700 text-white p-2 m-4 rounded-lg"
              >
                Add New Member
              </button>
              {searchBox && (
                <div className="">
                  <div className="flex">
                    <input
                      className="m-2 p-2 rounded-lg text-center"
                      type="text"
                      placeholder="Search Users"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button
                      className="bg-green-400 hover:bg-green-700 text-white p-2 m-2 rounded-lg"
                      type="submit"
                    >
                      {" "}
                      Add
                    </button>
                    <button
                      onClick={() => setsearchBox(false)}
                      className="bg-gray-400 hover:bg-gray-700 text-white p-2 m-2 rounded-lg"
                      type="submit"
                    >
                      {" "}
                      Back
                    </button>
                  </div>
                  <div className="selectedTags">
                    {SelectedUsers.length > 0 && (
                      <div className="bg-gray-100 mt-4 p-2">
                        {SelectedUsers.map((object, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center bg-white"
                            style={{
                              height: 20,
                              borderRadius: 10,
                              padding: 3,
                              margin: 3,
                            }}
                          >
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
                  {!loading && (
                    <div className="flex flex-wrap justify-between">
                      {SearchResult?.slice(0, 6).map((user) => (
                        <GroupChatUserListItem
                          key={user._id}
                          user={user}
                          authtoken={authtoken}
                          isSelected={isSelected}
                          setIsselected={setIsselected}
                          SelectedUsers={SelectedUsers}
                          setSelectedUsers={setSelectedUsers}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )} */}
              {/* <div className="flex items-center justify-center mb-2">
                <img
                  //src={profilePic}
                  alt="user image"
                  className="w-36 h-36 object-cover"
                  style={{ borderRadius: 72 }}
                />
              </div>
              <p className="text-center">Email Id : </p> */}
              {/* <button
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default GroupAddModal;
