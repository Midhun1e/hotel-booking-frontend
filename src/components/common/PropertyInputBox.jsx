import React from "react";
import Error from "./../forms/Error";
import {ErrorMessage} from "formik";
import {useFormikContext} from "formik";

function PropertyInputBox({label, type = "text", name, ...other}) {
  const {values, handleChange, handleBlur} = useFormikContext();

  return (
    <div>
      {label && (
        <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        onBlur={handleBlur}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        type={type}
        name={name}
        onChange={handleChange}
        value={values[name]}
        autoComplete="off"
        {...other}
      />
      <ErrorMessage name={name} component={Error} />
    </div>
  );
}

export default PropertyInputBox;
