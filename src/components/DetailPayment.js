/* eslint-disable eqeqeq */
import React, { useRef, useState } from "react";
import { Col } from "react-bootstrap";
import Icon from "../assets/Icon.png";
import moment from "moment";
import toRupiah from "@develoka/angka-rupiah-js";
import QRCode from "react-qr-code";
import { Modal } from "react-bootstrap";

const style = {
  underText: {
    fontSize: "17px",
    fontWeight: "800",
    color: "black",
  },
  border: {
    border: "solid 5px black",
  },
  h: {
    fontWeight: "900",
    fontSize: "40px",
  },
  upImage: {
    width: "200px",
    height: "200px",
  },
};
export default function DetailPayment({
  id,
  user,
  admin,
  imagePreview,
  handleImage,
  data,
  border,
  header,
  botton,
  marginTop,
  handelApprove,
  handelRejected,
}) {
  return (
    <div>
      <div
        style={marginTop ? { marginTop: "40px" } : {}}
        className={`container ${botton ? " " : "c-payment"}`}
      >
        {header && (
          <p className="mb-lg-5 mb-md-5 mb-sm-5 ms-2" style={style.h}>
            {header}
          </p>
        )}
        <div
          className={`container ${
            botton ? " " : "container border shadow bg-light"
          }`}
        >
          <div className="row pb-2 pt-3 px-1 px-sm-4 px-md-4 px-lg-4">
            <LeftDetail data={data} />
            <RightDetail
              user={user}
              admin={admin}
              id={id}
              imagePreview={imagePreview}
              handleImage={handleImage}
              data={data}
              border={border}
            />
          </div>
          <div className="row">
            <Table data={data} />
          </div>
          {botton && (
            <div className="row pb-3 px-4 text-end">
              <div className="">
                <button
                  onClick={() => handelRejected(data.id)}
                  style={{ width: "100px" }}
                  className="btn btn-danger me-3"
                >
                  Cancel
                </button>
                {data.status != "Approve" && (
                  <button
                    onClick={() => handelApprove(data.id)}
                    style={{ width: "100px" }}
                    className="btn btn-success"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LeftDetail({ data }) {
  return (
    <Col xl={8} md={12} sm={12} xm={12}>
      <img src={Icon} alt="" />
      <div className="row mt-4">
        <Col xl={6} md={6} sm={6} xs={6}>
          <span className="pay-h1" style={{ fontWeight: "900" }}>
            {data.trip.title}
          </span>{" "}
          <br />
          <span className="pay-p">{data.trip.country.name}</span>
        </Col>

        <Col xl={3} md={3} sm={3} xs={6}>
          <span className="pay-h2">Date Trip</span> <br />
          <span className="pay-p">
            {moment(data.trip.dateTrip).utc().format("LL")}
          </span>
        </Col>
        <Col
          xl={{ offset: 0, span: 3 }}
          md={{ offset: 0, span: 3 }}
          sm={{ offset: 0, span: 3 }}
          xs={{ offset: 6, span: 3 }}
        >
          <span className="pay-h2">Duration</span> <br />
          <span className="pay-p">
            {data.trip.day} Day {data.trip.night} Night
          </span>
        </Col>
      </div>

      <div className="row">
        <Col className="mt-3" xl={{ span: 6 }} md={6} sm={6} xs={6}>
          <ConditionPayment
            text={data.status}
            color={(() => {
              switch (data.status) {
                case "Waiting Payment":
                  return "alert-danger";
                case "Payment Rejected":
                  return "alert-danger";
                case "Waiting Approve":
                  return "alert-warning";
                case "Approve":
                  return "alert-success";
                default:
                  return "";
              }
            })()}
          />
        </Col>
        <Col xl={{ span: 3 }} md={{ span: 3 }} sm={3} xs={3}>
          <span className="pay-h2">Accomodation</span> <br />
          <span className="pay-p">{data.trip.accomodation}</span>
        </Col>
        <Col
          xl={{ offset: 0, span: 3 }}
          md={{ offset: 0, span: 3 }}
          sm={{ offset: 0, span: 3 }}
          xs={{ offset: 6, span: 3 }}
        >
          <span className="pay-h2">Transporartion</span> <br />
          <span className="pay-p">{data.trip.transportation}</span>
        </Col>
      </div>
    </Col>
  );
}

function RightDetail({
  handleImage,
  id,
  imagePreview,
  border,
  data,
  user,
  admin,
}) {
  const target = useRef(null);

  const [show, setShow] = useState(false); //Handel modal Image:
  const [imgModal, setImgModal] = useState();
  const handelShowModal = () => {
    setShow(true);
  };
  const handelOnHide = () => {
    setShow(false);
  };

  const handelModalImage = (img) => {
    if (admin) {
      handelShowModal();
      setImgModal(img);
    }
  };
  return (
    <Col
      className="text-start text-lg-center text-md-start text-sm-start"
      xl={{ offset: 1, span: 3 }}
      md={{ span: 6 }}
      sm={6}
      xs={6}
    >
      <p style={{ fontWeight: "800", fontSize: "36px", marginBottom: "2px" }}>
        Booking
      </p>
      <p style={{ color: "#878787" }}>
        <span className="pay-h2">
          {moment(data.updatedAt).utc().format("dddd")}&nbsp;
        </span>
        <span>{moment(data.updatedAt).utc().format("ll")}</span>
      </p>
      {(() => {
        switch (data.status) {
          case "Waiting Payment":
            return (
              <>
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => target.current.click()}
                  src={imagePreview}
                  alt=""
                  className="mb-2 img-fluid"
                />
                <input
                  hidden
                  type="file"
                  ref={target}
                  accept="image/*"
                  onChange={handleImage(id)}
                />
                <p className="mt-2 pay-p">Upload payment proof here</p>
              </>
            );
          case "Waiting Approve":
            return (
              <img
                onClick={() => handelModalImage(data.attachment)}
                style={border && style.border}
                className={`mb-2 img-fluid ${admin ? "img-prove" : ""} `}
                src={data.attachment}
                alt=""
              />
            );
          case "Approve" || "Payment Rejected":
            return (
              <>
                {user ? (
                  <div className="mb-2 img-fluid">
                    <QRCode
                      value={JSON.stringify(data.attachment)}
                      size={170}
                    />
                  </div>
                ) : (
                  <img
                    onClick={() => handelModalImage(data.attachment)}
                    className={`mb-2 img-fluid ${admin ? "img-prove" : ""} `}
                    src={data.attachment}
                    alt=""
                  />
                )}
              </>
            );
          case "Payment Rejected":
            return (
              <img
                onClick={() => handelModalImage(data.attachment)}
                className={`mb-2 img-fluid ${admin ? "img-prove" : ""} `}
                src={data.attachment}
                alt=""
              />
            );
          default:
            return "";
        }
      })()}
      <Modal
        className="d-flex align-items-center justify-content-center"
        size="lg"
        show={show}
        onHide={handelOnHide}
      >
        <img src={imgModal} className={`img-fluid`} alt="" />
      </Modal>
    </Col>
  );
}

function ConditionPayment({ text, color }) {
  return (
    <div
      styel={{ fontWeight: "500" }}
      className={"al-pay alert " + color + " text-center"}
      role="alert"
    >
      {text}
    </div>
  );
}
function Table({ data }) {
  return (
    <>
      <div
        style={{ fontSize: "17px", fontWeight: "800" }}
        className="row mx-1 mb-2 px-1 px-lg-4 px-md-4 px-sm-4"
      >
        <Col className="" xl={1} md={1} sm={1} xs={1}>
          No
        </Col>
        <Col xl={3} md={3} sm={3} xs={5}>
          Full Name
        </Col>
        <Col xl={2} md={2} sm={3} xs={3}>
          Gender
        </Col>
        <Col xl={2} md={2} sm={3} xs={3}>
          Phone
        </Col>
      </div>
      <hr />
      <div
        className="row mx-1 mb-2 px-1 px-lg-4 px-md-4 px-sm-4"
        style={{ fontSize: "17px", color: "#B1B1B1" }}
      >
        <Col xl={1} md={1} sm={1} xs={1}>
          1
        </Col>
        <Col xl={3} md={3} sm={3} xs={3}>
          {data.user.fullName}
        </Col>
        <Col xl={2} md={2} sm={3} xs={3}>
          {data.user.gender}
        </Col>
        <Col xl={2} md={2} sm={3} xs={3}>
          {data.user.phone}
        </Col>
        <Col
          className="ps-5 text-lg-start text-md-start text-end"
          style={style.underText}
          xl={3}
          md={3}
          sm={12}
          xs={12}
        >
          Qty : {data.counterQty}
        </Col>
      </div>
      <hr />
      <div className="row mx-1 px-1 px-lg-4 px-md-4 px-sm-4 mb-3">
        <Col
          className="ps-5 text-lg-start text-md-start text-end"
          style={style.underText}
          xl={{ offset: 8, span: 4 }}
          md={{ offset: 8, span: 5 }}
          sm={{ offset: 7, span: 5 }}
          xs={12}
        >
          Total :{" "}
          <span style={{ color: "#FF0000" }}>
            {toRupiah(String(data.total), {
              formal: false,
              symbol: "IDR",
              floatingPoint: 0,
              dot: ",",
            })}
          </span>
        </Col>
      </div>
    </>
  );
}
