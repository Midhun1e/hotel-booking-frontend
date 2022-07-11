import React, {useState, useEffect} from "react";
import ReactLoading from "react-loading";
import SearchResultComponent from "../searchPageComponent/SearchResultComponent";
import {getAdminHotels} from "../../api/admin";

function AdminHotels() {
  const [hotels, setHotels] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getHotels() {
    const {data} = await getAdminHotels();
    setHotels(data.hotels);
    setIsLoading(false);
  }

  useEffect(() => {
    getHotels();
  }, []);

  if (isLoading) {
    return (
      <center>
        <ReactLoading type={"bars"} color={"#F39636"} height={"10%"} width={"50%"} />
      </center>
    );
  }

  return (
    <div>
      <SearchResultComponent user="admin" hotels={hotels} />
    </div>
  );
}

export default AdminHotels;
