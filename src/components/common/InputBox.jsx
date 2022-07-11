import React from "react";
import Error from "./../forms/Error";
import {ErrorMessage} from "formik";

function InputBox({label, type, placeholder, handleChange, handleBlur, values, name, multiline}) {
  return (
    <div>
      {label && (
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <input
        onBlur={handleBlur}
        className="border-1 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[name]}
        autoComplete="off"
        multiline={multiline}
      />
      <ErrorMessage name={name} component={Error} />
    </div>
  );
}

export default InputBox;
