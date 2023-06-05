import React from "react";
import Navbar from "../Navbar/Navbar";
import { Box, Typography } from "@mui/material";
import { NavBtn } from "../../Styles/CommonStyles";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Box
        sx={{ textAlign: "center", color: "white", mt: 20, minHeight: "54vh" }}
      >
        <Typography variant='h3'>Page Not Found</Typography>
        <NavBtn onClick={() => navigate("/")} sx={{ width: "300px", mt: 10 }}>
          Go Back to home
        </NavBtn>
      </Box>
      <Footer />
    </>
  );
};

export default Page404;
