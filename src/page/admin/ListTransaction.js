/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/Navbar";
import ModalApproval from "../../components/Modal/ModalApproval";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import Empty from "../../components/Empty";
import { Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import bgNavbar from "../../assets/banner.png";
import { API } from "../../config/api";
import Swal from "sweetalert2";

const style = {
  container: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "150px",
  },
};
export default function ListTransaction() {
  const [dataTransaction, setDataTransaction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getData();
  }, [render]);

  const handelRender = () => {
    setRender(!render);
  };
  const getData = async () => {
    await API.get("/transactions")
      .then((res) => {
        setDataTransaction(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading type={"Circles"} />;
  }

  return (
    <div style={style.container}>
      <NavbarComponent bg={bgNavbar} />
      <div className="container">
        <h1 className="mb-3 main-title-mod">Incoming Transaction</h1>
        <div style={{ fontSize: "14px" }} className="container ">
          {dataTransaction?.length != 0 ? (
            <>
              <ListHeader />
              {dataTransaction && dataTransaction?.map((d, i) => {
                const newD = JSON.stringify(d).split(",");
                return (
                  <ListData
                    handelRender={handelRender}
                    key={i}
                    no={i + 1}
                    d={JSON.parse(newD)}
                  />
                );
              })}
            </>
          ) : (
            <Empty header="Incoming Transaction" />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
function ListHeader() {
  return (
    <div
      style={{ fontWeight: "bold", backgroundColor: "white" }}
      className="row pt-4 h-list-transaction"
    >
      <Col xl={1} md={1} sm={1} xs={1}>
        No
      </Col>
      <Col xl={2} md={2} sm={2} xs={2}>
        Users
      </Col>
      <Col xl={3} md={3} sm={3} xs={3}>
        Trip
      </Col>
      <Col xl={2} md={2} sm={2} xs={2}>
        Bukti Transfer
      </Col>
      <Col className="text-lg-center" xl={2} md={2} sm={2} xs={2}>
        Status Payment
      </Col>
      <Col xl={2} md={2} sm={2} xs={2}>
        Action
      </Col>
      <hr style={{ height: "2px", marginBottom: "-0px" }} className="mt-3" />
    </div>
  );
}
function ListData({ no, d, handelRender }) {
  const [show, setShow] = useState(false); //Handel modal detail payment:
  const handelShowModal = () => {
    setShow(true);
  };
  const handelOnHide = () => {
    setShow(false);
  };

  const handelApprove = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      formData.append("status", "Approve");
      await API.patch(`/transaction/${id}`, formData, config);
      setShow(false);
      sweetAlert(true, "success", "Approve Payment Success");
      handelRender();
    } catch (error) {
      console.log(error);
    }
  };
  const handelRejected = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      formData.append("status", "Payment Rejected");
      await API.patch(`/transaction/${id}`, formData, config);
      setShow(false);
      sweetAlert(true, "info", "Rejected Payment Success");
      handelRender();
    } catch (error) {
      console.log(error);
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
    <>
      <div
        style={{ backgroundColor: `${no % 2 === 0 ? "white" : "#F9F9F9"}` }}
        className="row pt-3 p-list-transaction"
      >
        <Col xl={1} md={1} sm={1} xs={1}>
          {no}
        </Col>
        <Col xl={2} md={2} sm={2} xs={2}>
          {d.user.fullName}
        </Col>
        <Col xl={3} md={3} sm={3} xs={3}>
          {d.trip.title}
        </Col>
        <Col xl={2} md={2} sm={2} xs={2}>
          <div className="text-overflow">
            {d.attachment.substring(40, d.attachment.length + 1)}
          </div>
        </Col>
        <Col xl={2} md={2} sm={2} xs={2} className="text-lg-center">
          <div
            className="status"
            style={{
              color: `${(() => {
                switch (d.status) {
                  case "Waiting Approve":
                    return "#F7941E";
                  case "Approve":
                    return "#0ACF83";
                  case "Payment Rejected":
                    return "#FF0742";
                  default:
                    return "";
                }
              })()}`,
            }}
          >
            {(() => {
              switch (d.status) {
                case "Waiting Approve":
                  return "Pending";
                case "Approve":
                  return "Approve";
                case "Payment Rejected":
                  return "Cancel";
                default:
                  return "";
              }
            })()}
          </div>
        </Col>
        <Col xl={2} md={2} sm={2} xs={2}>
          <FaSearch
            onClick={handelShowModal}
            style={{ cursor: "pointer" }}
            color="#2FC5F7"
            className="ms-2"
            size="25px"
          />
          <ModalApproval
            handelRejected={handelRejected}
            handelApprove={handelApprove}
            data={d}
            show={show}
            handelOnHide={handelOnHide}
          />
        </Col>
        <hr style={{ height: "2px", marginBottom: "-0px" }} className="mt-3" />
      </div>
    </>
  );
}
