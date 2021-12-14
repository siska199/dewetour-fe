/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/Navbar";
import DetailPayment from "../../components/DetailPayment";
import ModalPayment from "../../components/Modal/ModalPayment";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import Empty from "../../components/Empty";
import bgNavbar from "../../assets/banner.png";
import { API } from "../../config/api";
import Swal from "sweetalert2";

const style = {
  container: {
    position: "relative",
    overflow: "hidden",
  },
};
export default function Payment() {
  const [show, setShow] = useState(false); //Modal pay state
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataTransaction, setDataTransaction] = useState();
  const [dataImages, setDataImages] = useState("");
  const uploudImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3E9VyefhWFsoFtXMR_n1EOAp18BAf0k0iFjb9xo5_iJKM6kJK_80A-CCVW5bO1AkbhM&usqp=CAU";

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 500);
  }, [render]);

  const handelModal = () => {
    setRender(!render);
    setShow(!show);
  };

  const handleImage = (id) => (e) => {
    const newPreview = dataImages.map((im, i) => {
      if (i == id) {
        const files = e.target.files;
        return {
          ...im,
          imageURL: URL.createObjectURL(files[0]),
          file: files[0],
        };
      } else {
        return {
          ...im,
        };
      }
    });
    setDataImages(newPreview);
  };

  const deleteTransaction = async (id) => {
    //id--> index images in dataImages state
    try {
      await API.delete(`/transaction/${dataImages[id].idTran}`);
      sweetAlert(true, "info", "Delete Success");
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  const addPayment = async (id) => {
    //id--> index images in dataImages state
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const postImage = dataImages[id];
      if (postImage.imageURL == uploudImage) {
        sweetAlert(true, "info", `Please upload payment proof`);
      } else {
        let formData = new FormData();
        formData.append("attachment", postImage.file);
        formData.append("status", "Waiting Approve");
        await API.patch(`/transaction/${postImage.idTran}`, formData, config);
        setShow(!show);
      }
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
    });
  };

  const getData = async () => {
    setLoading(true)
    await API.get("/transactions")
      .then((res) => {
        let newData = [];
        for (const data of res.data.data) {
          if (data.attachment == "" && data.status == "Waiting Payment") {
            const edData = {
              ...data,
              attachment: uploudImage,
            };
            newData.unshift(edData);
          } else {
            newData.unshift(data);
          }
        }
        console.log("Payment response user newData:",newData )

        setDataTransaction(newData);
        const imagesData = newData.map((d) => {
          return {
            idTran: d.id,
            imageURL: d.attachment,
            file: "",
          };
        });
        setDataImages(imagesData);
        setLoading(false)

      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading type={"Circles"} />;
  }
  return (
    <div className="container-user" style={style.container}>
      <NavbarComponent bg={bgNavbar} />
      <div style={{"marginTop":"170px"}}>
        {dataTransaction?.map((d, i) => {
          const newD = JSON.stringify(d).split(",");
          let marginTop = false;
          if (i > 0) {
            marginTop = true;
          }
          // eslint-disable-next-line eqeqeq
          if (d.status == "Waiting Payment") {
            return (
              <div key={i}>
                {Object.entries(dataImages)?.map((dImg, k) => {
                  if (k == i) {
                    return (
                      <DetailPayment
                        key={k}
                        id={k}
                        imagePreview={dImg[1].imageURL}
                        handleImage={handleImage}
                        marginTop={marginTop}
                        data={JSON.parse(newD)}
                        border={true}
                      />
                    );
                  }
                })}
                <div
                  style={{ marginTop: "30px" }}
                  className="container px-3 c-payment text-end"
                >
                  <button
                    onClick={() => addPayment(i)}
                    style={{
                      fontWeight: "900",
                      fontSize: "18px",
                      color: "white",
                      width: "113px",
                    }}
                    className="btn btn-warning me-2"
                  >
                    Pay
                  </button>
                  <button
                    onClick={() => deleteTransaction(i)}
                    style={{
                      fontWeight: "900",
                      fontSize: "18px",
                      color: "white",
                      width: "113px",
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          } else if (
            d.status == "Waiting Approve" ||
            d.status == "Payment Rejected"
          ) {
            return (
              <div key={i}>
                <DetailPayment
                  key={String(i)}
                  marginTop={marginTop}
                  data={JSON.parse(newD)}
                  border={true}
                />
                <div
                  style={{ marginTop: "30px" }}
                  className="container px-3 c-payment text-end"
                >
                  {d.status === "Payment Rejected" && (
                    <button
                      onClick={() => deleteTransaction(i)}
                      style={{
                        fontWeight: "900",
                        fontSize: "18px",
                        color: "white",
                        width: "113px",
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          }
        })}
        <div>
          {dataTransaction?.filter(
            (d) =>
              d.status == "Waiting Payment" ||
              d.status == "Waiting Approve" ||
              d.status == "Payment Rejected"
          ).length == 0 && (
            <div style={{ marginTop: "210px" }}>
              <Empty header={"Payment Trip"} />
            </div>
          )}
        </div>
        <ModalPayment
          handelModal={handelModal}
          addPayment={addPayment}
          show={show}
        />
      </div>
     
      <Footer />
    </div>
  );
}
