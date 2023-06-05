import React from "react";
import {
  CssTextField2,
  Label,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../Styles/CommonStyles";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ mt: "104px", minHeight: "80vh" }}>
        <NavBtn onClick={() => navigate("/")} sx={{ mb: 5, ml: 10 }}>
          Back
        </NavBtn>
        <Box
          sx={{
            width: { lg: "30%", md: "30%", sm: "70%", xs: "85%" },
            margin: "auto",
            color: "text.primary",
            padding: "20px",
            borderRadius: "20px",
            background: "#2b2b2b",
          }}
        >
          <Title>Get in touch with us at</Title>
          <Label sx={{ mt: 4, textAlign: "start" }}> Email</Label>
          <CssTextField2
            sx={{
              color: "white",
              "& .MuiInputBase-input": {
                WebkitTextFillColor: "white !important",
              },
            }}
            value='contactus@gmail.com'
            fullWidth
            disabled={true}
            InputProps={{
              style: textFieldStyled,
            }}
          />
          <Label sx={{ mt: 4, textAlign: "start" }}>Whatsapp Number</Label>
          <CssTextField2
            value='+9212345678'
            fullWidth
            sx={{
              color: "white",
              "& .MuiInputBase-input": {
                WebkitTextFillColor: "white !important",
              },
            }}
            disabled={true}
            InputProps={{
              style: textFieldStyled,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Support;
