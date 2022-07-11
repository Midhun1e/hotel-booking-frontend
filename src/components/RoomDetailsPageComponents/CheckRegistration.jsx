import React from "react";
import PropertyInputBox from "../common/PropertyInputBox";
import * as Yup from "yup";
import {displayNotification} from "./../../services/notificationService";
import {offlineGuestCheck} from "../../api/reception";
import {Form, Formik} from "formik";
import "react-phone-input-2/lib/style.css";

const validationSchema = Yup.object().shape({
  userId: Yup.string().min(2).max(50).required("This field is required"),
});

function CheckRegistration({setGuestExist}) {
  const handleSubmit = async values => {
    const {data, status} = await offlineGuestCheck(values);
    if (status !== 200) return displayNotification("error", "Something went wrong");
    setGuestExist(data);
    localStorage.setItem("offlineGuestId", JSON.stringify(data?.userId));

    if (data?.isGuestExist) {
      displayNotification("info", "Guest logged In ,please book");
    } else {
      localStorage.setItem("guestUserId", values.userId);
      displayNotification("warn", "Guest Dont have account, please create one");
    }
  };

  return (
    <Formik
      initialValues={{
        userId: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
    >
      {({}) => (
        <Form>
          <div
            style={{marginLeft: "7.75vw", width: "85%"}}
            className="md:grid md:grid-cols-1 md:gap-6"
          >
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0" />
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <h2>Check Registration</h2>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6">
                          <PropertyInputBox
                            label="Email or Mobile (Include country code for mobile)"
                            type="text"
                            name="userId"
                          />
                        </div>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="btn-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{transition: "all .15s ease"}}
                        >
                          Check
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CheckRegistration;
