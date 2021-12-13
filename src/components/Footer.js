import React from "react";
import leaf from "../assets/leaf.png";
export default function Footer({ marginTop }) {
  return (
    <div className="footer">
      <img src={leaf} className="leaf-img" alt="" />
      <div
        style={{
          marginTop: marginTop ? `${marginTop}` : "110px",
          height: "54px",
          backgroundColor: "#FFAF00",
          fontSize: "18px",
          color: "#FFFFFF",
        }}
        className="container-fluid text-center"
      >
        <p className="pt-sm-3">
          Copyright @ 2020 Dewe Tour - Your Name - NIS. All Rights reserved
        </p>
      </div>
    </div>
  );
}
