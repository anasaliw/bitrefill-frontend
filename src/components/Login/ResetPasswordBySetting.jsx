import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  CssTextField,
  Label,
  NavBtn,
  textFieldStyled,
  LoadingBtn,
  CssTextField2,
  Title,
} from "../../Styles/CommonStyles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResetPasswordBySettingAction } from "../../Redux/actions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ResetPasswordSchema } from "../YupValidation/ResetPasswordSchema";
import { useFormik } from "formik";

const ResetPasswordBySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState("");

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      ResetPasswordBySettingAction(oldPassword, password, confirmPassword)
    );
    if (res.data.success === true) {
      navigate("/");
    }
  };
  // console.log(oldPassword, password, confirmPassword);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordOld = () => setShowOldPassword((show) => !show);

  const handleMouseDownPasswordOld = (event) => {
    event.preventDefault();
  };
  const { handleBlur, handleSubmit, handleChange, touched, errors, values } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ResetPasswordSchema,
      validateOnChange: true,
      onSubmit: async (values, action) => {
        console.log("action", action);
        const res = await dispatch(ResetPasswordBySettingAction(values));
        if (res.data.success === true) {
          navigate("/");
        }
      },
    });

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
          <Title sx={{ textAlign: "center", mb: 7 }}>Reset Password</Title>
          <form
            style={{
              display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <Label sx={{ mt: 1, textAlign: "start" }}>Old Password</Label>
            <CssTextField2
              name='oldPassword'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.oldPassword}
              required
              type={showOldPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPasswordOld}
                    onMouseDown={handleMouseDownPasswordOld}
                    edge='end'
                  >
                    {showOldPassword ? (
                      <VisibilityOff sx={{ color: "white" }} />
                    ) : (
                      <Visibility sx={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
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
            {touched.oldPassword && errors.oldPassword ? (
              <Typography style={{ fontSize: 12, color: "red" }}>
                {errors.oldPassword}
              </Typography>
            ) : null}

            <Label sx={{ mt: 1, textAlign: "start" }}> Password</Label>
            <CssTextField2
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              type={showPassword ? "text" : "password"}
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
            {touched.password && errors.password ? (
              <Typography style={{ fontSize: 12, color: "red" }}>
                {errors.password}
              </Typography>
            ) : null}
            <Label sx={{ mt: 1, textAlign: "start" }}>Confirm Password</Label>
            <CssTextField2
              name='confirmPassword'
              id='outlined-adornment-password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              // autoComplete='off'
              // type={showPassword ? "text" : "password"}
              type={showPassword2 ? "text" : "password"}
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
            {touched.confirmPassword && errors.confirmPassword ? (
              <Typography style={{ fontSize: 12, color: "red" }}>
                {errors.confirmPassword}
              </Typography>
            ) : null}
            {/* <Input
              variant='outlined'
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            /> */}
            {/* <CssTextField2
              name='firstName'
              id='outlined-adornment-password'
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            /> */}

            <LoadingBtn
              sx={{
                width: "60%",
                margin: "20px auto",

                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
              type='submit'
              //   loadingPosition='end'
              //   loading={loading}
            >
              Submit
            </LoadingBtn>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordBySettings;
