import React, {useEffect} from "react";
import SaveAsDraftButton from "./SaveAsDraftButton";
import PropertySelectBox from "./../common/PropertySelectBox";
import PropertyInputBox from "./../common/PropertyInputBox";
import FormCheckBox from "./../common/FormCheckBox";
import {useFormikContext} from "formik";

function Step2({saveAsDraft}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {values, getFieldProps, setFieldValue} = useFormikContext();

  let {value, name} = getFieldProps("facilities");
  let {value: extraBed} = getFieldProps("extraBed");

  let checkBoxModified = feature => {
    if (value.includes(feature)) value = value.filter(val => feature !== val);
    else value.push(feature);
    setFieldValue(name, value);
  };

  let leftFeature = [
    "Free Wifi",
    "Garden",
    "Water park",
    "Spa and wellness centre",
    "Terrace",
    "Fitness centre",
  ];
  let rightFeature = ["Children's Park", "Room service", "Bar", "Hot tub/jacuzzi", "Swimming pool"];

  return (
    <div style={{marginLeft: "7.75vw", width: "85%"}} className="md:grid md:grid-cols-1 md:gap-6">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0"></div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <PropertySelectBox label="Parking" name="parking" options={["No", "Yes"]} />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <PropertySelectBox
                      label="Restaurant"
                      name="restaurant"
                      options={["No", "Yes"]}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <PropertySelectBox label="Extra Bed" name="extraBed" options={["Yes", "No"]} />
                  </div>
                  {extraBed === "Yes" ? (
                    <div className="col-span-6 sm:col-span-3">
                      <PropertySelectBox
                        label="No. of extra beds"
                        name="noOfExtraBeds"
                        options={[1, 2, 3, 4]}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {extraBed === "Yes" ? (
                    <div className="col-span-6 sm:col-span-3">
                      <PropertyInputBox
                        label="Price Per Extra Bed"
                        name="pricePerExtraBed"
                        type="text"
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="hotelName" className="text-sm font-medium text-gray-700">
                      Features and Facilities
                    </label>
                    <div
                      style={{marginTop: "-70px", width: "100%"}}
                      className="md:grid md:grid-cols-1 md:gap-6"
                    >
                      <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-1 md:gap-6">
                          <div className="md:col-span-1">
                            <div className="px-4 sm:px-0"></div>
                          </div>
                          <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="shadow overflow-hidden sm:rounded-md">
                              <div className="px-2 py-3 bg-white sm:p-6">
                                <div className="bigholder">
                                  <div className="holder">
                                    {leftFeature.map(feature => (
                                      <FormCheckBox
                                        key={feature}
                                        defaultChecked={value.includes(feature)}
                                        label={feature}
                                        onChange={() => checkBoxModified(feature)}
                                      />
                                    ))}
                                  </div>
                                  <div className="holder">
                                    {rightFeature.map(feature => (
                                      <FormCheckBox
                                        key={feature}
                                        defaultChecked={value.includes(feature)}
                                        label={feature}
                                        onChange={() => checkBoxModified(feature)}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SaveAsDraftButton values={values} saveAsDraft={saveAsDraft} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
