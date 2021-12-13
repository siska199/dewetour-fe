/* eslint-disable eqeqeq */
import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { Modal } from "react-bootstrap";
import InputGroup from "./../InputGroup";
import { API } from "../../config/api";
import Alert from "./../Alert";
import Swal from "sweetalert2";

const style = {
  modalBody: {
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    width: "416px",
  },
};
export default function ModalRegister({ handelLogin }) {
  const initialValue = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  };
  const label = [
    "Full Name",
    "Email",
    "Password",
    "Phone",
    "Address",
    "Gender",
  ];
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.getAttribute("id")]: e.target.value,
    });
  };

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const { register, setRegister, setLogin } = useContext(ModalContext); //Hendel modal register
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        // Configuration Content-type
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formValue);
      const response = await API.post("/register", body, config);
      console.log("Response data: ", response);
      if (response.data.status == "success") {
        sweetAlert(true, "success", `Register Success`);
        handelOnHide();
        setTimeout(() => {
          setLogin(true);
        }, 1500);
      } else {
        showAlert(true, "danger", `${response.data.status}`);
      }
    } catch (error) {
      showAlert(true, "danger", `${error.response.data.message}`);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handelOnHide = () => {
    //Function for hide modal register
    setRegister(false);
    setFormValue(initialValue);
  };
  return (
    <>
      <Modal className="c-modal" show={register} onHide={handelOnHide}>
        <Modal.Body style={style.modalBody} className="px-5">
          <div className="row text-center">
            <p style={{ fontSize: "30px", fontWeight: "700" }}>Register</p>
          </div>
          <form autoComplete="off" onSubmit={handleOnSubmit} action="">
            {alert.show && <Alert {...alert} removeAlert={showAlert} />}
            {Object.entries(formValue).map(([key, value], i) => (
              <InputGroup
                register={true}
                key={i}
                handleChange={handleChange}
                label={label[i]}
                keyId={key}
                value={value}
              />
            ))}
            <div className="mb-3 mt-4 d-grid">
              <button
                style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
                className="btn btn-warning"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-2 text-center">
            Don't have an account? ? Klik{" "}
            <span className="klik-here" onClick={handelLogin}>
              Here
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
