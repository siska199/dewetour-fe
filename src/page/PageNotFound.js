import React from "react";
import pageNotFound from "../assets/pageNotFoud.svg";
import bgNavbar from "../assets/banner.png";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";

const style = {
  container: {
    position: "relative",
    overflow: "hidden",
  },
};
export default function PageNotFound() {
  return (
    <div style={style.container}>
      <NavbarComponent bg={bgNavbar} />
      <div className="container c-payment text-center">
        <h1>Page Not Found</h1>
        <img
          style={{ height: "375px" }}
          src={pageNotFound}
          alt=""
          className="img-fluid"
        />
      </div>
      <Footer />
    </div>
  );
}
