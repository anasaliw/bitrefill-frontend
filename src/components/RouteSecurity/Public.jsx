import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Cookies from "../Navbar/Cookies";

const Public = ({ Component }) => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("data"));
  const loggedInAdmin = JSON.parse(localStorage.getItem("employee"));
  useEffect(() => {
    console.log("Protected", loggedIn?.user?.role);
    if (loggedInAdmin) {
      navigate("/dashboard");
    } else if (!loggedIn) {
      navigate("/");
    } else if (loggedIn?.user?.role === "customer") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Component />
      <Cookies />
      <Footer />
    </>
  );
};

export default Public;
