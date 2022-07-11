import React from "react";
import Error from "../forms/Error";
import {useFormikContext, ErrorMessage} from "formik";

function PropertySelectBox({label, name, options, disabled}) {
  const {values, handleChange} = useFormikContext();

  return (
    <React.Fragment>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select
        disabled={disabled}
        style={{cursor: "pointer"}}
        name={name}
        value={values[name]}
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {name == "placeForSearch" && (
          <option key="" value="" selected>
            Select a Place
          </option>
        )}
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ErrorMessage name={name} component={Error} />
    </React.Fragment>
  );
}

export default PropertySelectBox;
