import React, { useEffect, useState } from "react";
import { loginEmployeeAction } from "../../../Redux/actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CssTextField,
  Label,
  LoadingBtn,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { Box, Typography } from "@mui/material";

const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [logoutText, setLogoutText] = useState("");
  const [navigateScren, setnavigateScren] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("data")) {
      setLogoutText("Please Logout from user id first");
      return;
    }
    setLogoutText("");
    setLoading(true);
    let response = await dispatch(loginEmployeeAction(values));
    setnavigateScren(true);
    setLoading(false);
    console.log(response);
  };
  const handleLoginChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { Empusers } = useSelector((state) => state.LoginEmployeeReducer);
  console.log("login", Empusers);
  // const loginData = JSON.parse(localStorage.getItem("employee"));
  useEffect(() => {
    if (Empusers?.data?.success === true && navigateScren === true) {
      console.log("Token Stored");
      navigate("/dashboard");
      setnavigateScren(false);
      // return;
    }
  }, [Empusers, navigateScren]);

  return (
    <>
      <Box sx={{ mt: "104px", minHeight: "80vh" }}>
        <NavBtn
          onClick={() => navigate("/dashboard")}
          sx={{ mb: 5, mt: 2, ml: 10 }}
        >
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
          <Box>
            <Title sx={{ textAlign: "center", mb: 7 }}>Employee Login</Title>
            <form onSubmit={handleSubmit}>
              <Label sx={{ mt: 2 }}>Email</Label>
              <CssTextField
                type='text'
                name='email'
                value={values.email}
                onChange={handleLoginChange}
                required
                sx={{
                  width: {
                    lg: "30vw",
                    md: "30vw",
                    sm: "70vw",
                    xs: "80vw",
                  },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              <Label sx={{ mt: 2 }}>Password</Label>
              <CssTextField
                type='password'
                required
                name='password'
                value={values.password}
                onChange={handleLoginChange}
                sx={{
                  width: {
                    lg: "30vw",
                    md: "30vw",
                    sm: "70vw",
                    xs: "80vw",
                  },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              {logoutText && (
                <Typography sx={{ fontSize: "14px", color: "red" }}>
                  {logoutText}
                </Typography>
              )}

              <LoadingBtn
                type='submit'
                fullWidth
                sx={{ mt: 3, mb: 3 }}
                loading={loading}
                loadingPosition='end'
              >
                Login
              </LoadingBtn>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EmployeeLogin;
