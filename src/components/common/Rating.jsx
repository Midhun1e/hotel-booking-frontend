import React from "react";

const Rating = ({value}) => {
  return (
    <ul style={{display: "flex"}}>
      <li>
        <i
          className={
            value >= 1 ? "fa fa-star" : value >= 0.5 ? "fa fa-star-half-empty" : "fa fa-star-o"
          }
        ></i>
      </li>
      <li>
        <i
          className={
            value >= 2 ? "fa fa-star" : value >= 1.5 ? "fa fa-star-half-empty" : "fa fa-star-o"
          }
        ></i>
      </li>
      <li>
        <i
          className={
            value >= 3 ? "fa fa-star" : value >= 2.5 ? "fa fa-star-half-empty" : "fa fa-star-o"
          }
        ></i>
      </li>
      <li>
        <i
          className={
            value >= 4 ? "fa fa-star" : value >= 3.5 ? "fa fa-star-half-empty" : "fa fa-star-o"
          }
        ></i>
      </li>
      <li>
        <i
          className={
            value >= 5 ? "fa fa-star" : value >= 4.5 ? "fa fa-star-half-empty" : "fa fa-star-o"
          }
        ></i>
      </li>
    </ul>
  );
};

export default Rating;
