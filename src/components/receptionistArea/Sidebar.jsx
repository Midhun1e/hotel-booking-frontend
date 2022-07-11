import React, {useState} from "react";
import ArrivalList from "./ArrivalList";
import BookNow from "./BookNow";
import UpcomingArrivalList from "./UpcomingArrivalList";
import CurrentlyStaying from "./CurrentlyStaying";
import CompletedStays from "./CompletedStays";
import CheckOut from "./CheckOut";
import {ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent} from "react-pro-sidebar";
import {BrowserRouter as Router} from "react-router-dom";
import {FaList} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "../../css/Sidebar.css";

const Sidebar = () => {
  let [choice, setChoice] = useState("arrivalList");

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
                    <a onClick={() => setChoice("arrivalList")}>Todays Arrivals</a>
                  </MenuItem>
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("booknow")}>Book Now</a>
                  </MenuItem>
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("upcomingArrivalList")}>Upcoming Arrivals</a>
                  </MenuItem>
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("currentlyStaying")}>Currently Staying</a>
                  </MenuItem>
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("completedStays")}>Completed Stays</a>
                  </MenuItem>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
        </Router>
      </div>
      {choice === "booknow" ? <BookNow /> : ""}
      {choice === "arrivalList" ? <ArrivalList /> : ""}
      {choice === "upcomingArrivalList" ? <UpcomingArrivalList /> : ""}
      {choice === "currentlyStaying" ? <CurrentlyStaying /> : ""}
      {choice === "completedStays" ? <CompletedStays /> : ""}
      {choice === "checkout" ? <CheckOut /> : ""}
    </React.Fragment>
  );
};

export default Sidebar;
