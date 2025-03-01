import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

// Common Components
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import NotFound from "./components/common/NotFound";
import ForgotPassword from "./components/common/ForgotPassword";
import ResetPassword from "./components/common/ResetPassword";
import LinkReview from "./components/common/LinkReview";
import Logout from "./components/common/Logout";

// Pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/ContactSupportPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import GuestDashboard from "./pages/GuestDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ListPropertyPage from "./pages/ListPropertyPage";
import HotelDetails from "./pages/HotelDetails";
import RoomCard from "./pages/RoomCard";
import RoomDetails from "./pages/RoomDetails";
import HotelSidebar from "./pages/HotelSidebar";
import AddRoomBoy from "./pages/AddRoomBoy";

// Receptionist Components
import Sidebar from "./components/receptionistArea/Sidebar";
import BookedCheckIn from "./components/receptionistArea/BookedCheckIn";
import CheckOut from "./components/receptionistArea/CheckOut";

// Restaurant Components
import RestaurantSidebar from "./components/restaurantArea/RestaurantSidebar";
import AddFoodItem from "./components/restaurantArea/AddFoodItem";
import AddItemsToBill from "./components/restaurantArea/AddItemsToBill";

// Admin Components
import AddRoom from "./components/listPropertyPageComponent/AddRoom";
import BookedRoomDetails from "./components/RoomDetailsPageComponents/BookedRoomDetails";

// Protected Routes
import AdminRoute from "./components/common/AdminRoute";
import GuestRoute from "./components/common/GuestRoute";
import ReceptionRoute from "./components/common/ReceptionRoute";
import RestaurantRoute from "./components/common/RestaurantRoute";

function App() {
  return (
    <React.Fragment>
      <ToastContainer position="top-center" autoClose={5000} />
      <NavBar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/hoteldetails/:hotelId" element={<HotelDetails />} />
        <Route path="/hotel/roomdetails/:roomId" element={<RoomDetails />} />
        <Route path="/linkreview/:id" element={<LinkReview />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/room/:hotelId" element={<AdminRoute><RoomCard /></AdminRoute>} />
        <Route path="/admin/addHotel/:id?" element={<AdminRoute><ListPropertyPage /></AdminRoute>} />
        <Route path="/admin/manageHotel/:hotelId" element={<AdminRoute><HotelSidebar /></AdminRoute>} />
        <Route path="/admin/manageHotel/roomBoy/:roomBoyId" element={<AdminRoute><AddRoomBoy /></AdminRoute>} />
        <Route path="/admin/addroom/:hotelId" element={<AdminRoute><AddRoom /></AdminRoute>} />
        <Route path="/admin/editroom/:roomId" element={<AdminRoute><AddRoom /></AdminRoute>} />

        {/* Guest Routes */}
        <Route path="/dashboard" element={<GuestRoute><GuestDashboard /></GuestRoute>} />
        <Route path="/bookedroomdetails" element={<GuestRoute><BookedRoomDetails /></GuestRoute>} />

        {/* Receptionist Routes */}
        <Route path="/reception/dashboard" element={<ReceptionRoute><Sidebar /></ReceptionRoute>} />
        <Route path="/reception/dashboard/checkin/:bookingId" element={<ReceptionRoute><BookedCheckIn /></ReceptionRoute>} />
        <Route path="/reception/dashboard/checkout/:bookingId" element={<ReceptionRoute><CheckOut /></ReceptionRoute>} />

        {/* Restaurant Routes */}
        <Route path="/restaurant/dashboard" element={<RestaurantRoute><RestaurantSidebar /></RestaurantRoute>} />
        <Route path="/restaurant/addfooditem" element={<RestaurantRoute><AddFoodItem /></RestaurantRoute>} />
        <Route path="/restaurant/additemstobill/:bookingId" element={<RestaurantRoute><AddItemsToBill /></RestaurantRoute>} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Conditionally Render Footer */}
      {!["/reception/dashboard", "/restaurant/dashboard", "/restaurant/additemstobill", "/admin/manageHotel"].some(path => window.location.pathname.includes(path)) && <Footer />}
    </React.Fragment>
  );
}

export default App;