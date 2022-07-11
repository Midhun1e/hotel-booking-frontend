import React, {useState, useEffect} from "react";
import Webcam from "react-webcam";
import MUISelect from "@material-ui/core/Select";
import MUITextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import * as Yup from "yup";
import {Formik, Form, Field, FieldArray, getIn} from "formik";
import {Card, CardContent, MenuItem} from "@material-ui/core";
import {displayNotification} from "./../../services/notificationService";
import {getBookingDetails} from "../../api/reception";
import {TextField, Select} from "formik-material-ui";
import {DropzoneArea} from "material-ui-dropzone";
import {makeStyles} from "@material-ui/core/styles";
import {checkIn} from "../../api/reception";
import "../../css/BookedCheckIn.css";

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let date = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

month = month.toString();
date = date.toString();

if (month.length == 1) month = "0" + month;
if (date.length == 1) date = "0" + date;

let newdate = year + "/" + month + "/" + date;
let roomNumberObject = {};
let duplicateVal;
let globalProp;

const validate = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  phoneNumber: Yup.string().min(5).max(50).required(),
  address: Yup.string().min(8, "Too short").max(255, "Too Long!").required("Required"),
  identityProofNumber: Yup.string().max(30).required("Required"),
  email: Yup.string().required("Email is required").email("Email must be valid").label("Email"),
  startingDayOfStay: Yup.string()
    .matches(
      /^(((\d{4}\/((0[13578]\/|1[02]\/)(0[1-9]|[12]\d|3[01])|(0[13456789]\/|1[012]\/)(0[1-9]|[12]\d|30)|02\/(0[1-9]|1\d|2[0-8])))|((([02468][048]|[13579][26])00|\d{2}([13579][26]|0[48]|[2468][048])))\/02\/29)){0,10}$/,
      "Invalid date"
    )
    .required(),
  endingDayOfStay: Yup.string()
    .matches(
      /^(((\d{4}\/((0[13578]\/|1[02]\/)(0[1-9]|[12]\d|3[01])|(0[13456789]\/|1[012]\/)(0[1-9]|[12]\d|30)|02\/(0[1-9]|1\d|2[0-8])))|((([02468][048]|[13579][26])00|\d{2}([13579][26]|0[48]|[2468][048])))\/02\/29)){0,10}$/,
      "Invalid date"
    )
    .test({
      name: "departure",
      test: value => (value < newdate ? false : true),
      message: "Invalid Date",
    })
    .required(),
  identityProof: Yup.mixed().required("Identity Proof image is required"),
  roomFinalDetails: Yup.array().of(
    Yup.object({
      roomType: Yup.string().required(),
      roomNumber: Yup.number()
        .typeError("Room Number should be a Number")
        .test({
          name: "unique",
          test: () => {
            let roomNos = [];
            for (let [key, value] of Object.entries(roomNumberObject)) {
              roomNos.push(value);
            }
            let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);

            duplicateVal = findDuplicates(roomNos);

            if (_.isEmpty(duplicateVal)) return true;
            else return false;
          },
          message: "Repeated Room Numbers!",
        })
        .required("Room Number is required"),
      roomBoy: Yup.string()
        .min(2)
        .max(50)
        .test({
          name: "shouldSelect",
          test: values => {
            if (values === "Select Room Boy") {
              return false;
            } else {
              return true;
            }
          },
          message: "Allocate a Room Boy",
        })
        .required(),
      adults: Yup.number()
        .typeError("Room Number should be a Number")
        .min(1, "Minimum one adult should be there.")
        .required("Number of Adults is required"),
      children: Yup.number()
        .typeError("Room Number should be a Number")
        .min(0)
        .test(
          "max",
          () =>
            `Total members allowed in this room is ${
              globalProp.parent.selectedExtraBed === "Extra Bed- None"
                ? globalProp.parent.guests + 0
                : globalProp.parent.guests + globalProp.parent.selectedExtraBed
            }. Choose Extra bed if available.`,
          function (value, props) {
            const {adults} = this.parent;
            globalProp = this;
            let extraBed;
            if (props.parent.selectedExtraBed == "Extra Bed- None") {
              extraBed = 0;
            } else {
              extraBed = Number(props.parent.selectedExtraBed);
            }
            return value <= props.parent.guests + extraBed - adults;
          }
        )
        .required("Number of Children is required")
        .label("Children"),
      selectedExtraBed: Yup.mixed().nullable(),
      roomBoyId: Yup.string(),
    })
  ),
});

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  multilineColor: {
    color: "red",
  },
}));

