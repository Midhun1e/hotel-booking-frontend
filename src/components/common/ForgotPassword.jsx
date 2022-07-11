import React from "react";
import InputBox from "./InputBox";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {forgotGuestPassword} from "../../api/guest";
import {forgotAdminPassword} from "../../api/admin";
import {displayNotification} from "./../../services/notificationService";

const validationSchema = Yup.object().shape({
  userId: Yup.string().required("Email or Username is required").label("Email or Username"),
});

function ForgotPassword({location}) {
  const handleSubmit = async (values, setFieldError) => {
    if (location.pathname === "/admin/forgotpassword") {
      const {data, status} = await forgotAdminPassword(values);
      if (status !== 200) setFieldError("userId", data?.msg || "Something went wrong");
      else {
        displayNotification("info", "Verify mail to reset password");
        setTimeout(() => {
          window.location = "/";
        }, 2000);
        return;
      }
    }

    if (location.pathname === "/forgotpassword") {
      const {data, status} = await forgotGuestPassword(values);
      if (status === 400) setFieldError("userId", data?.msg || "Something went wrong");
      else {
        displayNotification("info", "Verify mail to reset password");
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      }
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
                      style={{width: "110%"}}
                      className="mt-24 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
                    >
                      <div style={{marginTop: "20px"}} className="rounded-t mb-0 px-6 py-6">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <div className="relative w-full mb-3">
                            <InputBox
                              error={errors}
                              handleBlur={handleBlur}
                              touched={touched}
                              label="Email or Username"
                              values={values}
                              type="text"
                              name="userId"
                              placeholder="Email or Username"
                              handleChange={handleChange}
                              style={{transition: "all .15s ease"}}
                            />
                          </div>
                          <div className="text-center mt-6">
                            <button
                              className="btn-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style={{transition: "all .15s ease"}}
                            >
                              Reset Password
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

export default ForgotPassword;
