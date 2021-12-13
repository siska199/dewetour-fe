/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { RiMapPinFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { FaSpinner } from "react-icons/fa";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const initialForm = {
    name: "",
    email: "",
    message: "",
  };
  const [formValue, setFormValue] = useState(initialForm);

  const handleOnChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await API.post(
        "/send-email",
        JSON.stringify(formValue),
        config
      );
      if (res.status == 200) {
        sweetAlert(false, "success", "Send Message Success");
        setLoading(false);
        setFormValue(initialForm);
      }
      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };
  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: msg,
      showConfirmButton: show,
      timer: 1500,
    });
  };

  return (
    <div style={{ marginTop: "-100px" }} className="bg-light">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F1F1F1"
          fillOpacity="1"
          d="M0,128L40,144C80,160,160,192,240,213.3C320,235,400,245,480,229.3C560,213,640,171,720,176C800,181,880,235,960,240C1040,245,1120,203,1200,181.3C1280,160,1360,160,1400,160L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>{" "}
      <div className="container pb-5">
        <div className="fill-contact-us">
          <div className="row text-center justify-content-center">
            <span className="main-title">Contact Us</span>
            <Col xl={10} md={10} sm={12} xs={12} style={{ marginTop: "-40px" }}>
              <span className="p-info-contact-us">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever.
              </span>
            </Col>
          </div>

          <div className="row justify-content-center mt-4 ">
            <Col
              className="ps-5 ps-lg-1 ps-md-1 mt-lg-5 mt-md-5 mt-sm-1 mt-1"
              xl={{ span: 4 }}
              md={4}
              sm={12}
              xs={12}
            >
              <div className="mb-3 row">
                <Col
                  xl={2}
                  md={2}
                  sm={2}
                  xs={2}
                  className="d-flex align-items-center"
                >
                  <span className="bg-icon-footer bg-warning">
                    <RiMapPinFill size="30px" />
                  </span>
                </Col>
                <Col
                  xl={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className="ps-lg-4 ps-md-4 ps-sm-2 ps-4"
                >
                  <span className="title-icon-footer">Address</span> <br />
                  <span className="p-icon-footer">
                    Jl. Gunung Kawi RT 01 RW 05, Kec. Besuki Kab. Situbondo
                  </span>
                </Col>
              </div>

              <div className="mb-3 row ">
                <Col
                  xl={2}
                  md={2}
                  sm={2}
                  xs={2}
                  className="d-flex align-items-center"
                >
                  <span className="bg-icon-footer bg-warning">
                    <FaPhoneAlt size="30px" />
                  </span>
                </Col>
                <Col
                  xl={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className="ps-lg-4 ps-md-4 ps-sm-2 ps-4"
                >
                  <span className="title-icon-footer">Phone</span> <br />
                  <span className="p-icon-footer">507-475-60045-6024</span>
                </Col>
              </div>

              <div className="mb-3 row">
                <Col
                  xl={2}
                  md={2}
                  sm={2}
                  xs={2}
                  className="d-flex align-items-center"
                >
                  <span className="bg-icon-footer bg-warning">
                    <MdEmail size="30px" />
                  </span>
                </Col>
                <Col
                  xl={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className="ps-lg-4 ps-md-4 ps-sm-2 ps-4"
                >
                  <span className="title-icon-footer">Email</span> <br />
                  <span className="p-icon-footer">dewetour199@gmail.com</span>
                </Col>
              </div>
            </Col>

            <Col
              className="d-flex justify-content-center align-items-center py-3"
              xl={{ span: 4 }}
              md={6}
              sm={12}
              xs={12}
            >
              <form autoComplete="off" onSubmit={sendMessage}>
                <div className="mb-2">
                  <label className="title-icon-footer">Full Name</label> <br />
                  <input
                    required
                    onChange={handleOnChange}
                    value={formValue.name}
                    type="text"
                    name="name"
                    className="inp-contact-us"
                  />
                </div>

                <div className="mb-2">
                  <label className="title-icon-footer">Email</label> <br />
                  <input
                    required
                    onChange={handleOnChange}
                    value={formValue.email}
                    name="email"
                    type="email"
                    className="inp-contact-us"
                  />
                </div>
                <div className="mb-2">
                  <label className="title-icon-footer">Message</label> <br />
                  <textarea
                    required
                    onChange={handleOnChange}
                    value={formValue.message}
                    name="message"
                    className="inp-contact-us "
                  ></textarea>
                </div>
                <div className="mb-2">
                  <button
                    style={{
                      borderRadius: "10px",
                      color: "white",
                      fontWeight: "500",
                    }}
                    className="btn btn-warning btn-email"
                  >
                    Send Message &nbsp;&nbsp;
                    {loading ? (
                      <FaSpinner icon="spinner" className="spinner" />
                    ) : (
                      <IoSend />
                    )}
                  </button>
                </div>
              </form>
            </Col>
          </div>
        </div>
      </div>
      <div className="wave-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 310">
          <path
            fill="#F1F1F1"
            fillOpacity="1"
            d="M0,128L40,144C80,160,160,192,240,213.3C320,235,400,245,480,229.3C560,213,640,171,720,176C800,181,880,235,960,240C1040,245,1120,203,1200,181.3C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