function BookedCheckIn({match}) {
  const classes = useStyles();
  const [prev, setPrev] = useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [initialValues, setInitialValues] = useState();
  const steps = getSteps();

  const handleImageChange = (data, setFieldValue) => {
    if (!data[0]) return;
    const reader = new FileReader();
    setPrev(null);
    reader.onload = () => {
      if (reader.readyState === 2) {
        let imageBase64 = reader.result;
        setFieldValue("identityProof", imageBase64);
      }
    };
    reader.readAsDataURL(data[0]);
  };

  const getDetails = async () => {
    const {data, status} = await getBookingDetails(match.params.bookingId);
    if (status !== 200) return displayNotification("error", data || "Could not checkin!");
    data.startingDayOfStay = data.startingDayOfStay.replaceAll("-", "/");
    data.endingDayOfStay = data.endingDayOfStay.replaceAll("-", "/");
    setInitialValues(data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async values => {
    const {status} = await checkIn(values);
    if (status !== 200)
      return displayNotification("error", "Could not checkin, something went wrong");
    displayNotification("info", "Checkin Successfull");
    setTimeout(() => {
      window.location = "/reception/dashboard";
    }, 1000);
  };

  if (!initialValues) return null;

  return (
    <Card className="card" style={{margin: "auto", width: "85%", marginTop: "75px"}}>
      <CardContent className="card-contents">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
          validationSchema={validate}
        >
          {({
            errors,
            handleChange,
            handleBlur,
            getFieldProps,
            getFieldMeta,
            setFieldTouched,
            setFieldValue,
          }) => (
            <Form>
              <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {activeStep === steps.length ? (
                    <div>
                      <Typography className={classes.instructions}>All steps completed</Typography>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {getStepContent(
                          activeStep,
                          initialValues,
                          handleChange,
                          getFieldProps,
                          errors,
                          getIn,
                          handleBlur,
                          getFieldMeta,
                          setFieldTouched,
                          setFieldValue,
                          handleImageChange,
                          prev,
                          setPrev
                        )}
                      </Typography>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.backButton}
                        >
                          Back
                        </Button>
                        {activeStep === steps.length - 1 ? null : (
                          <Button variant="contained" color="primary" onClick={handleNext}>
                            Next
                          </Button>
                        )}
                        {activeStep === steps.length - 1 ? (
                          <button className="btn btn-primary" type="submit">
                            Submit
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default BookedCheckIn;

function getStepContent(
  stepIndex,
  initialValues,
  handleChange,
  getFieldProps,
  errors,
  getIn,
  handleBlur,
  getFieldMeta,
  setFieldTouched,
  setFieldValue,
  handleImageChange,
  prev,
  setPrev
) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="first-form">
          <div className="first-row">
            <Field
              name="name"
              disabled
              component={TextField}
              label="Full Name"
              className="fields"
            />
            <Field name="phoneNumber" component={TextField} label="Phone" className="fields" />
          </div>
          <div className="second-row w-3/6">
            <Field
              fullWidth
              name="address"
              component={TextField}
              label="Address"
              className="fields"
            />
          </div>
          <div className="third-row w-3/6">
            <Field
              fullWidth
              name="identityProofNumber"
              component={TextField}
              label="Aadhar or Passport Number"
              className="fields"
            />
          </div>
          <div className="third-row w-3/6">
            <Field
              fullWidth
              name="email"
              disabled
              component={TextField}
              label="Email ID"
              className="fields"
            />
          </div>
          <div className="fourth-row w-3/6">
            <Field
              fullWidth
              name="startingDayOfStay"
              component={TextField}
              label="Checkin Date (YYYY/MM/DD)"
              className="fields"
              disabled
            />
          </div>
          <div className="fifth-row w-3/6">
            <Field
              fullWidth
              name="endingDayOfStay"
              component={TextField}
              label="Checkout Date (YYYY/MM/DD)"
              className="fields"
              disabled
            />
          </div>
        </div>
      );
    case 1:
      return (
        <div style={{margin: "auto", width: "68%"}}>
          <FieldArray name="roomFinalDetails">
            {({}) => (
              <div>
                {initialValues.roomFinalDetails.map((p, index) => {
                  return (
                    <div
                      key={p.roomId + index}
                      style={{
                        marginBottom: "30px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        padding: "30px",
                        borderRadius: "10px",
                      }}
                    >
                      <MUISelect
                        fullWidth
                        name={`roomFinalDetails[${index}].roomType`}
                        defaultValue={p.roomType}
                        onChange={handleChange}
                        disabled
                      >
                        <MenuItem value={p.roomType}>{p.roomType}</MenuItem>
                      </MUISelect>

                      <MUITextField
                        fullWidth
                        name={`roomFinalDetails[${index}].adults`}
                        label="Number of Adults"
                        className="mt-3"
                        onChange={handleChange}
                        value={getFieldProps(`roomFinalDetails[${index}].adults`).value}
                        onBlur={handleBlur}
                        placeholder="Input zero if none"
                      />
                      {getIn(errors, `roomFinalDetails[${index}].adults`) &&
                        getFieldMeta(`roomFinalDetails[${index}].adults`).touched && (
                          <div style={{color: "red"}}>
                            {getIn(errors, `roomFinalDetails[${index}].adults`)}
                          </div>
                        )}
                      <MUITextField
                        fullWidth
                        name={`roomFinalDetails[${index}].children`}
                        label="Number of Children"
                        className="mt-14"
                        onChange={handleChange}
                        value={getFieldProps(`roomFinalDetails[${index}].children`).value}
                        onBlur={handleBlur}
                        placeholder="Input zero if none"
                      />
                      {getIn(errors, `roomFinalDetails[${index}].children`) &&
                        getFieldMeta(`roomFinalDetails[${index}].children`).touched && (
                          <div style={{color: "red"}}>
                            {getIn(errors, `roomFinalDetails[${index}].children`)}
                          </div>
                        )}
                      <MUISelect
                        fullWidth
                        name={`roomFinalDetails[${index}].roomNumber`}
                        defaultValue={p.roomNumber}
                        className="mt-3"
                        onChange={e => {
                          setFieldValue(`roomFinalDetails[${index}].roomNumber`, e.target.value);
                          setFieldTouched(`roomFinalDetails[${index}].roomNumber`);
                          roomNumberObject[`roomFinalDetails[${index}].roomNumber`] =
                            e.target.value;
                        }}
                        value={getFieldProps(`roomFinalDetails[${index}].roomNumber`).value}
                      >
                        <MenuItem value="Select Room Number">Select Room Number</MenuItem>
                        {p.availableRoomNumbers.map((no, ind) => (
                          <MenuItem value={no} key={ind.toString()}>
                            {no}
                          </MenuItem>
                        ))}
                      </MUISelect>
                      {getIn(errors, `roomFinalDetails[${index}].roomNumber`) &&
                        getFieldMeta(`roomFinalDetails[${index}].roomNumber`).touched &&
                        !_.isEmpty(duplicateVal) &&
                        duplicateVal[0] ==
                          getFieldProps(`roomFinalDetails[${index}].roomNumber`).value && (
                          <div style={{color: "red"}}>
                            {getIn(errors, `roomFinalDetails[${index}].roomNumber`)}
                          </div>
                        )}

                      <MUISelect
                        fullWidth
                        name={`roomFinalDetails[${index}].roomBoy`}
                        defaultValue={p.roomBoy}
                        className="mt-3"
                        onChange={e => {
                          setFieldValue(`roomFinalDetails[${index}].roomBoy`, e.target.value);
                          setFieldValue(
                            `roomFinalDetails[${index}].roomBoyId`,
                            initialValues.roomBoys.filter(boy => boy.name === e.target.value)[0]._id
                          );
                          setFieldTouched(`roomFinalDetails[${index}].roomBoy`);
                        }}
                        value={getFieldProps(`roomFinalDetails[${index}].roomBoy`).value}
                      >
                        <MenuItem value="Select Room Boy">Select Room Boy</MenuItem>
                        {initialValues.roomBoys.map((boy, ind) => (
                          <MenuItem value={boy.name} key={boy._id}>
                            {boy.name}
                          </MenuItem>
                        ))}
                      </MUISelect>
                      {getIn(errors, `roomFinalDetails[${index}].roomBoy`) &&
                        getFieldMeta(`roomFinalDetails[${index}].roomBoy`).touched && (
                          <div style={{color: "red"}}>
                            {getIn(errors, `roomFinalDetails[${index}].roomBoy`)}
                          </div>
                        )}

                      <MUISelect
                        fullWidth
                        name={`roomFinalDetails[${index}].selectedExtraBed`}
                        onChange={handleChange}
                        className="mt-3"
                        displayEmpty
                        value={
                          getFieldProps(`roomFinalDetails[${index}].selectedExtraBed`).value ||
                          "Extra Bed- None"
                        }
                      >
                        <MenuItem value="Extra Bed- None">Extra Bed- None</MenuItem>
                        {initialValues.extraBed &&
                          _.range(1, p.noOfExtraBeds + 1).map((no, ind) => (
                            <MenuItem value={no} key={ind.toString()}>
                              {no}
                            </MenuItem>
                          ))}
                      </MUISelect>
                      <div className="col-span-6 sm:col-span-3">
                        <p style={{marginTop: "30px"}}>{p.pricePerExtraBed} Rs per Extra Bed</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </FieldArray>
        </div>
      );
    case 2:
      return (
        <div className="third-form">
          <div className="first-row">
            <h3 className="dropzone-heading">Upload Adhaar card</h3>
            <DropzoneArea
              onChange={data => handleImageChange(data, setFieldValue)}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={true}
              maxFileSize={60000000}
              filesLimit={1}
            />
            {getIn(errors, `identityProof`) && getFieldMeta("identityProof").touched && (
              <div style={{color: "red"}}>{getIn(errors, "identityProof")}</div>
            )}
          </div>
          <p style={{fontSize: "30px", textAlign: "center"}}>Or</p>
          <div className="second-row space-right" style={{margin: "auto", width: "50%"}}>
            <h3 className="camera-heading">Take a Snap</h3>
            <Camera setFieldValue={setFieldValue} setPrev={setPrev} />
          </div>
          {prev ? <img style={{margin: "auto", width: "50%"}} src={prev} /> : null}
        </div>
      );
    default:
      return "Unknown stepIndex";
  }
}

function getSteps() {
  return ["Personal Informations", "Room Details", "Verifications"];
}

const Camera = ({setFieldValue, setPrev}) => {
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFieldValue("identityProof", imageSrc);
    setPrev(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        height={720}
        screenshotFormat="image/jpeg"
        width={620}
      />
      <button className="camera-button" type="button" onClick={capture}>
        Capture photo
      </button>
    </>
  );
};
