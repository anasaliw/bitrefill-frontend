import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { NavBtn } from "../../Styles/CommonStyles";
const CookiesPage = () => {
  const [show, setShow] = useState(false);
  const handleChange = () => {
    setShow(false);
  };
  const handleAccept = () => {
    Cookies.set("bitrefillCookies", "BitrefillCookiesValue", { expires: 7 });
    setShow(false);
  };
  const checkCookies = Cookies.get("bitrefillCookies");
  useEffect(() => {
    if (checkCookies) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [checkCookies]);

  return (
    <>
      {show && (
        <Box
          sx={{
            // display: "none",
            // visibility: show ? "hidden" : "",
            background: "#2b2b2b",
            height: "60px",
            position: "fixed",
            bottom: 0,
            width: "100%",
            color: "white",
            fontWeight: 600,
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Accept Cookies ,{" "}
          <Link style={{ color: "white" }} to='/termsOfService'>
            Terms & Conditions,
          </Link>
          &nbsp;&nbsp;
          <Link to='/privacyPolicy' style={{ color: "white" }}>
            Privacy Policy
          </Link>
          &nbsp; and &nbsp;
          <Link to='/refundPolicy' style={{ color: "white" }}>
            Refund Policy
          </Link>
          &nbsp;&nbsp;
          <NavBtn sx={{ fontSize: "12px" }} onClick={handleChange}>
            Reject
          </NavBtn>
          &nbsp;&nbsp;
          <NavBtn sx={{ fontSize: "12px" }} onClick={handleAccept}>
            Accept
          </NavBtn>{" "}
        </Box>
      )}
    </>
  );
};

export default CookiesPage;
