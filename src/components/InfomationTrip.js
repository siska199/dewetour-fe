import React from "react";
import moment from "moment";
import { RiHotelLine } from "react-icons/ri";
import { IoAirplaneOutline, IoFastFoodOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { BsClock } from "react-icons/bs";

export default function InfomationTrip({ data }) {
  const style = {
    head: {
      fontWeight: "900",
      fontSize: "20px",
    },
  };
  return (
    <div className="container">
      <div className="row mx-md-5 mx-sm-5 mx-1 mt-5">
        <p style={style.head}>Information Trip</p>
      </div>

      <div className="mx-md-5 mx-sm-5 mx-1  px-2 c-information ">
        <div className="d-info">
          <span>Accommodation</span>
          <div className="i-info">
            <RiHotelLine size="25px" /> {String(data.accomodation)}
          </div>
        </div>
        <div className="d-info">
          <span>Transportation</span>
          <div className="i-info">
            <IoAirplaneOutline size="25px" /> {String(data.transportation)}
          </div>
        </div>
        <div className="d-info">
          <span>Eat</span>
          <div className="i-info">
            <IoFastFoodOutline size="25px" /> {String(data.eat)}
          </div>
        </div>
        <div className="d-info">
          <span>Duration</span>
          <div className="i-info">
            <BsClock size="23px" /> {String(data.day)} Day {String(data.night)}{" "}
            Night
          </div>
        </div>
        <div className="d-info">
          <span>Date Trip</span>
          <div className="i-info">
            <MdDateRange size="25px" />{" "}
            {String(moment(data.dateTrip).utc().format("LL"))}
          </div>
        </div>
      </div>

      <div className="row mx-md-5 mx-sm-5 mx-1  mt-5">
        <p style={style.head}>Description</p>
        <p
          style={{
            fontWeight: "900",
            fontSize: "14px",
            textAlign: "justify",
            color: "#A8A8A8",
          }}
        >
          {String(data.description)}
        </p>
      </div>
    </div>
  );
}
