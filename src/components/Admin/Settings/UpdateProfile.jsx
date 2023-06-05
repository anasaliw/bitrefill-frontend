import { Box, Grid, Typography, styled } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import Layout from "../Layout/Layout";
import { GetUserDetailsAction, UpdateUserAction } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import {
  GetEmployeeDetailsAction,
  updateEmployeeProfileAction,
} from "../../../Redux/actions/AdminActions";
export const ProfileImgBox = styled(Box)`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  /* width: 50%; */
  border: 4px solid #ffb686;
  @media (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;
export const imgStyles = {
  maxWidth: "100%",
  borderRadius: "50%",
  height: "100%",
  objectFit: "cover",
};

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [date, setDate] = useState();
  const fetchUserDetails = async () => {
    const res = await dispatch(GetEmployeeDetailsAction());
    setName(res?.data?.employee?.name);
    setEmail(res?.data?.employee?.email);
    setPassword(res?.data?.employee?.password);
  };

  const { loading, employees } = useSelector(
    (state) => state.GetEmployeeDetailsReducer
  );
  // console.log(date);
  // console.log(users);
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const localData = JSON.parse(localStorage.getItem("data"));
  console.log(employees?.data?.employee?.role);

  console.log(name);
  console.log(password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      updateEmployeeProfileAction(name, email, password)
    );
    if (res?.data?.success === true) {
      await fetchUserDetails();
      navigate("/dashboard");
    }
  };

  return (
    <Layout>
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/dashboard")} sx={{ mb: 5, mt: 2 }}>
            Back
          </NavBtn>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* <input
                    type='date'
                    name='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  /> */}
                  <Grid container rowGap={2} columnGap={2}>
                    <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                      <Label sx={{ mt: 2 }}>Name</Label>
                      <CssTextField
                        type='text'
                        required
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        autoComplete='off'
                        InputProps={{
                          style: textFieldStyled,
                        }}
                      />
                    </Grid>
                    <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                      <Label sx={{ mt: 2 }}>Email</Label>
                      <CssTextField
                        type='email'
                        required
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        autoComplete='off'
                        InputProps={{
                          style: textFieldStyled,
                        }}
                      />
                    </Grid>

                    <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                      <Label sx={{ mt: 2 }}>Password</Label>
                      <CssTextField
                        type='text'
                        required
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        autoComplete='off'
                        InputProps={{
                          style: textFieldStyled,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <NavBtn
                    sx={{
                      width: "100px",
                      mt: 5,
                    }}
                    type='submit'
                  >
                    Update
                  </NavBtn>
                </form>
              )}
            </Box>
          </Box>
        </HeadComponent>
      </Box>
    </Layout>
  );
};

export default UpdateProfile;
