import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
// import {IoNotificationsSharp} from 'react-icons/io5'
import { useHistory } from "react-router-dom";
import Icon from "../assets/Icon.png"; //Icon Websit
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import MenuDropDown from "./MenuDropDown";

const style = {
  button: {
    width: "100px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
  },
};
export default function NavbarComponent({ bg }) {
  const { dataUser } = useContext(UserContext);
  const { register, setRegister, login, setLogin } = useContext(ModalContext);

  let history = useHistory();
  const handleClickIcon = () => {
    window.scrollTo(0, 0);
    history.push("/");
  };
  const handelRegister = () => {
    setRegister(true);
    setLogin(false);
  };
  const handelLogin = () => {
    setLogin(true);
    setRegister(false);
  };

  const [navbar, setNavbar] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const handelNavbarBg = () => {
      if (isMounted) {
        if (window.scrollY > 66) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      }
    };
    window.addEventListener("scroll", handelNavbarBg);
    return () => {
      isMounted = false;
    };
  }, [navbar]);

  return (
    <Navbar
      className={navbar && "navbar active"}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        boxShadow: `${bg ? "1px 5px 10px #888888" : "none"}`,
      }}
      fixed="top"
      expand="lg pt-3 j-nav"
    >
      <Container>
        <Navbar.Brand>
          <Nav.Item className="nav-link">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => handleClickIcon()}
              className="main-icon"
              src={Icon}
              alt=""
            />
          </Nav.Item>
        </Navbar.Brand>

        {/* <div className="notif">
                    <IoNotificationsSharp color="white" size="40px"/>
                </div> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {dataUser?.isLogin ? (
              <div className="row">
                <Col lg={12} md={3} sm={3} xs={{ span: 3 }}>
                  <MenuDropDown
                    image={dataUser?.image}
                    user={dataUser?.status}
                  />
                </Col>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handelLogin()}
                  style={style.button}
                  className="btn btn-outline-light me-3 mb-2"
                >
                  Login
                </button>
                <button
                  onClick={() => handelRegister()}
                  style={style.button}
                  className="btn btn-warning mb-2"
                >
                  {" "}
                  Register
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ModalLogin
        handelLogin={handelLogin}
        handelRegister={handelRegister}
        login={login}
      />
      <ModalRegister
        handelLogin={handelLogin}
        handelRegister={handelRegister}
        register={register}
      />
    </Navbar>
  );
}
