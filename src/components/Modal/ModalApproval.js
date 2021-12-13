import React from "react";
import DetailPayment from "../DetailPayment";
import { Modal } from "react-bootstrap";

export default function ModalApproval({
  handelApprove,
  handelRejected,
  data,
  show,
  handelOnHide,
}) {
  return (
    <Modal className="d-flex" size="lg" show={show} onHide={handelOnHide}>
      <Modal.Header closeButton></Modal.Header>
      <DetailPayment
        handelRejected={handelRejected}
        admin={true}
        handelApprove={handelApprove}
        data={data}
        botton={true}
      />
    </Modal>
  );
}
