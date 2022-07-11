import React, {useEffect} from "react";
import PropertySelectBox from "./../common/PropertySelectBox";
import SaveAsDraftButton from "./SaveAsDraftButton";
import {useFormikContext} from "formik";

function Step4({saveAsDraft}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {values} = useFormikContext();

  let time;
  let check_in_out = [];
  for (let i = 0; i < 12; i++) {
    time = `${i < 10 ? "0" : ""}${i} : 00   AM`;
    check_in_out.push(time);
    time = `${i < 10 ? "0" : ""}${i} : 30   AM`;
    check_in_out.push(time);
  }

  time = `12 : 00   PM`;
  check_in_out.push(time);
  time = `12 : 30   PM`;
  check_in_out.push(time);

  for (let i = 1; i < 12; i++) {
    time = `${i < 10 ? "0" : ""}${i} : 00   PM`;
    check_in_out.push(time);
    time = `${i < 10 ? "0" : ""}${i} : 30   PM`;
    check_in_out.push(time);
  }

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
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-3 sm:col-span-3">
                    <PropertySelectBox
                      label="Check-in"
                      name="checkInStart"
                      options={check_in_out}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <PropertySelectBox label="Check-in" name="checkInEnd" options={check_in_out} />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <PropertySelectBox
                      label="Check-out"
                      name="checkOutStart"
                      options={check_in_out}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <PropertySelectBox
                      label="Check-out"
                      name="checkOutEnd"
                      options={check_in_out}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <PropertySelectBox
                      label="Do you allow pets?"
                      name="allowPets"
                      options={["No", "Yes"]}
                    />
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

export default Step4;
