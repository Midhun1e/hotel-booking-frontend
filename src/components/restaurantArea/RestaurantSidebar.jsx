import React, {useState} from "react";
import RestaurantCurrentlyStaying from "./RestaurantCurrentlyStaying";
import AddFoodItem from "./AddFoodItem.jsx";
import {ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent} from "react-pro-sidebar";
import {BrowserRouter as Router} from "react-router-dom";
import {FaList} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "../../css/Sidebar.css";

const RestaurantSidebar = () => {
  let [choice, setChoice] = useState("addBill");

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
                    <a onClick={() => setChoice("addBill")}>Add Bill</a>
                  </MenuItem>
                  <MenuItem icon={<FaList />}>
                    <a onClick={() => setChoice("addFoodItem")}>Add Food Item</a>
                  </MenuItem>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
        </Router>
      </div>
      {choice === "addBill" ? <RestaurantCurrentlyStaying /> : ""}
      {choice === "addFoodItem" ? <AddFoodItem /> : ""}
    </React.Fragment>
  );
};

export default RestaurantSidebar;
