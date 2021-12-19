/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
import { useParams } from "react-router-dom";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import NavbarComponent from "../components/Navbar";
import BackgroundImageLanding from "../components/BackgroundImageLanding";
import Galery from "../components/Galery";
import InformationTrip from "../components/InfomationTrip";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import bgNavbar from "../assets/banner.png";
import { API } from "./../config/api";
import toRupiah from "@develoka/angka-rupiah-js";
import Swal from "sweetalert2";
import { Col } from "react-bootstrap";

const style = {
  container: {
    position: "relative",
    overflow: "hidden",
  },
  btn: {
    cursor: "pointer",
  },
};

export default function DetailTour() {
  const [imagesTrip, setImagesTrip] = useState();
  const [dataTour, setDataTour] = useState(false);
  const [loading, setLoading] = useState(true);
  const { dataUser } = useContext(UserContext);
  const { setLogin } = useContext(ModalContext);
  let { id } = useParams();

  useEffect(() => {
    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState();
  const handelMaxPrice = () => {
    if (count == Number(dataTour.quota)) {
      sweetAlert(true, "error", "Maximal quota have been achieve");
    } else {
      setCount(count + 1);
      setPrice(price + Number(dataTour.price));
    }
  };
  const handelMinPrice = () => {
    if (count <= 1) {
    } else {
      setCount(count - 1);
      setPrice(price - Number(dataTour.price));
    }
  };
  const fetchData = async () => {
    try {
      const response = await API.get(`/trip/${id}`);
      const images = JSON.parse(response.data.data.images);
      setDataTour(response.data.data);
      setImagesTrip(images);
      if (response.data.data.quota != 0) {
        setCount(1);
        setPrice(response.data.data.price);
      } else {
        setCount(0);
        setPrice(0);
      }
    } catch (error) {
      console.log("error response get user: ", error.response.data.message);
    }
  };
  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  let history = useHistory();
  const handelBookNow = async () => {
    try {
      if (!dataUser.isLogin) {
        setLogin(true);
      } else if (dataUser.status === "user") {
        if (dataTour.quota == 0) {
          return sweetAlert(
            true,
            "error",
            "The Quota for this Trip Have Been Full"
          );
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const formData = {
          idTrip: id,
          counterQty: count,
          total: price,
        };
        await API.post("/transaction", JSON.stringify(formData), config);
        history.push("/payment");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  if (loading) {
    return <Loading type={"Circles"} />;
  }
  return (
    <div style={style.container}>
      {
        dataTour?(
          <>
            <NavbarComponent bg={bgNavbar} />
            <Header
              title={String(dataTour?.title)}
              country={String(dataTour?.country.name)}
            />
            <BackgroundImageLanding
              tp={"625px"}
              lp={"-110px"}
              th={"200px"}
              lh={"1200px"}
            />
            {imagesTrip && <Galery images={imagesTrip} />}
            {dataTour && <InformationTrip data={dataTour} />}
            {dataUser.status === "admin" ? (
              <></>
            ) : (
              <>
                {dataTour && (
                  <CountIDR
                    initialPrice={dataTour.price}
                    price={price}
                    count={count}
                    handelMaxPrice={handelMaxPrice}
                    handelMinPrice={handelMinPrice}
                  />
                )}
                <Button handelBookNow={handelBookNow} />
              </>
            )}
          </>
        ):(
          <>
          </>
        )
      }
      <Footer />
    </div>
  );
}

function Header({ title, country }) {
  return (
    <div className="container container-detail px-lg-5 px-md-5 px-sm-5">
      <div className="row ps-5">
        <p style={{ fontWeight: "900" }} className="t-detail">
          {title}
        </p>
        <span
          style={{ color: "#A8A8A8", fontWeight: "800", marginTop: "-20px" }}
          className="mb-lg-4 mb-md-3 mb-sm-2 country-detail"
        >
          {country}
        </span>
      </div>
    </div>
  );
}

function Button({ handelBookNow }) {
  return (
    <div className="container px-5 text-lg-end text-md-end text-sm-end text-center ">
      <button
        onClick={handelBookNow}
        style={{
          fontWeight: "900",
          fontSize: "18px",
          color: "white",
          width: "213px",
        }}
        className="btn btn-warning me-2"
      >
        Book Now
      </button>
    </div>
  );
}

function CountIDR({
  initialPrice,
  handelMaxPrice,
  handelMinPrice,
  price,
  count,
}) {
  return (
    <div className="container">
      <div className="row mx-md-5 mx-sm-5 mx-1 ">
        <Col lg={6} md={6} sm={6} xs={6}>
          <span className="count">
            {" "}
            <span style={{ color: "#FFAF00" }}></span>
            {toRupiah(String(initialPrice), {
              formal: false,
              symbol: "IDR",
              floatingPoint: 0,
              dot: ",",
            })}
            / Person
          </span>
        </Col>
        <Col lg={6} md={6} sm={6} xs={6} className="text-end count-btn">
          <FaPlusCircle
            color="#FFAF00"
            style={style.btn}
            onClick={handelMaxPrice}
          />
          <span className="mx-4">{count}</span>
          <FaMinusCircle
            color="#FFAF00"
            style={style.btn}
            onClick={handelMinPrice}
          />
        </Col>
        <hr style={{ height: "2px" }} />
      </div>
      <div className="row mx-md-5 mx-sm-5 mx-1">
        <Col lg={6} md={6} sm={6} xs={5}>
          <span className="count">Total</span>
        </Col>
        <Col lg={6} md={6} sm={6} xs={7} className="text-end">
          <span className="count">
          {toRupiah(String(price), {
              formal: false,
              symbol: "IDR",
              floatingPoint: 0,
              dot: ",",
            })}
          </span>
        </Col>
        <hr style={{ height: "2px" }} />
      </div>
    </div>
  );
}
