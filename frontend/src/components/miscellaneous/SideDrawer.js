import React, {  useState } from "react";
import ProfileModal from "./ProfileModal.js";
import Drawer from "./SearchResults.js";
import { useNavigate } from "react-router";


const SideDrawer = ({User}) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const notiback="#cbba06";
  const token=localStorage.getItem('token');
  const navigate=useNavigate();
  const user = User;
  // This is for chat with user

// This is for chat list

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
        {/* Side Drawer content starts */}
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
{/* This is for profile Modal */}
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




        