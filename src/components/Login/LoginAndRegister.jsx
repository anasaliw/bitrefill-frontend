import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  CssTextField,
  CssTextField2,
  HeadComponent,
  Label,
  LoadingBtn,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../Styles/CommonStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  registerAction,
  validateOTPAction,
} from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { signUpSchema } from "../YupValidation/SignupValidation";

const LoginAndRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [showLogin, setShowLogin] = useState(true);
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const validateOptRes = useSelector((state) => state.ValidateOTPReducer);
  // console.log(validateOptRes);
  const loginData = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (loginData) {
      navigate("/");
    }
    if (validateOptRes?.users?.data?.success === true) {
      navigate("/login");
    }
  }, [validateOptRes, loginData]);

  // ! For Register Values
  const [email, setEmail] = useState("");
  const [registerValues, setRegisterValues] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    surname: "",
    country: "",
    city: "",
    street: "",
    vat: "",
    confirmPassword: "",
  });

  //!  Handled Values For Register User
  const handleRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await dispatch(registerAction(registerValues));
    setLoading(false);
    console.log(response);
  };
  const registerData = useSelector((state) => state.RegisterReducer);

  const handleOTP = async (e) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(validateOTPAction(email, otp));
    setLoading(false);
  };

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

  const { handleBlur, handleSubmit, handleChange, touched, errors, values } =
    useFormik({
      initialValues: registerValues,
      validationSchema: signUpSchema,
      validateOnChange: true,
      onSubmit: async (values, action) => {
        console.log(values);
        setEmail(values.email);
        setLoading(true);
        const response = await dispatch(registerAction(values));
        setLoading(false);
        console.log(response);
      },
    });

  console.log(values);
  return (
    <Box sx={{ mt: "104px", minHeight: "80vh" }}>
      {/* <HeadComponent> */}
      <NavBtn onClick={() => navigate("/")} sx={{ mb: 5, ml: 10 }}>
        Back
      </NavBtn>
      {/* </HeadComponent> */}
      <Box
        sx={{
          width: { lg: "30%", md: "30%", sm: "70%", xs: "85%" },
          margin: "auto",
          color: "text.primary",
          padding: "20px",
          borderRadius: "20px",
          background: "#2b2b2b",
          // marginTop: "0px !important",
        }}
      >
        {registerData?.users?.data?.success ? (
          <Box>
            <Title sx={{ textAlign: "center", mb: 7 }}>Validate OTP</Title>
            <form
              style={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={handleOTP}
            >
              <Label sx={{ mb: 2, textAlign: "start" }}>
                Enter OTP code you received on your email.
              </Label>
              <CssTextField
                type='number'
                autoComplete='off'
                name='otp'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
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
            <Title sx={{ textAlign: "center", mb: 7 }}>Register</Title>
            <form onSubmit={handleSubmit}>
              {/* <FormControl> */}
              <Label sx={{ mt: 2 }}>Name</Label>
              <CssTextField2
                type='text'
                name='name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                // value={registerValues.name}
                // onChange={handleRegisterChange}
                required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              {touched.name && errors.name ? (
                <Typography style={{ fontSize: 12, color: "red" }}>
                  {errors.name}
                </Typography>
              ) : null}
              {/* </FormControl> */}
              <Label sx={{ mt: 2 }}>Username</Label>
              <CssTextField2
                type='text'
                name='userName'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              {touched.userName && errors.userName ? (
                <Typography style={{ fontSize: 12, color: "red" }}>
                  {errors.userName}
                </Typography>
              ) : null}
              <Label sx={{ mt: 2 }}>Email</Label>
              <CssTextField2
                type='text'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              {touched.email && errors.email ? (
                <Typography style={{ fontSize: 12, color: "red" }}>
                  {errors.email}
                </Typography>
              ) : null}
              <Label sx={{ mt: 2 }}>Surname</Label>
              <CssTextField2
                type='text'
                name='surname'
                // onBlur={handleBlur}
                onChange={handleChange}
                value={values.surname}
                // required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              <Label sx={{ mt: 2 }}>Country</Label>
              <CssTextField2
                type='text'
                name='country'
                // onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                // required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              <Label sx={{ mt: 2 }}>City</Label>
              <CssTextField2
                type='text'
                name='city'
                // onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                // required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              <Label sx={{ mt: 2 }}>Street</Label>
              <CssTextField2
                type='text'
                name='street'
                // onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
                // required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              <Label sx={{ mt: 2 }}>Vat</Label>
              <CssTextField2
                type='text'
                name='vat'
                // onBlur={handleBlur}
                onChange={handleChange}
                value={values.vat}
                // required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
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
              <Label sx={{ mt: 2 }}>Confirm Password</Label>
              <CssTextField2
                // type='password'
                required
                name='confirmPassword'
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
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
              <Box sx={{ fontSize: "12px", mt: "10px" }}>
                <Typography
                  component='span'
                  sx={{ fontSize: "12px", marginTop: "10px" }}
                >
                  Already Have an account?
                </Typography>{" "}
                <Typography
                  component='span'
                  sx={{
                    fontSize: "13px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Typography>
              </Box>
              <LoadingBtn
                type='submit'
                fullWidth
                sx={{ mt: 3, mb: 1 }}
                loadingPosition='end'
                loading={loading}
              >
                Register
              </LoadingBtn>

              {(errors.city ||
                errors.country ||
                errors.email ||
                errors.vat ||
                errors.password ||
                errors.street ||
                errors.name ||
                errors.userName ||
                errors.surname ||
                errors.confirmPassword) && (
                <Typography style={{ fontSize: 12, color: "red" }}>
                  Pls recheck your form
                </Typography>
              )}
            </form>
          </Box>
        )}

        {/* hello */}
      </Box>
    </Box>
  );
};

export default LoginAndRegister;
