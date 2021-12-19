/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavbarComponent from "../../components/Navbar";
import CardTour from "../../components/Card/CardTour";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import Empty from "../../components/Empty";
import bgNavbar from "../../assets/banner.png";
import { API } from "../../config/api";
import { Col } from "react-bootstrap";

const style = {
  container: {
    position: "relative",
    overflow: "hidden",
  },
};

export default function IncomeTrip() {
  let history = useHistory();
  const [dataTour, setDataTour] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const pathCloudinary = 'https://res.cloudinary.com/university-state-of-malang-city/image/upload/v1/'
  const getData = async () => {
    try {
      await API.get("/trip-transactions")
        .then((res) => {
          const edData = res.data.data.map((edD) => {
            let images = [];
            for (const file of JSON.parse(edD.images)) {
              images.push(pathCloudinary+file);
            }
            let sumTotal = 0;
            edD.tripTransactions.forEach((tran) => {
              sumTotal += tran.total;
            });
            return {
              ...edD,
              images: images[2],
              price: sumTotal,
            };
          });
          setDataTour(edData);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error response: ", error.response.data.message);
    }
  };

  if (loading) {
    return <Loading type={"Circles"} />;
  }

  return (
    <div style={style.container}>
      <NavbarComponent bg={bgNavbar} />
      <div className="container pt-5 mt-5">
        <div className="row mb-5 mt-3">
          <Col lg={6} xs={12} className="mt-4 text-start">
            <p className="main-title" style={{ marginBottom: "-10px" }}>
              Income Trip
            </p>
          </Col>
          <Col
            lg={6}
            xs={12}
            style={{ marginTop: "-100px" }}
            className="mt-lg-5 mt-md-3 mt-sm-3 mt-0 text-lg-end pt-lg-3 pt-0"
          >
            <button
              onClick={() => history.push("/add-trip")}
              style={{
                fontWeight: "900",
                fontSize: "18px",
                color: "white",
                marginBottom: "-10px",
              }}
              className="btn btn-warning px-5"
            >
              Add Trip
            </button>
          </Col>
        </div>

        <div className="row mt-4 justify-content-lg-start justify-content-center">
          {dataTour && dataTour?.map((d, i) => {
            const newD = JSON.stringify(d).split(",");
            return (
              <CardTour
                admin={true}
                noEdit={true}
                no={`${dataTour.length}/${i + 1}`}
                key={i}
                d={JSON.parse(newD)}
              />
            );
          })}
        </div>

        <div className="row pt-0 justify-content-center">
          {dataTour && dataTour?.length == 0 && <Empty header={false} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
