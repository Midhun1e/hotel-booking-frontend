import React, {useState} from "react";
import InputBox from "./InputBox";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {resetGuestPassword} from "../../api/guest";
import {resetAdminPassword} from "../../api/admin";
import {receptionSignin} from "../../api/reception";
import {restaurantSignin} from "../../api/restaurant";
import {adminSignin} from "../../api/admin";
import {setAuthToken} from "../../services/authService";
import {displayNotification} from "./../../services/notificationService";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required("Email or Username is required").label("Email or Username"),
  confirmPassword: Yup.string().required("Password is required").label("Password"),
});

function ResetPassword({location, match}) {
  const {token} = match.params;
  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (values, setFieldError) => {
    if (location.pathname.includes("/admin/resetpassword/")) {
      const {data, status} = await resetAdminPassword(values, token);
      if (status === 400) setFieldError("userId", data);
      if (status !== 200) return displayNotification("error", "Something went wrong");
      else {
        displayNotification("success", "Successfully updated password");
        setTimeout(() => {
          window.location = "/admin/signin";
        }, 1000);
        return
      }
    }

    if (location.pathname.includes("/resetpassword/")) {
      const {data, status} = await resetGuestPassword(values, token);
      if (status === 400) setFieldError("userId", data);
      if (status !== 200) return displayNotification("error", "Something went wrong");
      else {
        displayNotification("success", "Successfully updated password");
        setTimeout(() => {
          window.location = "/signin";
        }, 1000);
      }
    }

    if (location.pathname === "/reception/signin") {
      const {data, status} = await receptionSignin(values);
      if (status === 400) setFieldError("userId", data);
      else {
        setAuthToken(data);
        window.location = "/reception/dashboard";
      }
    }

    if (location.pathname === "/restaurant/signin") {
      const {data, status} = await restaurantSignin(values);
      if (status === 400) setFieldError("userId", data);
      else {
        setAuthToken(data);
        window.location = "/restaurant/dashboard";
      }
    }

    if (location.pathname === "/admin/signin") {
      const {data, status} = await adminSignin(values);
      if (status === 400) setFieldError("userId", data);
      else {
        setAuthToken(data);
        window.location = "/admin/dashboard";
      }
    }
  };

  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
    >
      {({errors, touched, values, handleChange, handleBlur}) => (
        <Form>
          <main style={{backgroundColor: "white"}}>
            <section className="w-full h-full">
              <div
                className="top-0 w-full h-full bg-gray-900"
                style={{
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="container mx-auto px-6 h-full">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-4/12 px-4">
                    <div
                      style={{backgroundColor: "white", width: "110%"}}
                      className="mt-24 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
                    >
                      <div style={{marginTop: "20px"}} className="rounded-t mb-0 px-6 py-6">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <div className="relative w-full mb-3">
                            <InputBox
                              error={errors}
                              handleBlur={handleBlur}
                              touched={touched}
                              label="Password"
                              values={values}
                              type={passwordType}
                              name="newPassword"
                              placeholder="Password"
                              handleChange={handleChange}
                              style={{transition: "all .15s ease"}}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <InputBox
                              error={errors}
                              handleBlur={handleBlur}
                              touched={touched}
                              label="Password"
                              values={values}
                              type={passwordType}
                              name="confirmPassword"
                              placeholder="Password"
                              handleChange={handleChange}
                              style={{transition: "all .15s ease"}}
                            />
                          </div>
                          <div className="form-check">
                            <input
                              style={{cursor: "pointer"}}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              onChange={() =>
                                setPasswordType(passwordType === "text" ? "password" : "text")
                              }
                              id="flexCheckDefault"
                            />
                            <label
                              style={{cursor: "pointer"}}
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Show Password
                            </label>
                          </div>
                          <div className="text-center mt-6">
                            <button
                              className="btn-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style={{transition: "all .15s ease"}}
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPassword;
