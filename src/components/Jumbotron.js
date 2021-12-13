import React from "react";

export default function Jumbotron({ search, handelOnchange, value }) {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container mt-5 text-light ">
        <div className="row j-title mb-lg-5 ">
          <span className="h">Explore</span>
          <span className="p">your amazing city together</span>
        </div>
        <div className="row j-search">
          <p style={{ fontSize: "18px" }} className="">
            Find great places to holliday
          </p>
          <div className="input-group mb-3">
            <input
              onChange={handelOnchange}
              value={value}
              type="text"
              className="form-control shadow-none"
            />
            <span
              onClick={() => search()}
              style={{ fontSize: "18px", color: "white" }}
              className="input-group-text btn btn-warning px-5"
              id="basic-addon2"
            >
              Search
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
