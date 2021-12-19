/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from "react";
import Jumbotron from "../components/Jumbotron";
import BackgroundImageLanding from "../components/BackgroundImageLanding";
import NavbarComponent from "../components/Navbar";
import Card from "../components/Card/Card";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import data from "../data/data";
import { API } from "./../config/api";
import GroupTour from "./../components/GroupTour";

const style = {
  container: {
    position: "relative",
    overflowX: "hidden",
  },
};

export default function LandingPage() {
  const [dataTour, setDataTour] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [keyWord, setKeyWord] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    getData();
  }, [render]);

  const handelOnchange = (e) => {
    setKeyWord(e.target.value);
    if (!e.target.value) {
      getData();
      setRender(!render);
    }
  };
  const handelRender = () => {
    setRender(!render);
  };

  const serchRef = useRef(null);
  const search = () => {
    window.scrollTo({
      top: -100 + serchRef.current.offsetTop,
      behavior: "smooth",
    });
    // serchRef.current.scrollIntoView({ behavior: 'smooth' })
    setRender(!render);
  };

  const getData = async () => {
    await API.get("/trips")
      .then((res) => {
        const edData = res.data.data.map((edD) => {
          let images = [];
          for (const file of JSON.parse(edD.images)) {
            images.push(file);
          }
          return {
            ...edD,
            images: images[2],
          };
        });
        if (keyWord == "") {
          setDataTour(edData);
        } else {
          const key = new RegExp(keyWord, "i");
          const newDatas = dataTour.filter(
            (d) => d.title.match(key) || d.country.name.match(key)
          );
          setDataTour(newDatas);
        }
        
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading type={"Circles"} />;
  }

  return (
    <div style={style.container} className="main-c">
      <NavbarComponent />
      <BackgroundImageLanding
        tp={"830px"}
        lp={"-70px"}
        th={"500px"}
        lh={"1220px"}
      />
      <Jumbotron
        value={keyWord}
        search={search}
        handelOnchange={handelOnchange}
      />
      <Card data={data} />
      <div ref={serchRef}>
        <GroupTour handelRender={handelRender} dataTour={dataTour} />
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
}
