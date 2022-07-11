import React, {useState, useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {getLinkReview, addLinkReview} from "../../api/guest";
import {displayNotification} from "./../../services/notificationService";

const reviewSchema = Yup.object().shape({
  review: Yup.string().min(2).max(100000).required(),
  rating: Yup.number().required().oneOf([1, 2, 3, 4, 5]),
});

function LinkReview({match}) {
  const [initialValues, setInitialValues] = useState({review: "", rating: 0});
  const [fetchedDB, setFetchedDB] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  const handleSubmit = async (values, resetForm) => {
    const {data, status} = await addLinkReview(match?.params?.id, values);
    if (status !== 200) return displayNotification("error", data);
    displayNotification("info", "Review Successfully Added");
    resetForm({values: {review: "", rating: 0}});
    setRatingValue(0);
  };

  const setValues = getFieldProps => {
    const {value: ratingValue} = getFieldProps("rating");
    if (ratingValue) setRatingValue(ratingValue);
  };

  const getReview = async () => {
    const {data, status} = await getLinkReview(match?.params?.id);
    setFetchedDB(true);
    if (status !== 200) {
        displayNotification("error", data)
        return window.location ="/"
    };
    if(data) setInitialValues(data);
  };

  useEffect(() => {
    getReview();
  }, []);

  if (!fetchedDB) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reviewSchema}
      onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}
      enableReinitialize
    >
      {({isValid, setFieldValue, getFieldProps}) => (
        <div
          style={{marginLeft: "7.75vw", width: "85%"}}
          className="md:grid md:grid-cols-1 md:gap-6"
        >
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0" />
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <Form style={{margin: "auto", width: "85%"}}>
                      <div className="relative w-full mb-3" style={{marginTop: "120px"}}>
                        <div style={{display: "flex"}}>
                          <h2 style={{marginRight: "60px", paddingTop: "7px"}}>Review</h2>
                          <ReactStars
                            count={5}
                            onChange={rating => setFieldValue("rating", rating)}
                            size={35}
                            isHalf={false}
                            edit={true}
                            key={ratingValue}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                            half={setValues(getFieldProps)}
                            value={Number(ratingValue) || 0}
                          />
                        </div>
                        <textarea
                          style={{width: "40rem", height: "200px"}}
                          name="review"
                          onChange={e => setFieldValue("review", e.target.value)}
                          row="5"
                          col="90"
                          value={getFieldProps("review").value}
                        ></textarea>
                      </div>
                      <button
                        disabled={!isValid}
                        style={{marginBottom: "200px"}}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit Review
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default LinkReview;
