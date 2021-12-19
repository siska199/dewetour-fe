import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { useHistory } from "react-router-dom";
import { Modal, Container, Row, Col } from "react-bootstrap";
import InputGroup from "./../InputGroup";
import { API } from "./../../config/api";
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
export default function ModalLogin({ handelRegister }) {
  const defaultValueForm = {
    email: "",
    password: "",
  };
  const label = ["Email", "Password"]; // Label for input form
  const [formValue, setFormValue] = useState(defaultValueForm);
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.getAttribute("id")]: e.target.value,
    });
  };

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const { login, setLogin } = useContext(ModalContext); //Modal login state
  const { setDataUser } = useContext(UserContext);

  const handelOnHide = () => {
    //Set Modal login hide
    setLogin(false);
    setFormValue(defaultValueForm);
  };

  let history = useHistory();
  const handelOnSubmit = async (e) => {
    //Handel book now:
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formValue);
      const response = await API.post("/login", body, config);
      if (response?.status === 200) {
        setDataUser({
          //Send data to useContext:
          isLogin: true,
          ...response.data.data,
        });
        localStorage.setItem("token", response.data.data.token); //Set Token:
        setLogin(false); //Off modal
        setFormValue(defaultValueForm);
        sweetAlert(false, "success", "Login Success");
        if (response.data.data.status === "admin") {
          history.push("/list-transaction");
        }
      } else {
        showAlert(true, "dark", `${response.data.status}`);
      }
    } catch (error) {
      showAlert(true, "danger", `${error.response.data.message}`);
    }
  };

  const showAlert = (show = false, type = "", msg = "haha") => {
    //Alert for validated input
    setAlert({ show, type, msg });
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
    <Modal
      fullscreen="sm"
      className="c-modal"
      show={login}
      onHide={handelOnHide}
    >
      <Modal.Body style={style.modalBody} className="px-5">
        <Container>
          <Row className="mt-4 mb-4">
            <p className="h-modal pt-4">Login</p>
          </Row>
          <Row>
            <Col>
              <form autoComplete="off" onSubmit={handelOnSubmit} action="">
                {alert.show && <Alert {...alert} removeAlert={showAlert} />}
                {Object.entries(formValue).map(([key, value], i) => (
                  <InputGroup
                    key={i}
                    handleChange={handleChange}
                    label={label[i]}
                    keyId={key}
                    value={value}
                  />
                ))}
                <div className="mb-3 mt-4 d-grid">
                  <button
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "white",
                    }}
                    className="btn btn-warning"
                  >
                    Login
                  </button>
                </div>
              </form>
            </Col>
          </Row>
          <Row className="mb-3 mt-4 text-center">
            <Col>
              Have an account? ? Klik{" "}
              <span className="klik-here" onClick={handelRegister}>
                Here
              </span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
