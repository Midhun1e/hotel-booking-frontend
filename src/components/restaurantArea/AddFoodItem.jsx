import React, {useState, useEffect} from "react";
import MUITextField from "@material-ui/core/TextField";
import _ from "lodash";
import * as Yup from "yup";
import {Field, FieldArray, FieldProps, Form, Formik, getIn} from "formik";
import {displayNotification} from "./../../services/notificationService";
import {Button, TextField} from "@material-ui/core";
import {saveFoodItems} from "./../../api/restaurant";
import {getFoodItems} from "../../api/restaurant";

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      itemName: Yup.string().min(1).max(50).required().label("Item Name"),
      itemPrice: Yup.number()
        .typeError("Must be a Number")
        .positive()
        .min(1)
        .max(1000000)
        .required()
        .label("Item Price"),
    })
  ),
});

const handleSubmit = async (values, setFieldError) => {
  await saveFoodItems(values);
  displayNotification("info", "Successfully Saved");
};

const AddFoodItem = () => {
  const [initialValues, setInitialValues] = useState({});

  const getFoodItemsList = async () => {
    const {data, status} = await getFoodItems();
    if (status !== 200) return displayNotification("error", "Something went wrong");
    if (!data.items[0]) {
      setInitialValues({items: [{itemName: "", itemPrice: ""}]});
      return displayNotification("info", "There is no food items. Please add any");
    }
    setInitialValues(data);
  };

  useEffect(() => {
    getFoodItemsList();
  }, []);

  if (_.isEmpty(initialValues)) return null;

  return (
    <div className="dashboard-items">
      <div style={{textAlign: "center", marginTop: "75px"}}>
        <h1>Add Food items</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
          validationSchema={validationSchema}
        >
          {({values, errors, isValid, getFieldProps, getFieldMeta, handleChange, handleBlur}) => (
            <Form>
              <FieldArray name="items">
                {({push, remove}) => (
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
                              name={`items[${index}].itemPrice`}
                              label="Item Price"
                              className="mt-14"
                              onChange={handleChange}
                              value={getFieldProps(`items[${index}].itemPrice`).value}
                              onBlur={handleBlur}
                            />
                            {getIn(errors, `items[${index}].itemPrice`) &&
                              getFieldMeta(`items[${index}].itemPrice`).touched && (
                                <div style={{color: "red"}}>
                                  {getIn(errors, `items[${index}].itemPrice`)}
                                </div>
                              )}
                          </div>
                          <div className="btn btn-danger" onClick={() => remove(index)}>
                            Delete
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      type="button"
                      className="mt-3"
                      variant="contained"
                      onClick={() => {
                        if (!isValid) return;
                        push({itemName: "", itemPrice: ""});
                      }}
                    >
                      Add New Item
                    </Button>
                  </div>
                )}
              </FieldArray>
              <div>
                <Button className="mt-3" variant="contained" color="primary" type="submit">
                  Save all items
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddFoodItem;
