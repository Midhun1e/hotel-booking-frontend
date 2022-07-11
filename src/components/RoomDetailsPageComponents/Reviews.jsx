import React, {useEffect, useState} from "react";
import {getReviews} from "../../api/guest";
import ReactStars from "react-rating-stars-component";
import _ from "lodash";

function Reviews({hotelId}) {
  const [reviews, setReviews] = useState();

  const getHotelReviews = async () => {
    const {data, status} = await getReviews(hotelId);
    if (status !== 200) return setReviews(null);
    setReviews(data);
  };

  useEffect(() => {
    getHotelReviews();
  }, []);

  if (!reviews) return null;

  return (
    <div style={{backgroundColor: "#F4F4F4"}}>
      <h1 style={{textAlign: "center", marginTop: "20px"}}>Reviews</h1>
      <div style={{margin: "auto", width: "85%", padding: "15px 0"}}>
        {reviews.map(review => (
          <div className="card" style={{margin: "10px 0"}}>
            <div className="card-body">
              <div className="row__card">
                <h5
                  className="card-title col__card badge badge-info"
                  style={{marginLeft: "0", fontSize: "18px"}}
                >
                  {_.capitalize(review.name)}
                </h5>
                <h5 className="card-title col__card" style={{fontSize: "18px"}}>
                  <ReactStars count={5} size={24} value={review.rating} activeColor="#ffd700" />
                </h5>
                <h5
                  className="card-title col__card badge badge-secondary"
                  style={{fontSize: "18px"}}
                >
                  Days Stayed: {review.numberOfDays}
                </h5>
                <h5 className="card-title col__card badge badge-success" style={{fontSize: "18px"}}>
                  Reviewed On: {review.reviewedOn}
                </h5>
              </div>
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
