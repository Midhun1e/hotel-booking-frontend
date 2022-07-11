import React from "react";
import Rating from "../common/Rating";
import {displayNotification, dismissNotification} from "./../../services/notificationService";
import {Link} from "react-router-dom";

function SearchResultComponent({hotels, user}) {
  let className;
  if (user === "admin") {
    className = "renter-flex";
  } else {
    className = "maghny-gd-1 col-lg-4 col-md-6 mt-md-5 mt-4";
  }

  if (!user) {
    let numberOfDays = Number(localStorage.getItem("numberOfDays"));
    if (numberOfDays === 0)
      displayNotification("info", "Select date of your stay for clear details");
    else dismissNotification();
  }

  const handleHotelClick = id => {
    if (user === "admin") return (window.location = `/admin/manageHotel/${id}`);
    window.location = `/hoteldetails/${id}`;
  };

  return (
    <div style={{marginTop: user === "admin" ? "10%" : "none"}}>
      <div className="best-rooms w3l-blog">
        <div className="container py-sm-4">
          <div className="ban-content-inf row" style={{width: "100%"}}>
            {hotels?.length > 0 ? (
              <>
                {hotels.map(hotel => (
                  <div key={hotel._id} className={className} style={{marginTop: "15px"}}>
                    <div className="maghny-grid">
                      <figure onClick={() => handleHotelClick(hotel._id)} className="effect-lily">
                        <img
                          className="img-fluid"
                          style={{height: "260px"}}
                          src={hotel.mainPhoto}
                          alt="Room"
                        />
                        <figcaption>
                          <div>
                            <h4 className="top-text">
                              {hotel.hotelName}
                              <Rating value={Number(hotel?.reviewScore?.$numberDecimal)} />
                            </h4>
                          </div>
                        </figcaption>
                      </figure>
                      <div className="room-info">
                        <h3 className="room-title">
                          <a href="#url">{hotel?.city}</a>
                        </h3>
                        <ul className="mb-3"></ul>
                        <p>{hotel?.description}</p>
                        {hotel?.starRating > 0 && <p>{hotel?.starRating} Hotel</p>}
                        <p style={{color: "purple", fontWeight: "bold"}}>
                          Book for Rs.{hotel?.startingRatePerDay}{" "}
                        </p>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                          {user === "admin" ? (
                            <Link to={`/admin/addHotel/${hotel._id}`}>
                              <span className="btn mt-sm-4 mt-3">Edit hotel</span>
                            </Link>
                          ) : (
                            <div></div>
                          )}
                          {user === "admin" && !hotel.receptionId ? (
                            <Link to={`/admin/reception/signup/${hotel._id}`}>
                              <span className="btn mt-sm-4 mt-3">Create Reception Account</span>
                            </Link>
                          ) : (
                            <Link to={`/admin/reception/account/${hotel.receptionId}`}>
                              <span className="btn mt-sm-4 mt-3">Go to Reception Account</span>
                            </Link>
                          )}
                          {user === "admin" && !hotel.restaurantId ? (
                            <Link to={`/admin/restaurant/signup/${hotel._id}`}>
                              <span className="btn mt-sm-4 mt-3">Create Restaurant Account</span>
                            </Link>
                          ) : (
                            <Link to={`/admin/restaurant/account/${hotel.restaurantId}`}>
                              <span className="btn mt-sm-4 mt-3">Go to Restaurant Account</span>
                            </Link>
                          )}
                          {user === "admin" ? (
                            <Link to={`/admin/addroom/${hotel._id}`}>
                              <span className="btn mt-sm-3">
                                <i style={{fontSize: "1.5rem"}}>+</i> Add Rooms
                              </span>
                            </Link>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="room-info-bottom">
                          <ul className="room-amenities"></ul>
                          <a onClick={() => handleHotelClick(hotel._id)} className="btn view">
                            Manage Hotel →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No hotel available. Add one.</p>
            )}
            <div style={{width: "50%"}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultComponent;
