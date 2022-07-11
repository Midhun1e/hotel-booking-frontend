import React from "react";

function FormCheckBox({label, onChange, defaultChecked, ...others}) {
  return (
    <span style={{marginLeft: "2.3vw", marginRight: "6.4vw", marginBottom: "8px"}}>
      <input
        style={{cursor: "pointer"}}
        className="form-check-input"
        type="checkbox"
        onChange={onChange}
        id={label}
        defaultChecked={defaultChecked}
        {...others}
      />
      <label style={{cursor: "pointer"}} htmlFor={label} className="form-check-label">
        {label}
      </label>
    </span>
  );
}

export default FormCheckBox;
