import React, {useEffect, useState} from "react";
import Rating from "./Rating";
import {useHistory} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {getBookings, cancelBooking} from "../../api/guest";
import {displayNotification} from "./../../services/notificationService";
import Loader from "./Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../css/Booked_Dashboard.css";

function Booked_Dashboard() {
  const history = useHistory();
  const [bookings, setBookings] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    const {data, status} = await getBookings({isStayCompleted: false});
    if (status !== 200) return displayNotification("error", data);
    if (data === "No bookings found") {
      setBookings(null);
      return setIsLoading(false);
    }
    setBookings(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const diffBetweenDays = (startingDate, endingDate) => {
    const diffInMs = new Date(endingDate) - new Date(startingDate);
    return diffInMs / (1000 * 60 * 60 * 24);
  };

  const handleDetails = (roomDetails, startingDate, endingDate) => {
    let result = diffBetweenDays(startingDate, endingDate);
    history.push("/bookedroomdetails", {data: roomDetails, days: result});
  };

  const cancelRoomBooking = async bookingId => {
    confirmAlert({
      title: "Cancel Booking",
      message: "Are you sure want to cancel this booking.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await cancelBooking(bookingId);
            setBookings(bookings.filter(booking => bookingId !== booking._id));
            displayNotification("info", "Successfully cancelled your booking.");
          },
        },
        {
          label: "No",
          onClick: () => {
            return null;
          },
        },
      ],
    });
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) return <Loader />;

  if (!bookings)
    return (
      <h2 style={{marginTop: "150px", marginLeft: "20px"}}>
        You currently don't have any booking. <a href="/">Book Now</a>
      </h2>
    );

  return (
    <React.Fragment>
      <div className="booked">
        <h3>Booked</h3>
        <h5>Caption about Booked</h5>
        {bookings.map(booking => (
          <article className="book">
            <div className="book-box">
              <img src={booking?.mainPhoto} width="1500" height="1368" alt="" />
            </div>
            <div className="book-content">
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1
                  onClick={() => (window.location = `/hoteldetails/${booking.hotelId}?nodate=true`)}
                  className="book-title"
                >
                  <a>{booking?.hotelName}</a>{" "}
                </h1>
                {booking?.status === "yettostay" ? (
                  <span className="badge badge-warning">
                    <p style={{margin: 0, color: "#000"}}>Yet to Stay</p>
                  </span>
                ) : (
                  ""
                )}
                {booking?.status === "checkedin" ? (
                  <span className="badge badge-success">
                    <p style={{margin: 0, color: "#000"}}>Checked In</p>
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* <p className="book-metadata">
                <span className="book-rating">
                  <Rating value={booking?.rating} className="rating" />
                </span>
              </p> */}
              <p className="book-desc" style={{marginTop:'20px'}}>
                <h5 className="book-desc-more">Address :{booking.address} </h5>
              </p>
              <div className="book-details" style={{marginTop:'20px'}}>
                <div className="book-details-right">
                  <h5 className="pay">Booking ID: {booking?.hotelBookingId}</h5>
                  <h5 className="book-details-desc">Booked On : {booking?.bookedOn}</h5>
                  <h5 className="book-details-desc">
                    Check In : {booking?.lateStartingDayOfStay || booking?.startingDayOfStay}
                  </h5>
                  <h5 className="book-details-desc">Check Out : {booking?.endingDayOfStay}</h5>
                </div>
                <div className="book-details-left">
                  <h5 className="pay">
                    Accomodtion Total: Rs.{" "}
                    {booking?.totalPrice *
                      diffBetweenDays(booking.startingDayOfStay, booking.endingDayOfStay)}
                  </h5>
                  <h5 className="pay">Extra Cost: {booking?.additionalCharges}</h5>
                  <h5 className="pay">Total Beds: {booking?.totalBeds}</h5>
                  <h5 className="pay">Total Guests: {booking?.totalGuests}</h5>
                  <h5 className="pay">Total Rooms: {booking?.totalRooms}</h5>
                </div>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <button
                  onClick={() =>
                    handleDetails(
                      booking.roomDetails,
                      booking.startingDayOfStay,
                      booking.endingDayOfStay
                    )
                  }
                  className="btn btn-primary"
                >
                  Get Details
                </button>
                {booking?.status === "yettostay" ? (
                  <button onClick={() => cancelRoomBooking(booking._id)} className="btn btn-danger" style={{marginTop:'20px'}}>
                    Cancel Booking
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Booked_Dashboard;
