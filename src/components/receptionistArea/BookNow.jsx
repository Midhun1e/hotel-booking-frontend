import React from "react";
import Calendar from "./../landingPageComponent/Calendar";
import auth from "../../services/authService";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {getHotelInfo} from "../../api/guest";

function BookNow() {
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

  const handleSubmit = async values => {
    values["hotelId"] = auth.getCurrentUser()?.hotelId;
    localStorage.setItem("selectedDays", JSON.stringify(values.selectedDayRange));
    const {data} = await getHotelInfo(values);
    let {numberOfDays} = data;
    localStorage.setItem("numberOfDays", numberOfDays);
    window.location = `/hoteldetails/${auth.getCurrentUser()?.hotelId}`;
  };

  return (
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
            <div className="w3l-availability-form-main py-5">
              <div className="container pt-lg-3 pb-lg-5">
                <div className="forms-top">
                  <div className="form-right">
                    <div className="mt-6 form-inner-cont">
                      <h3 className="title-small">Check Availability</h3>
                      <div className="row book-form">
                        <div className="form-input col-md-4 col-sm-6 mt-3 ">
                          <Calendar
                            name="selectedDayRange"
                            onChange={handleChange}
                            selectedDayRange={values.selectedDayRange}
                            minimumDate={true}
                          />
                        </div>
                        <div className="bottom-btn col-md-2 col-sm-6 mt-3">
                          <button
                            type="submit"
                            className="btn btn-style btn-primary py-3 w-100 px-2"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
}

export default BookNow;
