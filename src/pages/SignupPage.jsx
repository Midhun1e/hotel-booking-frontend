import React, {useState} from "react";
import InputBox from "./../components/common/InputBox";
import * as Yup from "yup";
import {displayNotification} from "./../services/notificationService";
import {restaurantSignup} from "../api/restaurant";
import {receptionSignup} from "../api/reception";
import {setAuthToken} from "./../services/authService";
import {Formik, Form} from "formik";
import {guestSignup} from "../api/guest";
import {adminSignup} from "../api/admin";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required("Name is required").label("Name"),
  email: Yup.string().required("Email is required").email("Email must be valid").label("Email"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, "Invalid Username")
    .label("Username"),
  password: Yup.string().required("Password is required").min(6).max(256).label("Password"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function SignupPage({location, match}) {
  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (values, setFieldError) => {
    if (location.pathname === "/signup") {
      const {data, status} = await guestSignup(values);
      if (status === 400) setFieldError(data.property, data.msg);
      else {
        setAuthToken(data);
        window.location = "/dashboard";
      }
    }

    if (location.pathname.includes("/admin/reception/signup")) {
      if (!match.params.hotelId) return displayNotification("error", "Something went wrong");
      values["hotelId"] = match.params.hotelId;
      const {data, status} = await receptionSignup(values);
      if (data.property === "toast") return displayNotification("error", data.msg);
      if (status === 400) setFieldError(data.property, data.msg);
      else {
        window.location = "/admin/dashboard";
      }
    }

    if (location.pathname.includes("/admin/restaurant/signup")) {
      if (!match.params.hotelId) return displayNotification("error", "Something went wrong");
      values["hotelId"] = match.params.hotelId;
      const {data, status} = await restaurantSignup(values);
      if (data.property === "toast") return displayNotification("error", data.msg);
      if (status === 400) setFieldError(data.property, data.msg);
      else {
        window.location = "/admin/dashboard";
      }
    }

    if (location.pathname === "/admin/signup") {
      const {data, status} = await adminSignup(values);
      if (status === 400) setFieldError(data.property, data.msg);
      else {
        setAuthToken(data);
        window.location = "/admin/dashboard";
      }
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
    >
      {({errors, touched, values, handleChange, handleBlur}) => (
        <Form>
          <main style={{backgroundColor: "white"}}>
            <section className="top-10 w-full h-full">
              <div
                className="top-0 w-full h-full bg-gray-900"
                style={{
                  backgroundColor: "red",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="container mx-auto px-6 h-full">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-4/12 px-4">
                    <div
                      style={{width: "110%"}}
                      className="mt-24 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
                    >
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <div className="relative w-full mb-3">
                            <InputBox
                              error={errors}
                              handleBlur={handleBlur}
                              touched={touched}
                              label="Name"
                              values={values}
                              type="text"
                              name="name"
                              placeholder="Name"
                              handleChange={handleChange}
                              style={{transition: "all .15s ease"}}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <InputBox
                              error={errors}
                              handleBlur={handleBlur}
                              touched={touched}
                              label="Email"
                              values={values}
                              type="text"
                              name="email"
                              placeholder="Email"
                              handleChange={handleChange}
                              style={{transition: "all .15s ease"}}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <InputBox
                              error={errors}
                              handleBlur={handleBlur}
                              touched={touched}
                              label="Username"
                              values={values}
                              type="text"
                              name="username"
                              placeholder="Username"
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
                              name="password"
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
                              label="Confirm Password"
                              values={values}
                              type={passwordType}
                              name="confirmPassword"
                              placeholder="Confirm Password"
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
                              Sign Up
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

export default SignupPage;
