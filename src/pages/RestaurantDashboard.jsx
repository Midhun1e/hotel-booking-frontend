import React, {useState} from "react";
import PersonIcon from "@material-ui/icons/Person";
import ChangePassword from "./../components/common/ChangePassword";
import RestaurantProfile from "./../components/common/RestaurantProfile";
import {Lock} from "@material-ui/icons";
import "../../src/css/GuestDashboard.css";

function RestaurantDashboard({match}) {
  const [selectOption, setSelectOption] = useState("profile");

  return (
    <div className="guestDashboard">
      <div className="guestDashboard_menu">
        <ul className="guestDashboard_menuItems">
          <li
            onClick={() => {
              setSelectOption("profile");
            }}
            className={false && "active"}
          >
            <PersonIcon />
            <div className="Content">Profile</div>
          </li>
          <li onClick={() => setSelectOption("password")}>
            <Lock />
            <div className="Content">Password</div>
          </li>
        </ul>
      </div>
      {(() => {
        if (selectOption === "profile")
          return (
            <RestaurantProfile
              restaurantId={match.params.restaurantId}
              title={"Restaurant Profile"}
              description={"Basic info about restaurant account"}
            />
          );
        else if (selectOption === "password")
          return (
            <ChangePassword
              restaurantId={match.params.restaurantId}
              receptionId={null}
              title="Change Password"
            />
          );
      })()}
    </div>
  );
}

export default RestaurantDashboard;
