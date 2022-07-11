import React, {useEffect, useState} from "react";
import PriceandImageSection from "../components/RoomDetailsPageComponents/PriceandImageSection";
import Amenities from "../components/RoomDetailsPageComponents/Amenities";
import Reviews from "../components/RoomDetailsPageComponents/Reviews";
import Table from "./../components/common/Table";
import GuestForm from "./../components/RoomDetailsPageComponents/GuestForm";
import auth from "../services/authService";
import CheckRegistration from "./../components/RoomDetailsPageComponents/CheckRegistration";
import Loader from "./../components/common/Loader";
import {getHotel, getRoomsbyId} from "./../api/guest";
import {displayNotification} from "./../services/notificationService";

const HotelDetails = ({match, location}) => {
  const hotelId = match?.params?.hotelId;
  const [hotel, setHotel] = useState();
  const [rooms, setRooms] = useState();
  const [guestExist, setGuestExist] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getHotelbyId = async () => {
    let {data, status} = await getHotel(hotelId);
    if (data?.parking) data.facilities.push("Parking");
    if (data?.extraBed) data.facilities.push("Extra Bed");
    if (data?.restaurant) data.facilities.push("Restaurant");
    if (data?.allowPets) data.facilities.push("Pets Allowed");
    setHotel(data);
    let selectedDayRange = JSON.parse(localStorage.getItem("selectedDays"));
    let {data: roomData, status: reqStatus} = await getRoomsbyId({
      roomIds: data.hotelRooms,
      selectedDayRange,
      hotelId,
    });
    setRooms(roomData);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    let numberOfDays = Number(localStorage.getItem("numberOfDays"));
    if (numberOfDays === 0 || !numberOfDays)
      displayNotification("info", "Select date of your stay for clear details");
  };

  useEffect(() => {
    getHotelbyId();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <React.Fragment>
      <PriceandImageSection
        hotelDetails={{
          photos: hotel.photos,
          startingRatePerDay: hotel.startingRatePerDay,
          hotelName: hotel.hotelName,
          address: hotel.address,
          phoneNumber: hotel.phoneNumber,
          landLine: hotel.landLine,
          email:hotel.email,
          description: hotel.description,
          postalCode: hotel.postalCode,
          starRating: hotel.starRating,
          policy:{
            checkInStarts:hotel.checkInStart,
            checkInEnds:hotel.checkInEnd,
            checkOutStarts:hotel.checkOutStart,
            checkOutEnds:hotel.checkOutEnd
          }
        }}
      />
      <Amenities mainPhoto={hotel.mainPhoto} facilities={hotel.facilities} />
      {auth.getCurrentUser()?.isReception && !guestExist ? (
        <CheckRegistration setGuestExist={setGuestExist} />
      ) : null}
      {auth.getCurrentUser()?.isReception &&
      guestExist?.isGuestExist ? null : guestExist?.isGuestExist === false ? (
        <GuestForm setGuestExist={setGuestExist} />
      ) : null}
      <Table rooms={rooms} />
      <Reviews hotelId={hotel._id} />
    </React.Fragment>
  );
};

export default HotelDetails;
