import React, {useState, useEffect} from "react";
import Step1 from "./../components/listPropertyPageComponent/Step1";
import Step2 from "./../components/listPropertyPageComponent/Step2";
import Step3 from "./../components/listPropertyPageComponent/Step3";
import Step4 from "./../components/listPropertyPageComponent/Step4";
import Stepper from "react-stepper-horizontal";
import * as Yup from "yup";
import {registerHotels, getAdminHotelsbyId, editHotelById} from "./../api/admin";
import {displayNotification} from "./../services/notificationService";
import {Formik, Form} from "formik";
import {toast} from "react-toastify";

const validationSchema = Yup.object().shape({
  hotelName: Yup.string().min(1).max(50).required(),
  starRating: Yup.string().oneOf(["", "1", "2", "3", "4", "5"]).nullable(),
  phoneNumber: Yup.string()
    .required()
    .length(12)
    .matches(/^[0-9]+$/, "Mobile number must include only numbers"),
  landLine: Yup.string()
    .required()
    .length(11)
    .matches(/^[0-9]+$/, "Land Line number must include only numbers"),
  email: Yup.string().required("Email is required").email("Email must be valid").label("Email"),
  address: Yup.string().required().min(8).max(255),
  description: Yup.string().required().min(120).max(160),
  city: Yup.string().required().min(1).max(50),
  postalCode: Yup.string()
    .required()
    .length(6)
    .matches(/^[0-9]+$/, "Postal code must include only numbers"),
  parking: Yup.string().required().oneOf(["No", "Yes"]),
  restaurant: Yup.string().required().oneOf(["No", "Yes"]),
  facilities: Yup.array(),
  extraBed: Yup.string().required().oneOf(["No", "Yes"]),
  noOfExtraBeds: Yup.number().min(1).max(4),
  pricePerExtraBed: Yup.number().min(0).max(10000).nullable(),
  mainPhoto: Yup.mixed().required(),
  photos: Yup.array().nullable(),
  checkInStart: Yup.string().required(),
  checkInEnd: Yup.string().required(),
  checkOutStart: Yup.string().required(),
  checkOutEnd: Yup.string().required(),
  allowPets: Yup.string().required().oneOf(["No", "Yes"]),
});

const booleanKeys = ["parking", "restaurant", "extraBed", "allowPets"];

function ListPropertyPage({match}) {
  let hotelId = match.params.id;
  const [initialValues, setInitialValues] = useState({
    hotelName: "",
    starRating: "",
    phoneNumber: "",
    landLine: "",
    email:"",
    address: "",
    description: "",
    city: "",
    postalCode: "",
    parking: "No",
    restaurant: "No",
    facilities: [],
    extraBed: "No",
    noOfExtraBeds: 1,
    pricePerExtraBed: 0,
    mainPhoto: "",
    photos: [],
    checkInStart: "00 : 00",
    checkInEnd: "00 : 00",
    checkOutStart: "00 : 00",
    checkOutEnd: "00 : 00",
    allowPets: "No",
  });

  async function getHotels(id) {
    const {data} = await getAdminHotelsbyId(id);
    const transform = obj =>
      booleanKeys.reduce((acc, key) => ({...acc, [key]: obj[key] === true ? "Yes" : "No"}), obj);
    setInitialValues(transform(data));
  }

  useEffect(() => {
    if (hotelId) {
      getHotels(hotelId);
    }
  }, []);

  let draftValues;
  const [currentPage, setCurrentPage] = useState(1);

  const saveAsDraft = data => {
    localStorage.setItem("saveAsDraft", JSON.stringify(data));
    displayNotification("info", "Succesfully saved as draft");
  };

  draftValues = JSON.parse(localStorage.getItem("saveAsDraft"));

  const sections = [
    {title: "Basic Info", onClick: () => setCurrentPage(1)},
    {title: "Facilities and Services", onClick: () => setCurrentPage(2)},
    {title: "Photos", onClick: () => setCurrentPage(3)},
    {title: "Policies", onClick: () => setCurrentPage(4)},
  ];

  const handleClick = isValid => {
    if (!isValid) displayNotification("error", "Please check your form. You missed something");
  };

  const handleSubmit = async (values, setFieldError) => {
    const transform = obj =>
      booleanKeys.reduce((acc, key) => ({...acc, [key]: obj[key] === "Yes"}), obj);

    let isEdited = false;
    if (hotelId) {
      const {data, status} = await editHotelById(transform(values), hotelId);
      if (status === 400) return setFieldError(data.property, data.msg);
      isEdited = true;
    } else {
      const {data, status} = await registerHotels(transform(values));
      if (status === 400) return setFieldError(data.property, data.msg);
    }
    toast.dismiss();
    if (isEdited) {
      toast.info("Successfully modified details")
      localStorage.removeItem("coverPhoto");
      localStorage.removeItem("numberOfImages");
      localStorage.removeItem("saveAsDraft");
    }
    else {
      toast.info("Successfully added hotel");
      localStorage.removeItem("coverPhoto");
      localStorage.removeItem("numberOfImages");
      localStorage.removeItem("saveAsDraft");
    }
    setTimeout(() => {
      window.location = "/admin/dashboard";
    }, 1000);
  };

  const buttonStyle = {
    width: "120px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const previousButtonStyle = {...buttonStyle};
  previousButtonStyle.marginLeft = "34vw";

  const nextButtonStyle = {...buttonStyle};
  nextButtonStyle.marginRight = "34vw";

  const next = () => setCurrentPage(prev => prev + 1);
  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(prev => prev - 1);
  };

  return (
    <Formik
      initialValues={draftValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
      enableReinitialize
    >
      {({isValid}) => (
        <Form>
          <h1>Dynamic Form Fields in react</h1>
          <Stepper
            steps={sections}
            activeStep={currentPage - 1}
            activeColor="#28a745"
            defaultBarColor="#28a745"
            completeColor="#4F96FF"
            completeBarColor="#4F96FF"
          />

          {currentPage === 1 && (
            <>
              <Step1 saveAsDraft={saveAsDraft} />
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <button
                  style={previousButtonStyle}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                  onClick={prev}
                >
                  Back
                </button>
                <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>
                  Next
                </button>
              </div>
            </>
          )}

          {currentPage === 2 && (
            <>
              <Step2 saveAsDraft={saveAsDraft} />
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>
                  Back
                </button>
                <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>
                  Next
                </button>
              </div>
            </>
          )}
          {currentPage === 3 && (
            <>
              <Step3
                saveAsDraft={saveAsDraft}
                preview={initialValues.mainPhoto}
                count={initialValues.photos.length}
              />
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>
                  Back
                </button>
                <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>
                  Next
                </button>
              </div>
            </>
          )}
          {currentPage === 4 && (
            <>
              <Step4 saveAsDraft={saveAsDraft} />
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>
                  Back
                </button>
                <button
                  style={nextButtonStyle}
                  type="submit"
                  onClick={() => handleClick(isValid)}
                  className="btn btn-success"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default ListPropertyPage;
