import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";
import { FaUserCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { API } from "../config/api";
import InputGroup from "./InputGroup";
import Swal from "sweetalert2";

const style = {
  h: {
    fontWeight: "900",
    fontSize: "36px",
  },
};

export default function PersonalInfo({ renderPage, data }) {
  const [imagePreview, seImagePreview] = useState(data.image);
  const target = useRef(null); //The target is image input form
  const [isEdit, setIsEdit] = useState(false);

  const label = ["Full Name", "Email", "Phone", "Address"];
  const [formValue, setFormValue] = useState({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.files) {
      const file = e.target.files;
      const fileURL = URL.createObjectURL(file[0]);
      seImagePreview(fileURL);
    }
    setFormValue({
      ...formValue,
      [e.target.getAttribute("id")]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  let history = useHistory();
  const handelEditProfile = () => {
    setIsEdit(true);
  };
  const handelSaveProfile = async (e) => {
    try {
      e.preventDefault();
      setIsEdit(false);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      for (const key in formValue) {
        if (formValue[key] !== "") {
          formData.append(String(key), formValue[key]);
        }
      }
      const response = await API.patch("/user", formData, config);
      setIsEdit(false);
      renderPage();
      history.push("/profile");
      if (response.status === 200) {
        sweetAlert(true, "success", "Updated Profile Success");
      }
    } catch (error) {
      sweetAlert(true, "info", `${error.response.data.message}`);
    }
  };
  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: 1500,
      backdrop: show,
    });
  };

  return (
    <div className="px-3 mb-5">
      <div
        style={{ borderRadius: "8px" }}
        className="c-personal py-4 px-4 container border shadow bg-light"
      >
        {isEdit ? (
          <form onSubmit={handelSaveProfile}>
            <div className="row">
              <p className="mb-4" style={style.h}>
                Personal info
              </p>
              <Col className="" lg={7} md={7} sm={7} xs={12}>
                {Object.entries(formValue).map(([key, value], i) => {
                  if (key !== "image") {
                    return (
                      <InputGroup
                        register={true}
                        key={i}
                        handleChange={handleChange}
                        label={label[i]}
                        keyId={key}
                        value={value}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </Col>
              <Col lg={5} md={5} sm={7} xs={8}>
                <div
                  onClick={() => target.current.click()}
                  className="container-profile mt-2 mt-lg-1 mt-md-1"
                >
                  <img src={imagePreview} alt="" className="img-fluid" />
                  <input
                    hidden
                    type="file"
                    id="image"
                    ref={target}
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <div className="ref-label"></div>
                </div>
              </Col>
              <button
                style={{ color: "white", fontWeight: "900", fontSize: "18px" }}
                type="submit"
                className="btn btn-warning mt-3"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="row">
            <Col className="" lg={7} md={7} sm={7} xs={12}>
              <p className="mb-4" style={style.h}>
                Personal info
              </p>
              <ListInfo
                icon={<FaUserCircle color="#8A8C90" size="40px" />}
                name={data["fullName"]}
                info={"Full name"}
              />
              <ListInfo
                icon={<MdEmail color="#8A8C90" size="40px" />}
                name={data["email"]}
                info={"Email"}
              />
              <ListInfo
                icon={<FaPhoneAlt color="#8A8C90" size="35px" />}
                name={data["phone"]}
                info={"Mobile phone"}
              />
              <ListInfo
                icon={<FaMapMarkerAlt color="#8A8C90" size="35px" />}
                name={data["address"]}
                info={"Address"}
              />
            </Col>

            <Col className="mt-lg-5 mt-md-5 mt-3" lg={5} md={5} sm={7} xs={8}>
              <div className="row px-1">
                <Col className="" lg={12} xs={12}>
                  <img src={imagePreview} alt="" className="mb-2 img-fluid" />
                </Col>
              </div>
              <div className="row px-3">
                <button
                  className="label btn btn-warning me-2 "
                  style={{
                    color: "white",
                    fontWeight: "900",
                    fontSize: "18px",
                  }}
                  onClick={handelEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            </Col>
          </div>
        )}
      </div>
    </div>
  );
}

// Dummy data personal info:
function ListInfo({ icon, name, info }) {
  return (
    <div className="row mb-4">
      <Col className="d-flex align-items-center" xl={2} md={2} sm={2} xs={2}>
        {icon}
      </Col>
      <Col className="" xl={10} md={10} sm={10} xs={10}>
        <div className="mb-2" style={{ fontWeight: "900", fontSize: "15px" }}>
          {name}
        </div>
        <span style={{ fontSize: "15px", color: "#8A8C90" }}>{info}</span>
      </Col>
    </div>
  );
}
