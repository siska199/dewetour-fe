/* eslint-disable eqeqeq */
import React from "react";
import empty from "../assets/empty.png";

export default function Empty({ header }) {
  return (
    <div>
      {header == "Incoming Transaction" ? (
        <div
          style={{ marginTop: "-50px" }}
          className="c-payment container text-center"
        >
          <img
            style={{ marginTop: "10px" }}
            className="img-fluid"
            src={empty}
            alt=""
          />
        </div>
      ) : (
        <>
          {header === "History Trip" ? (
            <div
              style={{ marginTop: "100px" }}
              className="c-payment container text-center"
            >
              {header && (
                <p style={{ fontWeight: "900", fontSize: "50px" }} className="">
                  {header}
                </p>
              )}
              <img
                style={{ marginTop: "-10px" }}
                className="img-fluid"
                src={empty}
                alt=""
              />
            </div>
          ) : (
            <div
              style={{ marginTop: "-75px" }}
              className="c-payment container text-center"
            >
              {header && <p className="main-title">{header}</p>}
              <img
                style={{
                  marginTop: `${header === "Payment Trip" ? "-50px" : "30px"}`,
                }}
                className="img-fluid"
                src={empty}
                alt=""
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
