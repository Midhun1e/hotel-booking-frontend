import React, {useEffect, useState, useMemo} from "react";
import DataTable from "react-data-table-component";
import _ from "lodash";
import {getCurrentlyStaying} from "../../api/restaurant";
import "../../css/ArrivalList.css";

function RestaurantCurrentlyStaying() {
  const handleClick = bookingId => {
    window.location = `/restaurant/additemstobill/${bookingId}`;
  };

  const columns = useMemo(
    () => [
      {
        name: "Booking ID",
        selector: "hotelBookingId",
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Room Numbers",
        selector: "roomNumbers",
      },
      {
        name: "",
        cell: row => (
          <td data-label="CheckOut">
            <button onClick={() => handleClick(row._id)} className="btn btn-secondary">
              Add Bill
            </button>
          </td>
        ),
      },
    ],
    []
  );
  const [booking, setBooking] = useState();
  const [fullBooking, setFullBooking] = useState();
  const [searchOption, setSearchOption] = useState();

  const handleChange = ({target}) => {
    let booking = fullBooking;
    if (searchOption == "Booking ID") {
      setBooking(
        booking.filter(book =>
          _.includes(book.hotelBookingId.toLowerCase(), target.value.toLowerCase())
        )
      );
    }

    if (searchOption == "Room Number") {
      setBooking(booking.filter(book => _.includes(book.roomNumbers, target.value.toLowerCase())));
    }
  };

  const handleSelectChange = e => {
    setSearchOption(e.target.value);
  };

  const getAllBookings = async () => {
    const {data, status} = await getCurrentlyStaying();
    if (status !== 200) return;
    setBooking(data);
    setFullBooking([...data]);
  };

  let searchBox = !searchOption || (
    <input
      onChange={e => handleChange(e)}
      placeholder={searchOption && `Search By ${searchOption}`}
      className="border-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
      type="text"
      disabled={!searchOption}
    ></input>
  );

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="dashboard-items">
      <div className="arrivallist" style={{margin: 0}}>
        <>
          <DataTable
            title="Currently Staying List"
            pagination
            subHeader
            noDataComponent="No data found"
            subHeaderComponent={[
              <select
                onChange={e => handleSelectChange(e)}
                placeholder="Select Choice"
                className="border-1 mb-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full cursor-pointer"
              >
                <option value="" disabled selected hidden>
                  Select search By option
                </option>
                <option value="Booking ID">Booking ID</option>
                <option value="Room Number">Room Number</option>
              </select>,
              searchBox,
            ]}
            columns={columns}
            data={booking}
          />
        </>
      </div>
    </div>
  );
}

export default RestaurantCurrentlyStaying;
