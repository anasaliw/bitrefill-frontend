import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import {
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { AddShippingAction, FetchShippingAction } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";

const ProjectSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nationShipping, setNationShipping] = useState(Number);
  const [worldShipping, setWorldShipping] = useState(Number);
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      AddShippingAction(country.toLowerCase(), nationShipping, worldShipping)
    );
    if (res?.data?.success === true) {
      setCountry();
      setNationShipping();
      setWorldShipping();
    }
    console.log(res);
  };

  const fetchShipping = async () => {
    const response = await dispatch(FetchShippingAction());
    console.log("shipping", response?.data);
  };

  useEffect(() => {
    fetchShipping();
  }, []);

  return (
    <Layout>
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/dashboard")} sx={{ mb: 5, mt: 2 }}>
            Back
          </NavBtn>
          <form onSubmit={handleSubmit}>
            <Label sx={{ mt: 2 }}>Nation Shipping country</Label>
            <CssTextField
              // autoComplete='false'
              type='text'
              required
              //   name=''
              value={country}
              autoComplete='off'
              onChange={(e) => setCountry(e.target.value)}
              sx={{
                width: { lg: "25vw", md: "25vw", sm: "60vw", xs: "80vw" },
              }}
              InputProps={{
                style: textFieldStyled,
              }}
            />
            <Label sx={{ mt: 2 }}>Nation Shipping</Label>
            <CssTextField
              // autoComplete='false'
              type='number'
              required
              //   name=''
              value={nationShipping}
              onChange={(e) => setNationShipping(e.target.value)}
              autoComplete='off'
              sx={{
                width: { lg: "25vw", md: "25vw", sm: "60vw", xs: "80vw" },
              }}
              InputProps={{
                style: textFieldStyled,
              }}
            />
            <Label sx={{ mt: 2 }}>World Shipping</Label>
            <CssTextField
              type='number'
              required
              value={worldShipping}
              onChange={(e) => setWorldShipping(e.target.value)}
              autoComplete='off'
              sx={{
                width: { lg: "25vw", md: "25vw", sm: "60vw", xs: "80vw" },
              }}
              InputProps={{
                style: textFieldStyled,
              }}
            />
            <br></br>
            <NavBtn sx={{ width: "280px", mt: 2 }} type='submit'>
              Submit
            </NavBtn>
          </form>
        </HeadComponent>
      </Box>
    </Layout>
  );
};

export default ProjectSettings;
