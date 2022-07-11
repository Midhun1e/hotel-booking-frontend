import "./App.css";
import React from "react";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/common/NavBar.jsx";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/common/Footer";
import ListPropertyPage from "./pages/ListPropertyPage";
import GuestDashboard from "./pages/GuestDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HotelDetails from "./pages/HotelDetails";
import AddRoom from "./components/listPropertyPageComponent/AddRoom";
import RoomCard from "./pages/RoomCard";
import ReceptionRoute from "./components/common/ReceptionRoute";
import RestaurantRoute from "./components/common/RestaurantRoute";
import AdminRoute from "./components/common/AdminRoute";
import GuestRoute from "./components/common/GuestRoute";
import RoomDetails from "./pages/RoomDetails";
import BookedRoomDetails from "./components/RoomDetailsPageComponents/BookedRoomDetails";
import Sidebar from "./components/receptionistArea/Sidebar";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AboutPage from "./pages/AboutPage";
import BookedCheckIn from "./components/receptionistArea/BookedCheckIn";
import CheckOut from "./components/receptionistArea/CheckOut";
import RestaurantSidebar from "./components/restaurantArea/RestaurantSidebar";
import AddFoodItem from "./components/restaurantArea/AddFoodItem.jsx";
import AddItemsToBill from "./components/restaurantArea/AddItemsToBill";
import HotelSidebar from "./pages/HotelSidebar";
import AddRoomBoy from './pages/AddRoomBoy';
import ForgotPassword from './components/common/ForgotPassword';
import ResetPassword from './components/common/ResetPassword';
import LinkReview from './components/common/LinkReview';
import NotFound from './components/common/NotFound';
import Logout from './components/common/Logout';
import Contact from './pages/ContactSupportPage'
import {ToastContainer} from "react-toastify";
import {Switch, Route} from "react-router-dom";
function App() {
  return (
    <React.Fragment>
      <ToastContainer position="top-center" autoClose={5000000} />
      <NavBar />
      <Switch>
        <Route exact path="/about" component={AboutPage} />
        {/* <Route exact path="/search" component={SearchPage} /> */}
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/admin/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:token" component={ResetPassword} />
        <Route exact path="/hoteldetails/:hotelId" component={HotelDetails} />
        <Route exact path="/linkreview/:id" component={LinkReview} />
        <Route exact path="/hotel/roomdetails/:roomId" component={RoomDetails} />
        <Route exact path="/reception/signin" component={SigninPage} />
        <Route exact path="/restaurant/signin" component={SigninPage} />
        <Route exact path="/admin/signin" component={SigninPage} />
        <Route exact path="/admin/signup" component={SignupPage} />
        <Route exact path="/" component={LandingPage} />

        <AdminRoute exact path="/admin/reception/signup/:hotelId" component={SignupPage} />
        <AdminRoute exact path="/admin/reception/account/:receptionId" component={ReceptionDashboard} />
        <AdminRoute exact path="/admin/restaurant/signup/:hotelId" component={SignupPage} />
        <AdminRoute
          exact
          path="/admin/restaurant/account/:restaurantId"
          component={RestaurantDashboard}
        />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/room/:hotelId" component={RoomCard} />
        <AdminRoute exact path="/admin/addHotel/:id" component={ListPropertyPage} />
        <AdminRoute exact path="/admin/addHotel" component={ListPropertyPage} />
        <AdminRoute exact path="/admin/manageHotel/roomBoy/:roomBoyId" component={AddRoomBoy} />
        <AdminRoute exact path="/admin/manageHotel/:hotelId" component={HotelSidebar} />
        <AdminRoute exact path="/admin/addroom/:hotelId" component={AddRoom} />
        <AdminRoute exact path="/admin/editroom/:roomId" component={AddRoom} />
        <Route exact path="/admin/resetpassword/:token" component={ResetPassword} />

        <GuestRoute exact path="/dashboard" component={GuestDashboard} />
        <GuestRoute exact path="/bookedroomdetails" component={BookedRoomDetails} />

        <ReceptionRoute exact path="/reception/dashboard/checkin/:bookingId" component={BookedCheckIn} />
        <ReceptionRoute exact path="/reception/dashboard/checkout/:bookingId" component={CheckOut} />
        <ReceptionRoute exact path="/reception/dashboard" component={Sidebar} />

        <RestaurantRoute exact path="/restaurant/dashboard" component={RestaurantSidebar} />
        <RestaurantRoute exact path="/restaurant/addfooditem" component={AddFoodItem} />
        <RestaurantRoute exact path="/restaurant/additemstobill/:bookingId" component={AddItemsToBill} />

        <Route component={NotFound} />
      </Switch>
      {window.location.pathname.includes("/reception/dashboard") ||
      window.location.pathname.includes("/restaurant/dashboard") ||
      window.location.pathname.includes("/restaurant/additemstobill") ||
      window.location.pathname.includes("/admin/manageHotel") ? null : (
        <Footer />
      )}
    </React.Fragment>
  );
}

export default App;
