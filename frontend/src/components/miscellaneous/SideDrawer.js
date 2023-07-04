import React, {  useState } from "react";
import Drawer from "./SearchResults.js";



const SideDrawer = ({User}) => {
  const [search, setSearch] = useState("");
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token=localStorage.getItem('token');
  
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
        
      </div>
    </div>
  );
};

export default SideDrawer;




        