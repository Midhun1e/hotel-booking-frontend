import React from "react";
import ReactLoading from "react-loading";

function Loader() {
  return (
    <center>
      <div className="center-loader">
        <ReactLoading type={"spinningBubbles"} color={`#1F9A60`} height={"8%"} width={"8%"} />
      </div>
    </center>
  );
}

export default Loader;
