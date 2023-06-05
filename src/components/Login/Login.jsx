import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CssTextField,
  CssTextField2,
  Label,
  LoadingBtn,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../Styles/CommonStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetPasswordAction,
  loginAction,
  validateOTPAction,
} from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // ! For Login Values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //! Handled Values For Login User
  const handleLoginChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = await dispatch(loginAction(values));
    console.log(response);
    if (response.status === 201) {
      setLoading(false);
      setShowOtp(true);
    }
    if (response.status === 200) {
      setShowOtp(true);
      navigate("/");
      setLoading(false);
    }
    setLoading(false);
  };
  const loginData = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (!loginData) {
      return;
    } else if (loginData?.user?.role === "customer") {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [loginData]);

  const handleOTP = async (e) => {
    e.preventDefault();
    console.log(otp);
    setLoading(true);
    const response = await dispatch(validateOTPAction(values.email, otp));
    setShowOtp(false);
    console.log(response);
    setLoading(false);
  };

  const handleReset = () => {
    setShowReset(!showReset);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res = await dispatch(ResetPasswordAction(resetEmail));
    if (res?.data?.status === true) {
      handleReset();
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          {showReset ? (
            <Box>
              <Title sx={{ textAlign: "center", mb: 7 }}>Reset Password</Title>
              <form
                style={{
                  display: "flex",
                  // alignItems: "center",
                  // justifyContent: "center",
                  flexDirection: "column",
                }}
                onSubmit={handleResetPassword}
              >
                <Label sx={{ mb: 2, textAlign: "start" }}>Enter Email</Label>
                <CssTextField
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  autoComplete='off'
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
                <Typography
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    fontSize: "14px",
                    justifyContent: "flex-end",
                    margin: "0px 0px 10px auto",
                    fontWeight: 400,
                  }}
                  onClick={handleReset}
                >
                  Login
                </Typography>
                <LoadingBtn
                  sx={{
                    width: "60%",
                    margin: "20px auto",

                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                  }}
                  type='submit'
                  loadingPosition='end'
                  loading={loading}
                >
                  Submit
                </LoadingBtn>
              </form>
            </Box>
          ) : (
            <>
              {showOtp ? (
                <Box>
                  <Title sx={{ textAlign: "center", mb: 7 }}>
                    Validate OTP
                  </Title>
                  <form
                    style={{
                      display: "flex",
                      // alignItems: "center",
                      // justifyContent: "center",
                      flexDirection: "column",
                    }}
                    onSubmit={handleOTP}
                  >
                    <Label sx={{ mb: 2, textAlign: "start" }}>Enter OPT</Label>
                    <CssTextField
                      type='number'
                      name='otp'
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
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
                    <LoadingBtn
                      sx={{
                        width: "60%",
                        margin: "20px auto",

                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                      }}
                      type='submit'
                      loadingPosition='end'
                      loading={loading}
                    >
                      Verify OTP
                    </LoadingBtn>
                  </form>
                </Box>
              ) : (
                <Box>
                  <Title sx={{ textAlign: "center", mb: 7 }}>Login</Title>
                  <form onSubmit={handleSubmit}>
                    <Label sx={{ mt: 2 }}>Email Or Username</Label>
                    <CssTextField2
                      type='text'
                      name='email'
                      value={values.email}
                      onChange={handleLoginChange}
                      autoComplete='off'
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
                    <CssTextField2
                      // type='password'
                      required
                      name='password'
                      value={values.password}
                      autoComplete='off'
                      onChange={handleLoginChange}
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
                    <Typography
                      sx={{
                        display: "flex",
                        cursor: "pointer",
                        fontSize: "14px",
                        justifyContent: "flex-end",
                        margin: "5px 0px 10px auto",
                        fontWeight: 400,
                      }}
                      onClick={handleReset}
                    >
                      Forgot Password ?
                    </Typography>
                    <Typography component='span' sx={{ fontSize: "12px" }}>
                      Don't Have an account?
                    </Typography>{" "}
                    <Typography
                      component='span'
                      sx={{
                        fontSize: "13px",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </Typography>
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
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Login;
