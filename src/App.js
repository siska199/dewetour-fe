/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import LandingPage from "./page/LandingPage";
import DetailTour from "./page/DetailTour";
import Payment from "./page/user/Payment";
import Profile from "./page/user/Profile";
import ListTransaction from "./page/admin/ListTransaction";
import IncomeTrip from "./page/admin/IncomeTrip";
import AddTrip from "./page/admin/AddTrip";
import PageNotFound from "./page/PageNotFound";
import { API, setAuthToken } from "./config/api";
function App() {
  const { dataUser, setDataUser } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      checkUser(setDataUser);
    }, 500);
  }, [dataUser.status]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/detail-tour/:id" component={DetailTour} />
        {dataUser?.status == "admin" ? (
          <Switch>
            <Route path="/list-transaction" component={ListTransaction} />
            <Route path="/income-trip" component={IncomeTrip} />
            <Route path="/add-trip" component={AddTrip} />
            <Route component={PageNotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/payment" component={Payment} />
            <Route path="/profile" component={Profile} />
            <Route component={PageNotFound} />
          </Switch>
        )}
      </Switch>
    </>
  );
}

const checkUser = async (setDataUser) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.getItem("token"));
      const response = await API.get("/check-auth");
      if (response?.status === 200) {
        if (response.data.data) {
          setDataUser({
            isLogin: true,
            ...response.data.data,
          });
        }
      } else {
        console.log("Response Error", response.data.status);
      }
    }
  } catch (error) {
    console.log(error.response);
  }
};

export default App;
