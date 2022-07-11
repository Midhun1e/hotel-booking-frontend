import React, {useEffect, useState} from "react";
import PersonIcon from "@material-ui/icons/Person";
import ImageGallery from "react-image-gallery";
import ModalComponent from "../common/ModalComponent";
import Loader from "./../common/Loader";
import _ from "lodash";
import {useHistory} from "react-router-dom";
import {getBookedRoomsbyId} from "./../../api/guest";
import {displayNotification} from "./../../services/notificationService";
import {getRoombyId} from "../../api/guest";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/Table.css";

function BookedRoomDetails({}) {
  const [rooms, setRooms] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [facilities, setFacilities] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const {data: roomDetails, days} = history.location.state;

  const getBookedRoomDetails = async () => {
    let roomIds = [];
    for (let [key, value] of Object.entries(roomDetails)) {
      roomIds.push(key);
    }
    const {data, status} = await getBookedRoomsbyId({roomIds});
    if (status !== 200) return displayNotification("error", data || "Something went wrong");
    _.each(data, (room, index) => {
      for (let [key, value] of Object.entries(roomDetails)) {
        if (room._id == key) {
          for (let [key1, value1] of Object.entries(value)) {
            data[index][key1] = value1;
          }
        }
      }
    });

    setRooms(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getRoomDetails = async roomId => {
    const {data, status} = await getRoombyId(roomId);
    let images;
    if (status !== 200) return displayNotification("error", "Something went wrong");
    images = data.photos.map(photo => ({original: photo}));
    setFacilities(data.facilities);

    images.unshift({original: data.mainPhoto});
    setImages(images);
    setIsOpen(true);
  };

  useEffect(() => {
    getBookedRoomDetails();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!rooms) return null;

  return (
    <div style={{margin: "auto", width: "85%", marginTop: "70px"}}>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Room Type</th>
            <th scope="col">Beds</th>
            <th scope="col">Sleeps</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room._id}>
              <td style={{cursor: "pointer"}} onClick={() => getRoomDetails(room._id)} scope="col">
                <h3>{room.roomType}</h3>
                <div className="features">
                  <img
                    src={room.mainPhoto}
                    alt="room image"
                    className="columns"
                    style={{width: "30%", border: "2px solid gray", borderRadius: "5px"}}
                  />
                  <div className="features_list" className="columns" style={{marginLeft: "40px"}}>
                    <ul className="w3l-right-book mt-4">
                      {room.facilities.slice(0, 5).map(facility => (
                        <li key={facility}>
                          <span className="fa fa-check" aria-hidden="true" />
                          {facility}
                        </li>
                      ))}
                    </ul>
                    <a style={{fontSize: "18px", color: "#008CFF"}}>View more details</a>
                  </div>
                </div>
              </td>
              <td style={{minWidth: "65px"}}>
                <div className="persons">
                  {room.numberOfBeds <= 10 ? (
                    <div>
                      {_.range(room.numberOfBeds).map(bed => (
                        <i key={bed.toString()} className="fa fa-bed" style={{margin: "2px"}}></i>
                      ))}
                    </div>
                  ) : (
                    <p>This room has {room.numberOfBeds} beds</p>
                  )}
                </div>
              </td>
              <td>
                <div className="persons">
                  {room.numberOfGuestsInaRoom <= 10 ? (
                    <div>
                      {_.range(room.numberOfGuestsInaRoom).map(person => (
                        <PersonIcon key={person.toString()} />
                      ))}
                    </div>
                  ) : (
                    <p>This room can accommodate {room.numberOfGuestsInaRoom} persons</p>
                  )}
                </div>
              </td>
              <td>
                <p>{`${room.pricePerRoom} x ${days} Nights = ${room.pricePerRoom * days}`}</p>
                <p>{`${room.pricePerRoom * days} x ${room.numberOfRoomsBooked} Rooms = ${
                  room.pricePerRoom * days * room.numberOfRoomsBooked
                }`}</p>
                Rs. {room.pricePerRoom * room.numberOfRoomsBooked * days}
              </td>
            </tr>
          ))}
          {images.length > 0 ? (
            <ModalComponent modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
              <div style={{display: "flex", justifyItems: "center", alignContent: "flex-start"}}>
                <div>
                  <ImageGallery items={images} />
                </div>
                <div className="col-lg-7 roomsingle">
                  <h3 className="title-small mb-0">Amenities provided</h3>
                  <ul style={{columns: "2"}}>
                    {facilities.map(facility => (
                      <li>
                        <span className="fa fa-check" aria-hidden="true" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ModalComponent>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default BookedRoomDetails;
