import React, {useEffect, useState} from "react";
import SaveAsDraftButton from "./SaveAsDraftButton";
import ImageUpload from "./ImageUpload";
import Error from "./../forms/Error";
import {useFormikContext, ErrorMessage} from "formik";
import {Delete} from "@material-ui/icons";
import "react-phone-input-2/lib/style.css";

function Step3({saveAsDraft, preview, count}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [prev, setPrev] = useState();
  const [numberOfImages, setNumberOfImages] = useState(0);
  const {getFieldProps, values, setFieldValue} = useFormikContext();
  let {value, name} = getFieldProps("mainPhoto");

  const handleDelete = () => {
    setFieldValue(name, null);
    setPrev(null);
  };

  const loadImage = () => {
    if (JSON.parse(localStorage.getItem("saveAsDraft"))?.photos?.length > 0) {
      setPrev(JSON.parse(localStorage.getItem("coverPhoto")));
      setNumberOfImages(localStorage.getItem("numberOfImages"));
    }
    if (preview) setPrev(preview);
    if (count) setNumberOfImages(count);
  };

  useEffect(() => {
    loadImage();
  }, []);

  let imageToBase64 = images => {
    let imagesBase64 = [];
    for (let image of images) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          let imageBase64 = reader.result;
          imagesBase64.push(imageBase64);
        }
      };
      reader.readAsDataURL(image);
    }
    setFieldValue("photos", imagesBase64);
  };

  let handleImageChange = data => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        let imageBase64 = reader.result;
        setPrev(imageBase64);
        setFieldValue("mainPhoto", imageBase64);
        localStorage.setItem("coverPhoto", JSON.stringify(imageBase64));
      }
    };
    reader.readAsDataURL(data);
  };

  return (
    <div style={{marginLeft: "7.75vw", width: "85%"}} className="md:grid md:grid-cols-1 md:gap-6">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0" />
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <ImageUpload
                  label="Cover photo"
                  text="Upload an image"
                  multiple={false}
                  onChange={event => {
                    let image = event.target.files[0];
                    handleImageChange(image);
                  }}
                />
                <ErrorMessage name="mainPhoto" component={Error} />
              </div>
              {prev && value ? (
                <div>
                  <center>
                    <img className="image" src={prev} alt="hotel" />
                    <button onClick={handleDelete} className="btn btn-danger mt-2" type="button">
                      <span>
                        <Delete /> Delete
                      </span>
                    </button>
                  </center>
                </div>
              ) : (
                <div></div>
              )}
              <div className="px-4 py-5 bg-white sm:p-6">
                <ImageUpload
                  text="Upload multiple images"
                  label="Other photos"
                  multiple={true}
                  onChange={event => {
                    let images = event.target.files;
                    setFieldValue("photos", images);
                    imageToBase64(images);
                    setNumberOfImages(images.length);
                    localStorage.setItem("numberOfImages", images.length);
                  }}
                  numberOfImages={numberOfImages}
                />
              </div>
              <SaveAsDraftButton values={values} saveAsDraft={saveAsDraft} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3;
