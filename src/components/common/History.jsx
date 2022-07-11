import React, {useState, useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import ModalComponent from "./ModalComponent";
import Rating from "./Rating";
import Invoice from "./Invoice";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {useHistory} from "react-router-dom";
import {getBookings, addReview, editReview, getReviewById, downloadInvoice} from "../../api/guest";
import {displayNotification} from "./../../services/notificationService";
import "../../css/Booked_Dashboard.css";
import "../../css/History.css";

const reviewSchema = Yup.object().shape({
  review: Yup.string().min(2).max(100000).required(),
  rating: Yup.number().required().oneOf([1, 2, 3, 4, 5]),
});
console.log(reviewSchema)

function History() {
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState();
  const [hotelId, setHotelId] = useState();
  const [bookingId, setBookingId] = useState();
  const [ratingValue, setRatingValue] = useState();
  const [reviewValue, setReviewValue] = useState();
  const [initialValues, setInitialValues] = useState();
  const [revId, setRevId] = useState();

  const getAllBookings = async () => {
    const {data, status} = await getBookings({isStayCompleted: true});
    if (status !== 200) return displayNotification("error", data);
    if (data === "No bookings found") return setBookings(null);
    setBookings(data);
  };

  const handleDownloadInvoice = async bookingId => {
    const {data, status} = await downloadInvoice(bookingId);
    if (status !== 200)
      return displayNotification("error", data || "Something unexpected happened");
    generateInvoice(data);
  };

  function generateInvoice(details) {
    Invoice(
      details?.name,
      details?.address,
      details?.phoneNumber,
      details?.inputFields,
      details?.earlyEndingDayOfStay || details?.endingDayOfStay,
      details?.price,
      details?.restaurantBillAmount,
      details?.accomodationTotal,
      details?.roomDetails,
      details?.extraBedTotal,
      details?.lateStartingDayOfStay || details?.startingDayOfStay
    );
  }

  const onReviewClick = async (hotelId, bookingId, reviewId) => {
    setHotelId(hotelId);
    setBookingId(bookingId);
    console.log(reviewId,"rid");
    let datas = {};
    if (reviewId) {
      const {data} = await getReviewById(reviewId);
      datas["review"] = data.review;
      datas["rating"] = data.rating;
      setRatingValue(data.rating);
      setInitialValues(datas);
    setRevId(reviewId);
    setIsOpen(true);
  }else{
      const {data} = await getReviewById(reviewId);
      datas["review"] = "";
      datas["rating"] = 0;
      setRatingValue(0);
      setReviewValue("")
      setInitialValues({
        rating: "",
        review: "",
      })
      setInitialValues(datas);
    setRevId(reviewId);
    setIsOpen(true);
    }
    console.log(datas,"ds")
    // setInitialValues(datas);
    // setRevId(reviewId);
    // setIsOpen(true);
  };

  const setValues = getFieldProps => {
    const {value: ratingValue} = getFieldProps("rating");
    if (ratingValue) setRatingValue(ratingValue);
    const {value: reviewValue} = getFieldProps("review");
    if (reviewValue) setReviewValue(reviewValue);
  };

  const diffBetweenDays = (startingDate, endingDate) => {
    const diffInMs = new Date(endingDate) - new Date(startingDate);
    return diffInMs / (1000 * 60 * 60 * 24);
  };

  const handleDetails = (roomDetails, startingDate, endingDate) => {
    let result = diffBetweenDays(startingDate, endingDate);
    history.push("/bookedroomdetails", {data: roomDetails, days: result});
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const handleSubmit = async (values, resetForm) => {
    values["bookingId"] = bookingId;
    if (!revId) {
      const {data, status} = await addReview(hotelId, values);
      if (status !== 200) return displayNotification("error", data);
      displayNotification("success", "Review Posted Successfully");
      getAllBookings();
    } else {
      const {data, status} = await editReview(revId, values);
      if (status !== 200) return displayNotification("error", data);
      displayNotification("success", "Review Edited Successfully");
      getAllBookings();
    }
    resetForm({values: ""});
  };

  if (!bookings)
    return (
      <h2 style={{marginTop: "150px", marginLeft: "20px"}}>
        There is no previous booking history.
      </h2>
    );

  return (
    <div className="history">
      <h3>History</h3>
      <h5>Caption about History</h5>
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
              <span className="badge badge-success">
                <p style={{margin: 0, color: "#000"}}>Stay completed</p>
              </span>
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
                <h5 className="book-details-desc">
                  Check Out : {booking?.earlyEndingDayOfStay || booking?.endingDayOfStay}
                </h5>
              </div>
              <div className="book-details-left">
                <h5 className="pay">
                  Total cost:{" "}
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
              <button
                onClick={() => handleDownloadInvoice(booking._id)}
                className="btn btn-outline-secondary"
              >
                Download Invoice
              </button>
              <button
                onClick={() => onReviewClick(booking.hotelId, booking._id, booking.reviewId)}
                className="btn btn-secondary"
                style={{marginTop:'20px'}} >
                {booking?.reviewId ? "Edit Review" : "Add Review"}
              </button>
            </div>
          </div>
        </article>
      ))}
      <Formik
        initialValues={
          initialValues || {
            rating: "",
            review: "",
          }
        }
        validationSchema={reviewSchema}
        onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}
        enableReinitialize
      >
        {({handleSubmit, setFieldValue, getFieldProps}) => (
          <ModalComponent
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
          >
            <Form>
              <div className="relative w-full mb-3">
                <div style={{display: "flex"}}>
                  <h2 style={{marginRight: "60px", paddingTop: "7px"}}>Review</h2>
                  <ReactStars
                    count={5}
                    onChange={rating => setFieldValue("rating", rating)}
                    size={35}
                    isHalf={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    half={setValues(getFieldProps)}
                    value={Number(ratingValue) || 0}
                  />
                  <div></div>
                </div>
                ,
                <textarea
                  style={{width: "40rem", height: "200px"}}
                  name="rating"
                  onChange={e => setFieldValue("review", e.target.value)}
                  row="5"
                  col="90"
                  value={reviewValue}
                ></textarea>
              </div>
            </Form>
          </ModalComponent>
        )}
      </Formik>
    </div>
  );
}

export default History;
