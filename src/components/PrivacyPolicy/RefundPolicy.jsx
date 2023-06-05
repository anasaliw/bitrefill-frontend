import { Box, Typography } from "@mui/material";
import React from "react";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../Styles/CommonStyles";
import { useNavigate } from "react-router-dom";

const RefundPolicy = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: "64px" }}>
      <HeadComponent>
        <NavBtn onClick={() => navigate("/")}>Back</NavBtn>
        <ComponentTitle sx={{ mt: 2, mb: 2 }}>Refund Policy</ComponentTitle>
        <Typography sx={{ fontWeight: 400 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.
        </Typography>
      </HeadComponent>
    </Box>
  );
};

export default RefundPolicy;
