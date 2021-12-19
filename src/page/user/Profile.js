/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import NavbarComponent from "../../components/Navbar";
import DetailPayment from "../../components/DetailPayment";
import PersonalInfo from "../../components/PersonalInfo";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import Empty from "../../components/Empty";
import bgNavbar from "../../assets/banner.png";
import { API, setAuthToken } from "../../config/api";

const style = {
  container: {
    position: "relative",
    overflow: "hidden",
  },
};
export default function Profile() {
  const { dataUser, setDataUser } = useContext(UserContext);
  const [dataProfile, setDataProfile] = useState();
  const [dataTransaction, setDataTransaction] = useState();
  const [loading, setLoading] = useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, [render]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getData();
      setLoading(false);
    }, 1000);
  }, []);

  const renderPage = () => {
    setRender(!render);
  };

  const getUser = async () => {
    try {
      setAuthToken(localStorage.getItem("token"));
      const response = await API.get("/profile");
      if (response.data.status === "success") {
        setDataProfile(response.data.data);
        setDataUser({
          ...dataUser,
          ...response.data.data,
        });
      } else {
        console.log(response.data.data);
      }
    } catch (error) {
      console.log("error response get user: ", error.response.data.message);
    }
  };
  const getData = async () => {
    await API.get("/transactions")
      .then((res) => {
        const approveTrans = res.data.data.filter(
          (id) => id.status == "Approve"
        );
        setDataTransaction(approveTrans);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading type={"Circles"} />;
  }
  return (
    <div style={style.container} className="container-user">
      <NavbarComponent bg={bgNavbar} />
      {dataProfile && (
        <PersonalInfo renderPage={renderPage} data={dataProfile} />
      )}
      {dataTransaction?.map((d, i) => {
        const newD = JSON.stringify(d).split(",");
        let marginTop = false;
        if (i > 0) {
          marginTop = true;
        }
        let header;
        if (i == 0) {
          header = "History Trip";
        } else {
          header = "";
        }
        return (
          <DetailPayment
            user={true}
            header={header}
            marginTop={marginTop}
            key={i}
            data={JSON.parse(newD)}
          />
        );
      })}
      <div>
        {dataTransaction?.length == 0 && <Empty header={"History Trip"} />}
      </div>
      <Footer />
    </div>
  );
}
