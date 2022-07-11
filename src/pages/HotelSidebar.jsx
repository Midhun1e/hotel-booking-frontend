import React, {useState} from "react";
import ManageRoomBoy from "./ManageRoomBoy";
import AddRoomBoy from "./AddRoomBoy";
import RoomCard from "./RoomCard";
import {ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent} from "react-pro-sidebar";
import {BrowserRouter as Router} from "react-router-dom";
import {FaList} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "../css/Sidebar.css";

const HotelSidebar = ({match}) => {
  let [choice, setChoice] = useState("manageRooms");
  const hotelId = match.params.hotelId;
  localStorage.setItem("viewHotelId", hotelId);

  return (
    <React.Fragment>
      <div className="dashboard-sidebar" style={{marginTop: "68px"}}>
        <Router>
          <div id="header">
            <ProSidebar width="245px" collapsed={false}>
              <SidebarHeader></SidebarHeader>
              <SidebarContent>
                <Menu className="menu" iconShape="square">
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("manageRooms")}>Manage Rooms</a>
                  </MenuItem>
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("addRoomBoy")}>Add RoomBoy</a>
                  </MenuItem>
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("manageRoomBoy")}>Manage RoomBoy</a>
                  </MenuItem>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
        </Router>
      </div>
      {choice === "manageRooms" ? <RoomCard hotelId={hotelId} /> : ""}
      {choice === "addRoomBoy" ? <AddRoomBoy hotelId={hotelId} /> : ""}
      {choice === "manageRoomBoy" ? <ManageRoomBoy hotelId={hotelId} /> : ""}
    </React.Fragment>
  );
};

export default HotelSidebar;
