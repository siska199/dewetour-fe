/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import NavbarComponent from "../../components/Navbar";
import Footer from "../../components/Footer";
import bgNavbar from "../../assets/banner.png";
import Alert from "../../components/Alert";
import { API } from "../../config/api";
import Swal from "sweetalert2";
import { Col } from "react-bootstrap";

const style = {
  container: {
    position: "relative",
    overflow: "hidden",
  },
  inp: {
    background: "rgba(196, 196, 196, 0.5)",
    border: "2px solid #B1B1B1",
    boxSizing: "borderBox",
    borderRadius: "5px",
    ountline: "none",
  },
  label: { fontWeight: "900", fontSize: "22px" },
};

export default function AddTrip() {
  const initialValueForm = {
    title: "",
    country: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: "",
    quota: "",
    description: "",
    images: "",
  };
  const label = [
    "Title",
    "Country",
    "Accomodation",
    "Transportation",
    "Eat",
    "Day",
    "Night",
    "Date Trip",
    "Price",
    "Quota",
    "Description",
    "Image",
  ];
  const [form, setForm] = useState(initialValueForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.getAttribute("id")]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [render, setRender] = useState(false);
  useEffect(() => {
    setForm(initialValueForm);
    window.scrollTo(0, 0);
  }, [render]);

  const handelOnSubmit = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure To Add This Trip?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, I am sure!",
      cancelButtonText: "No, cancel it!",
      backdrop: true,
    }).then(
      function (dismiss) {
        if (dismiss.isConfirmed) {
          addData();
        }
      },
      function (dismiss) {
        if (dismiss == "cancel") {
        }
      }
    );
  };

  const addData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData(); //Store data with FormData as object :
      for (const key in form) {
        if (key === "images") {
          Object.entries(form[key]).forEach((file) => {
            formData.append("images", file[1]);
          });
        } else if (key == "quota") {
          formData.append(String(key), form[key]);
          formData.append(String("quotaFilled"), form[key]);
        } else {
          formData.append(String(key), form[key]);
        }
      }
      const response = await API.post("/trip", formData, config); //Insert data user to database
      if (response.status == 200) {
        setForm("");
        setRender(!render);
        sweetAlert(true, "success", "Add Trip Success");
      } else {
        sweetAlert(true, "info", `${response.data.status}`);
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
  const showAlert = (show = false, type = "", msg = "haha") => {
    setAlert({ show, type, msg });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCountries();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [countries, setCountries] = useState(false);
  const [formCountry, setFormCountry] = useState("");
  const handleOnChangeCountry = (e) => {
    setFormCountry(e.target.value);
  };
  const [renderCountry, setRenderCountry] = useState(false);
  const getCountries = async () => {
    await API.get("/countries")
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCountries();
  }, [renderCountry]);

  const addCountry = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await API.post(
        "/country",
        JSON.stringify({ name: formCountry }),
        config
      );
      if (res.status == 201) {
        setRenderCountry(!renderCountry);
        setFormCountry("");
        sweetAlert(true, "success", "Add Country Success");
      } else {
        sweetAlert(true, "warning", `${res.data.message}`);
      }
    } catch (error) {
      sweetAlert(true, "info", `${error.response.data.message}`);
    }
  };

  if (loading) {
    return <Loading type={"Circles"} />;
  }

  return (
    <div id="top" style={style.container}>
      <NavbarComponent bg={bgNavbar} />
      <div className="container pt-5 mt-5">
        <div className="row">
          <div className="col mt-5 text-start">
            <p className="main-title" style={{ marginBottom: "-10px" }}>
              Add Trip
            </p>
          </div>
        </div>
        <div className="row mt-lg-5 mt-md-5 mt-0 ps-lg-5 ps-md-5 ps-sm-5">
          <form autoComplete="off">
            {alert.show && <Alert {...alert} removeAlert={showAlert} />}
            {Object.entries(form).map(([key, value], i) => {
              if (key == "country") {
                return (
                  <div key={i} className="mb-4">
                    <div className="row">
                      <Col xl={3} md={4} sm={6} xs={7}>
                        <label
                          style={{ fontWeight: "900", fontSize: "22px" }}
                          htmlFor={key}
                          className="form-label"
                        >
                          {label[i]}
                        </label>
                        <br />
                        <select
                          className="py-2 px-2"
                          style={style.inp}
                          value={value}
                          onChange={handleChange}
                          id={key}
                        >
                          <option value="DEFAULT" hidden>
                            Choose Country Here
                          </option>
                          {countries &&
                            countries.map((c, i) => (
                              <option key={i} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </Col>

                      <Col xl={3} md={4} sm={4} xs={7}>
                        <label
                          style={{ fontWeight: "900", fontSize: "22px" }}
                          htmlFor={key}
                          className="form-label"
                        >
                          Add Country
                        </label>
                        <input
                          value={formCountry}
                          onChange={handleOnChangeCountry}
                          type="text"
                          style={style.inp}
                          className="form-control"
                        />
                      </Col>

                      <Col xl={2} md={3} sm={2} xs={2}>
                        <span
                          onClick={() => addCountry()}
                          style={{ marginTop: "43px" }}
                          className="btn btn-warning"
                        >
                          Add
                        </span>
                      </Col>
                    </div>
                  </div>
                );
              } else {
                return (
                  <Input
                    key={i}
                    handleChange={handleChange}
                    label={label[i]}
                    keyId={key}
                    value={value}
                  />
                );
              }
            })}
            <div className="mb-4 mt-2 text-center">
              <span
                onClick={() => handelOnSubmit()}
                style={{ color: "#FFFFFF", fontWeight: "900" }}
                className="btn btn-warning px-5 mt-5"
              >
                Add Trip
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Input({ label, value, keyId, handleChange }) {
  return (
    <>
      {label === "Day" || label === "Night" ? (
        <>
          {label === "Day" ? (
            <div className="mb-4">
              <label style={style.label} htmlFor={keyId} className="form-label">
                Duration
              </label>
              <div className="row">
                <div className="col col-lg-3">
                  <input
                    type="number"
                    style={style.inp}
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                    id={keyId}
                  />
                </div>
                <div className="col col-lg-2">
                  <span style={style.label}>{label}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="row mb-4">
              <div className="col col-lg-3">
                <input
                  type="number"
                  style={style.inp}
                  className="form-control"
                  value={value}
                  onChange={handleChange}
                  id={keyId}
                />
              </div>
              <div className="col col-lg-2">
                <span style={style.label}>{label}</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {label === "Description" ? (
            <div className="mb-4">
              <label
                style={{ fontWeight: "900", fontSize: "22px" }}
                htmlFor={keyId}
                className="form-label"
              >
                Description
              </label>
              <textarea
                rows="4"
                type="text"
                style={style.inp}
                className="form-control"
                value={value}
                onChange={handleChange}
                id={keyId}
              />
            </div>
          ) : (
            <div className="mb-4">
              <label style={style.label} htmlFor={keyId} className="form-label">
                {label}
              </label>
              {label == "Image" ? (
                <input
                  multiple
                  type="file"
                  style={style.inp}
                  onChange={handleChange}
                  className="form-control"
                  id={keyId}
                />
              ) : (
                <input
                  type={(() => {
                    switch (label) {
                      case "Date Trip":
                        return "date";
                      case "Price":
                        return "number";
                      case "Quota":
                        return "number";
                      default:
                        return "text";
                    }
                  })()}
                  value={value}
                  style={style.inp}
                  onChange={handleChange}
                  className="form-control"
                  id={keyId}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
