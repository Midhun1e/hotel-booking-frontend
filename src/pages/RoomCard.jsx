import React, {useEffect, useState} from "react";
import {getHotelRooms, toggleVisibility} from "./../api/admin";
import {displayNotification} from "./../services/notificationService";
import {Link} from "react-router-dom";
import "../css/Card.css";

function RoomCard({hotelId}) {
  const [rooms, setRooms] = useState();

  const getRooms = async () => {
    const {data, status} = await getHotelRooms(hotelId);
    if (status !== 200) return displayNotification("error", "Invalid Url");
    setRooms(data);
  };

  const hideUnhideRoom = async roomId => {
    const {data, status} = await toggleVisibility(roomId);
    if (status !== 200)
      return displayNotification("error", data || "Something unexpected happened");
    if (data) {
      displayNotification("success", "Succesfully made room hidden");
    } else {
      displayNotification("success", "Succesfully made room visible");
    }
    getRooms();
  };

  const editRoom = roomId => {
    window.location = `/admin/editroom/${roomId}`;
  };

  useEffect(() => {
    getRooms();
  }, []);

  if (!rooms) return null;

  return (
    <div className="dashboard-items">
      <h1 style={{marginTop: "70px", textAlign: "center"}}>Rooms</h1>
      <Link
        to={`/admin/addroom/${hotelId}`}
        className="btn btn-primary btn-lg btn-block"
        style={{marginBottom: "2rem", marginLeft: "5rem"}}
      >
        <i style={{fontSize: "25px", fontWeight: "bold"}}>+</i> Add Room
      </Link>

      <div className="wrapper">
        {rooms?.length > 0 ? (
          rooms.map(room => (
            <div className="room_card">
              <img src={room?.mainPhoto} className="room_card__img" />
              <div className="room_card__body">
                <h2 className="room_card__title">{room?.roomType}</h2>
                <p className="room_card__description">{room?.kindOfBed}</p>
                <p className="room_card__description">{room?.numberOfBeds} Bed</p>
                <h3 className="room_card__price">{room?.basePricePerNight}</h3>
                <button onClick={() => editRoom(room?._id)} className="room_card__btn">
                  Edit Room
                </button>
                <button
                  onClick={() => hideUnhideRoom(room?._id)}
                  className={
                    room?.isVisible
                      ? "room_card__btn__hideunhide btnbgcolor-hide"
                      : "room_card__btn__hideunhide btnbgcolor-unhide"
                  }
                >
                  {room?.isVisible ? "Hide Room" : "Unhide Room"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 style={{margin: "5rem"}}>There are no rooms</h2>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
