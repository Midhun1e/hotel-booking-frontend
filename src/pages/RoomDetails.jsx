import React, {useState, useEffect} from "react";
import ImageGallery from "react-image-gallery";
import {displayNotification} from "../services/notificationService";
import {getRoombyId} from "../api/guest";

function RoomDetails({match}) {
  const roomId = match.params.roomId;
  const [images, setImages] = useState([]);

  const getRoomDetails = async () => {
    const {data, status} = await getRoombyId(roomId);
    let images;
    if (status !== 200) return displayNotification("error", "Something went wrong");
    images = data.photos.map(photo => ({original: photo}));
    setImages(images);
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  if (!roomId) return (window.location = "/");
  if (images.length === 0) return null;

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
}

export default RoomDetails;
