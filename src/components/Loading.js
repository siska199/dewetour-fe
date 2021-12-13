import React from "react";
import ReactLoading from "react-loader-spinner";

export default function PageNotFound({ type }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "75vh" }}
    >
      <ReactLoading type={type} color={"#FFAF00"} height={50} width={50} />
    </div>
  );
}
