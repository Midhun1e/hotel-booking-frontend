import React, {useState, useEffect} from "react";
import MUITextField from "@material-ui/core/TextField";
import _ from "lodash";
import * as Yup from "yup";
import {FieldArray, Form, Formik, getIn} from "formik";
import {displayNotification} from "./../../services/notificationService";
import {addFoodItemstoBill} from "./../../api/restaurant";
import {getFoodItems} from "../../api/restaurant";
import {Button} from "@material-ui/core";

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      itemName: Yup.string().min(1).max(50).required().label("Item Name"),
      itemQuantity: Yup.number()
        .typeError("Must be a Number")
        .positive()
        .min(1)
        .max(1000000)
        .nullable()
        .label("Item Price"),
    })
  ),
});

const AddItemsToBill = ({match}) => {
  const {bookingId} = match.params;
  const [initialValues, setInitialValues] = useState({});

  const handleSubmit = async values => {
    values["bookingId"] = bookingId;
    await addFoodItemstoBill(values);
    displayNotification("info", "Successfully Added to bill");
    setTimeout(() => {
      window.location = "/restaurant/dashboard";
    }, 1000);
  };

  const getFoodItemsList = async () => {
    const {data, status} = await getFoodItems();
    if (status !== 200) return displayNotification("error", "Something went wrong");
    if (!data.items[0]) {
      setInitialValues({items: [{itemName: "", itemQuantity: ""}]});
      return displayNotification("info", "There is no food items. Please add any");
    }
    setInitialValues(data);
  };

  useEffect(() => {
    getFoodItemsList();
  }, []);

  if (_.isEmpty(initialValues)) return null;

  return (
    <div style={{margin: "auto", width: "85%"}}>
      <div style={{textAlign: "center", marginTop: "75px"}}>
        <h1>Add Items to Bill</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
          validationSchema={validationSchema}
        >
          {({values, errors, getFieldProps, getFieldMeta, handleChange, handleBlur}) => (
            <Form>
              <FieldArray name="items">
                {({}) => (
                  <div>
                    {values.items.map((p, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "flex-end",
                          }}
                          key={p.id}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "flex-end",
                            }}
                          >
                            <MUITextField
                              name={`items[${index}].itemName`}
                              label="Item Name"
                              disabled
                              className="mt-14"
                              onChange={handleChange}
                              value={getFieldProps(`items[${index}].itemName`).value}
                              onBlur={handleBlur}
                            />
                            {getIn(errors, `items[${index}].itemName`) &&
                              getFieldMeta(`items[${index}].itemName`).touched && (
                                <div style={{color: "red"}}>
                                  {getIn(errors, `items[${index}].itemName`)}
                                </div>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "flex-end",
                            }}
                          >
                            <MUITextField
                              name={`items[${index}].itemQuantity`}
                              label="Item Quantity"
                              className="mt-14"
                              onChange={handleChange}
                              value={getFieldProps(`items[${index}].itemQuantity`).value}
                              onBlur={handleBlur}
                            />
                            {getIn(errors, `items[${index}].itemQuantity`) &&
                              getFieldMeta(`items[${index}].itemQuantity`).touched && (
                                <div style={{color: "red"}}>
                                  {getIn(errors, `items[${index}].itemQuantity`)}
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
              <div>
                <Button className="mt-3" variant="contained" color="primary" type="submit">
                  add to bill
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddItemsToBill;
