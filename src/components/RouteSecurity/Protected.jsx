import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Protected = ({ Component }) => {
  const navigate = useNavigate();

  const loggedIn = JSON.parse(localStorage.getItem("employee"));
  useEffect(() => {
    console.log("Protected", loggedIn?.user?.role);
    if (!loggedIn) {
      navigate("/");
    } else if (loggedIn?.user?.role === "customer") {
      navigate("/");
      console.log("not logged in");
    } else {
      // navigate("/dashboard");
    }
  }, [loggedIn]);

  return (
    <>
      <Component />
    </>
  );
};

export default Protected;
