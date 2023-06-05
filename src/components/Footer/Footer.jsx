import { Typography, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: "auto" }}>
      <Box
        sx={{ height: "2px", m: "20px 0px", backgroundColor: "#D9D9D9" }}
      ></Box>
      <Box
        sx={{
          mt: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
          "& > p": {
            marginRight: "10px",
            color: "text.primary",
            cursor: "pointer",
          },
        }}
      >
        <Typography>Copyright Shop.com 2023</Typography>
        <Typography onClick={() => navigate("/privacyPolicy")}>
          Privacy Policy
        </Typography>
        <Typography onClick={() => navigate("/termsOfService")}>
          Terms of Service
        </Typography>
        <Typography onClick={() => navigate("/refundPolicy")}>
          Refund Policy
        </Typography>
        <Typography onClick={() => navigate("/cookies")}>Cookies</Typography>
      </Box>
      <Box sx={{ textAlign: "center", color: "text.primary", m: "20px 0" }}>
        <Typography>
          lips solutions lipse di ioson ursus P.Iva 9000 4500 8777
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
