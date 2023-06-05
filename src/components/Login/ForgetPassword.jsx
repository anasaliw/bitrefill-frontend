import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  CssTextField,
  CssTextField2,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
  Title,
} from "../../Styles/CommonStyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ForgetPasswordAction } from "../../Redux/actions";
import { forgetPasswordSchema } from "../YupValidation/ForgetPassword";
import { useFormik } from "formik";
import Navbar from "../Navbar/Navbar";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [initialValues, setInitialValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    dispatch(ForgetPasswordAction(password, confirmPassword));
  };
  const { handleBlur, handleSubmit, handleChange, touched, errors, values } =
    useFormik({
      initialValues: initialValues,
      validationSchema: forgetPasswordSchema,
      validateOnChange: true,
      onSubmit: async (values, action) => {
        console.log(values);

        const response = await dispatch(ForgetPasswordAction(values, id));
        if (response.data.success === true) {
          navigate("/login");
        }
        console.log(response);
      },
    });
  return (
    <>
      <Navbar />
      <Box sx={{ mt: "104px", minHeight: "80vh" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/login")}>Back</NavBtn>
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
            <Title sx={{ textAlign: "center", mb: 7 }}>Forget Password</Title>
            <form
              style={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <Label sx={{ mb: 2, textAlign: "start" }}>Password</Label>
              <CssTextField2
                required
                type={showPassword ? "text" : "password"}
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                fullWidth
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "white" }} />
                      ) : (
                        <Visibility sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  marginBottom: "2px",
                  // width: {
                  //   lg: "30vw",
                  //   md: "30vw",
                  //   sm: "70vw",
                  //   xs: "80vw",
                  // },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              {touched.password && errors.password ? (
                <Typography style={{ fontSize: 12, color: "red" }}>
                  {errors.password}
                </Typography>
              ) : null}
              <Label sx={{ mb: 2, mt: 2, textAlign: "start" }}>
                Confirm Password
              </Label>
              <CssTextField2
                name='confirmPassword'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                type={showPassword2 ? "text" : "password"}
                fullWidth
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                      edge='end'
                    >
                      {showPassword2 ? (
                        <VisibilityOff sx={{ color: "white" }} />
                      ) : (
                        <Visibility sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  marginBottom: "2px",
                  // width: {
                  //   lg: "30vw",
                  //   md: "30vw",
                  //   sm: "70vw",
                  //   xs: "80vw",
                  // },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <Typography style={{ fontSize: 12, color: "red" }}>
                  {errors.confirmPassword}
                </Typography>
              ) : null}
              <NavBtn sx={{ mt: 5 }} type='submit'>
                Submit
              </NavBtn>
            </form>
          </Box>
        </HeadComponent>
      </Box>
    </>
  );
};

export default ForgetPassword;
