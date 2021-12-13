import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { IoReceiptOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { RiMapPinFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";

const style = {
  profile: {
    width: "50px",
    height: "50px",
    border: "2px solid #FFAF00",
    borderRadius: "50%",
    boxSizing: "borderBox",
    cursor: "pointer",
  },
};
export default function MenuDropDown({ image, user }) {
  const { setDataUser } = useContext(UserContext);

  let history = useHistory();
  const handelLogOut = () => {
    changeIsLoginUser();
    setDataUser({
      isLogin: false,
      status: "No user",
    });
    history.push("/");
    sweetAlert(true, "success", `Logout Success`);
  };

  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: "<h2 style='color:red'>" + msg + "</h2>",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <Dropdown align="end">
      <Dropdown.Toggle className="mb-3" variant="link" bsPrefix="p-0">
        <img style={style.profile} src={image} alt="" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="menu-drop-down">
        {user === "user" ? (
          <>
            <Dropdown.Item
              onClick={() => history.push("/profile")}
              className="d-item mt-3"
            >
              <HiOutlineUser size="33px" color="#FFAF00" />
              <span className="ms-2">Profile</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => history.push("/payment")}
              className="d-item mt-2"
            >
              <IoReceiptOutline className="me-1" size="30px" color="#87A900" />
              <span className="ms-2">Pay</span>
            </Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item
              onClick={() => history.push("/income-trip")}
              className="d-item mt-2"
            >
              <RiMapPinFill size="30px" color="#FFAF00" />
              <span className="ms-lg-3 ms-md-2 ms-sm-2">Trip</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => history.push("/list-transaction")}
              className="d-item mt-2"
            >
              <FaClipboardList size="30px" color="#87A900" />
              <span
                style={{ fontSize: "15px" }}
                className="ms-lg-3 ms-md-2 ms-sm-2"
              >
                Transaction
              </span>
            </Dropdown.Item>
          </>
        )}
        <Dropdown.Divider style={{ height: "3px" }} />
        <Dropdown.Item
          onClick={handelLogOut}
          className="d-item"
          href="#/action-3"
        >
          <FiLogOut size="30px" color="#E50914" />
          <span className="ms-lg-3 ms-md-2 ms-sm-2">Logout</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function changeIsLoginUser() {
  localStorage.removeItem("token");
}
