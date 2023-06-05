import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../Styles/CommonStyles";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "../../Context/ContextAPI";
const PrivacyPolicy = () => {
  const { userRole } = useContext(DataProvider);
  console.log(userRole);
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: "64px" }}>
      <HeadComponent>
        <NavBtn onClick={() => navigate("/")}>Back</NavBtn>
        <ComponentTitle sx={{ mt: 2, mb: 2 }}>PRIVACY POLICY</ComponentTitle>
        <Typography sx={{ fontWeight: 400 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.
        </Typography>
      </HeadComponent>
    </Box>
  );
};

export default PrivacyPolicy;
