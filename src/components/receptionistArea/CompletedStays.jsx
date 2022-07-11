import React, {useEffect, useState, useMemo} from "react";
import DataTable from "react-data-table-component";
import Calendar from "./../landingPageComponent/Calendar";
import Invoice from "./../common/Invoice";
import _ from "lodash";
import * as Yup from "yup";
import {getCompletedStays, downloadInvoice} from "../../api/reception";
import {displayNotification} from "./../../services/notificationService";
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

function CompletedStays() {
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

  const [booking, setBooking] = useState();
  const [fullBooking, setFullBooking] = useState();

  const handleChange = ({target}) => {
    let booking = fullBooking;
    setBooking(
      booking.filter(book => _.includes(book.name.toLowerCase(), target.value.toLowerCase()))
    );
  };

  const getAllBookings = async () => {
    const {data, status} = await getCompletedStays();
    if (status !== 200) return;
    data.map(ele => {
      if (ele.lateStartingDayOfStay) {
        ele.startingDayOfStay = ele.lateStartingDayOfStay;
      }
      if (ele.earlyEndingDayOfStay) {
        ele.endingDayOfStay = ele.earlyEndingDayOfStay;
      }
    });
    setBooking(data);
    setFullBooking([...data]);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "Booking ID",
        selector: "hotelBookingId",
        sortable: true,
        grow: 0,
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Phone Number",
        selector: "phoneNumber",
        grow: 1,
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
        grow: 0,
      },
      {
        name: "Check Out",
        selector: "endingDayOfStay",
        sortable: true,
        grow: 0,
      },
      {
        name: "Email",
        selector: "email",
      },
      {
        name: "Booking Mode",
        sortable: true,
        selector: "bookingMode",
        grow: 0,
        cell: row =>
          row.bookingMode === "online" ? (
            <span className="badge badge-success">Online</span>
          ) : (
            <span className="badge badge-secondary">Offline</span>
          ),
      },
      {
        name: "Download Invoice",
        cell: row => (
          <button onClick={() => handleDownloadInvoice(row._id)} className="btn btn-secondary">
            Download
          </button>
        ),
      },
    ],
    []
  );

  const handleSubmit = async values => {
    const {data, status} = await getCompletedStays(values);
    if (status !== 200) {
      setBooking([]);
      setFullBooking([]);
      return;
    }
    setBooking(data);
    setFullBooking([...data]);
  };

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
              <h3 className="title-small">Search Completed Stays by Date</h3>
              <div className="row book-form">
                <div className="form-input col-md-4 col-sm-6 mt-3 ">
                  <Calendar
                    name="selectedDayRange"
                    onChange={handleChange}
                    selectedDayRange={values.selectedDayRange}
                    minimumDate={false}
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
              title="Completed Stays List"
              pagination
              subHeader
              noDataComponent="No Completed Stays."
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

export default CompletedStays;
