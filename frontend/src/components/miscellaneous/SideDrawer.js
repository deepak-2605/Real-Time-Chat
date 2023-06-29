import React, { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal.js";
import Drawer from "./Drawer.js";
import { useNavigate } from "react-router";
import ChatDisplay from "./ChatDisplay.js";


const SideDrawer = ({User,authtoken}) => {
  const [search, setSearch] = useState("");
  const [chatList, setchatList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setchatLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const notiback="#cbba06";
  const token=localStorage.getItem('token');
  const navigate=useNavigate();
  const user = User;
  const openChat = async (e) => {
    e.preventDefault();
    const chatId = e.currentTarget.id;
    const config = {
        headers:{
            authorization: `Bearer ${authtoken}`,
        },
    }
    const response = await fetch(`http://localhost:3001/api/message/${chatId}`, config);
    const allmessages = await response.json();
    console.log(allmessages);
    


  }

  useEffect(() => {
    const getchatlist = async () => {
      const config = {
          headers:{
              authorization: `Bearer ${authtoken}`,
          },
      }
      const response = await fetch("http://localhost:3001/api/chat", config);
      const chatlist = await response.json();
      const result = [];
      console.log(chatlist);
      chatlist.forEach(element => {
        var message = "";
        if (element.recentMessage.length != 0) {
          message = element.recentMessage[0].content;
          const obj = {
            chatId:element._id,
            chatName: element.chatName,
            lastMessage:message
          }
          result.push(obj);
        }
        
      });
      if (result.length !== chatList.length) {
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
  },[chatList]);
 const logouthandler=()=>{
  localStorage.removeItem("token");
  navigate("/");
 }
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const loadSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div
      style={{
        d: "flex",
        padding: 8,
      }}
    >
      <div
        className="bg-primary"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          w: "100%",
          p: "5px 10px 5px 10px",
        }}
      >
        <div
          //  className="flex "
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 0,
            width: 300,
            borderRadius: 20,
          }}
          className="bg-white"
        >
          <div className="px-2">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <button
            type="button"
            class="inline-block rounded bg-primary px-2 pb-2 pt-2.5 text-md font-Poppins uppercase leading-normal text-black "
            data-te-toggle="tooltip"
            data-te-placement="bottom"
            data-te-ripple-init
            data-te-ripple-color="light"
            title="Search For Your Contacts"
            onClick={toggleDrawer}
          >
            Search For Your contacts
          </button>
          <Drawer
            isOpen={drawerOpen}
            onClose={toggleDrawer}
            searchLoader={loadSearch}
            authtoken={token}
          />
        </div>
        <div className="border-blue-900 border-4 w-7/12">
          <div className="flex">
            <div className="h-12 pr-40">
              <h1>My Chats</h1>
            </div>
            <div>
              <button
                className="flex items-centre justify-center hover:bg-gray-300"
                style={{ borderRadius: 15, height: 30, padding: 4 }}>
                <div className="px-2">
                  <p>New Group</p>
                </div>
                <div>
                  <i class="fa-solid fa-plus"></i>
                </div>
              </button>
            </div> 
          </div>
          <div>
            {chatLoading && chatList?.map((chat) => (
              <div id={ chat.chatId} onClick={openChat} className="flex-row border-4 border-gray-400 h-20">
                <div className="block my-3">
                  {chat.chatName}
                </div>
                <div>
                  {chat.lastMessage}
                </div>
              </div>
            ))
            }
          </div>
        </div>
        <div>
          <div
            class="relative text-left bg-white  hover:bg-gray-300 w-620 flex items-center"
            style={{ borderRadius: 20 }}
          >
            <div className="px-2">
              <button className="hover:bg-gray-500 " style={{width:30,height:30,borderRadius:15}}>
                <i class="fa-solid fa-bell px-2" style={{"color": {notiback}}}></i>
              </button>
            </div>
            <div className="dropdown">
              <div className="relative">
                <div>
                  <button
                    type="button"
                    className="px-4 py-2 text-black font-Poppins  focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    Options
                    <i class="fa-solid fa-caret-down px-3"></i>
                  </button>
                </div>
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded shadow-md">
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={openModal}
                    >
                      Open Profile
                    </button>
                    <ProfileModal User={user} isOpen={isModalOpen} onClose={closeModal} />
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={logouthandler}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;




        