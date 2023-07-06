import React, { useState } from "react";
import Drawer from "./SearchResults.js";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router";

const SideDrawer = ({ User ,chatList,setchatList,setchatLoading, chatLoading}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatId, setChatId] = useState([]);
  const notiback = "#cbba06";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [notification, setNotification] = useState();

  const handlenotification = (notifi) => {
    setNotification(notifi);
  };
  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  // This is for chat with user

  // This is for chat list

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const loadSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div
      style={{
        padding: 8,
      }}
    >
      <div
        className="flex flex-col sm:flex-row"
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
            // margin: 0,
            // width: windowWidth < 600 ? '100%' : '300px',
            borderRadius: 20,
          }}
          className="mb-2 md:mb-0 bg-white w-8/12 sm:w-72"
          // className="bg-white"
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
            chatlist={chatList}
            setChatList={setchatList}
            setchatLoading={setchatLoading}
            chatLoading={chatLoading}
          />
        </div>
        {!drawerOpen && <div className="w-8/12 sm:w-48">
          <div
            class="relative bg-white  hover:bg-gray-300 flex items-center "
            style={{ borderRadius: 20 }}
          >
            <div className="px-2">
              <button
                className="hover:bg-gray-500 "
                style={{ width: 30, height: 30, borderRadius: 15 }}
              >
                <i
                  class="fa-solid fa-bell px-2"
                  style={{ color: { notiback } }}
                >
                  {/* <MenuList pl={2}>
                    {!notification && "No New Messages"}
                    {notification.map((notif) => (
                      <MenuItem
                        key={notif._id}
                      >
                        {notif.chat.isGroupChat
                          ? `New Message in ${notif.chat.chatName}`
                          : `New Message from ${notif.chat.usersList[0]._id===user._id?notif.chat.usersList[1].name:notif.chat.usersList[0].name}`}
                      </MenuItem>
                    ))}
                </MenuList> */}
                </i>
              </button>
            </div>
            <div className="dropdown text-center">
              <div className="relative justify-evenly">
                <div>
                  <button
                    type="button"
                    className="px-4 py-2 text-black font-Poppins focus:outline-none"
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
                      className="block w-full px-4 py-2 text-center md:text-left hover:bg-gray-100"
                      onClick={openModal}
                    >
                      Open Profile
                    </button>
                    <ProfileModal
                      User={User}
                      isOpen={isModalOpen}
                      onClose={closeModal}
                    />
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
        </div>}
      </div>
    </div>
  );
};

export default SideDrawer;
