/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
  HiOutlineArrowCircleRight,
  HiOutlineArrowCircleLeft,
} from "react-icons/hi";

const style = {
  img: {
    borderRadius: "7px",
    width: "329.73px",
    height: "167.64px",
    cursor: "pointer",
  },
};
export default function Galery({ images }) {
  const [show, setShow] = useState(false); //Handel modal Image:
  const [imgModal, setImgModal] = useState();

  const handelShowModal = () => {
    setShow(true);
  };
  const handelOnHide = () => {
    setShow(false);
  };

  const handelModalImage = (img) => {
    handelShowModal();
    setImgModal(img);
  };

  const leftImage = () => {
    const index = images.findIndex((img) => img == imgModal);
    if (index == 1) {
      setImgModal(images[images.length - 1]);
    } else {
      setImgModal(images[index - 1]);
    }
  };
  const rightImage = () => {
    const index = images.findIndex((img) => img == imgModal);
    if (index + 1 == images.length) {
      setImgModal(images[1]);
    } else {
      setImgModal(images[index + 1]);
    }
  };
  return (
    <div className="container">
      <div className="row mx-lg-5 mx-md-5 mx-sm-5 mx-1 mb-3">
        <img src={images[0]} alt="img-fluid" />
      </div>
      <div className="row mx-md-5 mx-sm-5 mx-1 justify-centen-center text-center">
        {images.map((img, i) => {
          if (i != 0) {
            return (
              <Col key={i} lg={4} md={6} sm={12} xs={12}>
                <img
                  onClick={() => handelModalImage(img)}
                  style={style.img}
                  src={img}
                  alt=""
                  className={`img-fluid img-tour mb-3`}
                />
              </Col>
            );
          }
        })}
      </div>
      <Modal
        className="d-flex align-items-center bg-transparent"
        size="lg"
        show={show}
        onHide={handelOnHide}
      >
        <HiOutlineArrowCircleRight
          onClick={() => rightImage()}
          size="60px"
          className="right-arrow"
        />
        <img src={imgModal} className={`img-fluid`} alt="" />
        <HiOutlineArrowCircleLeft
          onClick={() => leftImage()}
          size="60px"
          className="left-arrow"
        />
      </Modal>
    </div>
  );
}
