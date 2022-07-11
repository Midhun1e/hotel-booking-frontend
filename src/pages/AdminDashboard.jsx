import React, {useState} from "react";
import Logout from "../components/common/Logout";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChangePassword from "../components/common/ChangePassword";
import AdminProfile from "../components/common/AdminProfile";
import AdminHotels from "./../components/common/AdminHotels";
import {HotelRounded} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {Lock} from "@material-ui/icons";
import "../../src/css/RenterDashboard.css";
import "../../src/css/GuestDashboard.css";

function AdminDashboard() {
  const [selectOption, setSelectOption] = useState("profile");

  return (
    <div className="guestDashboard">
      <div className="guestDashboard_menu">
        <Link className="btn btn-primary ml-12" to={"/admin/addHotel"}>
          + Add Hotel
        </Link>
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
          <li onClick={() => setSelectOption("hotels")}>
            <HotelRounded />
            <div className="Content">Hotels</div>
          </li>
          <li onClick={() => setSelectOption("password")}>
            <Lock />
            <div className="Content">Password</div>
          </li>
          <li onClick={() => setSelectOption("logout")}>
            <ExitToAppIcon />
            <div className="Content">Logout</div>
          </li>
        </ul>
      </div>

      {(() => {
        if (selectOption === "profile")
          return (
            <AdminProfile title={"Profile"} description={"Basic info about the administrator"} />
          );
        else if (selectOption === "hotels") return <AdminHotels />;
        else if (selectOption === "password") return <ChangePassword title="Change Password" />;
        else if (selectOption === "logout") return <Logout />;
      })()}
    </div>
  );
}

export default AdminDashboard;
