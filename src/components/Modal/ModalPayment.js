import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalPayment({ show, handelModal }) {
  return (
    <Modal
      show={show}
      className="d-flex align-items-center"
      onHide={handelModal}
    >
      <Modal.Body className="text-center  px-5">
        Your payment will be confirmed within 1 x 24 hours To see orders click{" "}
        <span
          onClick={() => handelModal()}
          style={{
            cursor: "pointer",
            fontWeight: "900",
            textDecoration: "underline",
          }}
        >
          Here
        </span>{" "}
        thank you
      </Modal.Body>
    </Modal>
  );
}
