import React, {useEffect, useState, useMemo} from "react";
import DataTable from "react-data-table-component";
import Calendar from "./../landingPageComponent/Calendar";
import _ from "lodash";
import * as Yup from "yup";
import {getUpcomingBookings, cancelBooking} from "../../api/reception";
import {displayNotification} from "./../../services/notificationService";
import {confirmAlert} from "react-confirm-alert";
import {Formik, Form} from "formik";
import "../../css/ArrivalList.css";

const dateValidator = Yup.object()
  .shape({
    day: Yup.number().min(1).max(31).required(),
    month: Yup.number().min(1).max(12).required(),
    year: Yup.number().min(2021).max(3000).required(),
  })
  .nullable();

const validationSchema = Yup.object().shape({
  selectedDayRange: Yup.object().shape({
    from: dateValidator,
    to: dateValidator,
  }),
});

function UpcomingArrivalList() {
  const [booking, setBooking] = useState();
  const [fullBooking, setFullBooking] = useState();

  const handleCancel = async bookingId => {
    confirmAlert({
      title: "Cancel Booking",
      message: "Are you sure want to cancel this booking.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const {data, status} = await cancelBooking(bookingId);
            if (status !== 200)
              return displayNotification("error", data || "Could not cancel booking");
            setBooking(data)
            displayNotification("success", "Booking cancelled");
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

  const columns = useMemo(
    () => [
      {
        name: "Booking ID",
        selector: "hotelBookingId",
        sortable: true,
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Phone Number",
        selector: "phoneNumber",
      },
      {
        name: "Booked Date",
        selector: "bookedOn",
        sortable: true,
      },
      {
        name: "Check In",
        selector: "startingDayOfStay",
        sortable: true,
      },
      {
        name: "Ckeck Out",
        selector: "endingDayOfStay",
      },
      {
        name: "Booking Mode",
        sortable: true,
        selector: "bookingMode",
        cell: row =>
          row.bookingMode === "online" ? (
            <span className="badge badge-success">Online</span>
          ) : (
            <span className="badge badge-secondary">Offline</span>
          ),
      },
      {
        name: "",
        cell: row => (
          <td data-label="CheckIn">
            <button onClick={() => handleCancel(row._id)} className="btn btn-danger">
              Cancel
            </button>
          </td>
        ),
      },
    ],
    []
  );

  const handleChange = ({target}) => {
    let booking = fullBooking;
    setBooking(
      booking.filter(book => _.includes(book.name.toLowerCase(), target.value.toLowerCase()))
    );
  };

  const handleSubmit = async values => {
    const {data, status} = await getUpcomingBookings(values);
    if (status !== 200) {
      setBooking([]);
      setFullBooking([]);
      return;
    }
    setBooking(data);
    setFullBooking([...data]);
  };

  const getAllBookings = async () => {
    const {data, status} = await getUpcomingBookings();
    if (status !== 200) return;
    setBooking(data);
    setFullBooking([...data]);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          selectedDayRange: {
            from: null,
            to: null,
          },
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({values, handleChange}) => (
          <Form>
            <section className="w3l-availability-form" id="booking" style={{marginLeft: "400px"}}>
              <h3 className="title-small">Search Upcoming Bookings by Date</h3>
              <div className="row book-form">
                <div className="form-input col-md-4 col-sm-6 mt-3 ">
                  <Calendar
                    name="selectedDayRange"
                    onChange={handleChange}
                    selectedDayRange={values.selectedDayRange}
                    minimumDate={true}
                    placeholder="Select date 📅"
                  />
                </div>
                <div className="bottom-btn col-md-2 col-sm-6 mt-3">
                  <button type="submit" className="btn btn-style btn-primary py-3 w-100 px-2">
                    Search
                  </button>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
      <div className="dashboard-items">
        <div className="arrivallist" style={{margin: 0}}>
          <>
            <DataTable
              title="Upcomming Arrivals List"
              pagination
              subHeader
              noDataComponent="No bookings available."
              subHeaderComponent={[
                <input
                  onChange={e => handleChange(e)}
                  placeholder="Search by name"
                  className="border-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  type="text"
                ></input>,
              ]}
              columns={columns}
              data={booking}
            />
          </>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UpcomingArrivalList;
