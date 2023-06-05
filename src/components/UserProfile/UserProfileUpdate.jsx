import { Box, Grid, Typography, styled } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../Styles/CommonStyles";
// import Layout from "../Layout/Layout";
import { GetUserDetailsAction, UpdateUserAction } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const UserProfileUpdate = () => {
  const navigate = useNavigate();
  const avatarFileRef = useRef(null);
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    await dispatch(GetUserDetailsAction());
  };

  const { loading, users } = useSelector(
    (state) => state.GetUserDetailsReducer
  );

  // console.log(users);
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const localData = JSON.parse(localStorage.getItem("data"));
  const [name, setName] = useState(users?.data?.user?.name);
  const [surname, setSurname] = useState(users?.data?.user?.surname);
  const [country, setCountry] = useState(users?.data?.user?.country);
  const [city, setCity] = useState(users?.data?.user?.city);
  const [street, setStreet] = useState(users?.data?.user?.street);
  const [vat, setVat] = useState(users?.data?.user?.vat);
  const [avatar, setAvatar] = useState("");

  const [userName, setUserName] = useState(users?.data?.user?.userName);
  const [dp, setDp] = useState("");
  console.log(localData?.user?.userName);
  console.log(localData?.user?.avatar?.url);
  const [initialDp, setInitialDp] = useState(users?.data?.user?.avatar?.url);
  const [images, setImages] = useState("");

  const handleDpUpload = (e) => {
    setAvatar(e.target.files[0]);
    const file = e.target.files[0];
    setDp(URL.createObjectURL(e.target.files[0]));
    setImages();
    const filer = e.target.files[0];
    // console.log(typeof files);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages((old) => reader.result);
      }

      // console.log(file);
    };
  };
  console.log(name);
  console.log(userName);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      UpdateUserAction(
        name,
        userName,
        surname,
        country,
        city,
        street,
        vat,
        images
      )
    );
    console.log(response?.data);
    if (response?.data?.success === true) {
      fetchUserDetails();
      navigate("/");
    }
  };

  return (
    <Box sx={{ mt: "64px" }}>
      <HeadComponent>
        <NavBtn onClick={() => navigate("/")} sx={{ mb: 8, mt: 5 }}>
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
            <form onSubmit={handleSubmit}>
              <Grid container rowGap={2} columnGap={2}>
                <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                  <Label sx={{ mt: 2 }}>Name</Label>
                  <CssTextField
                    autoComplete='off'
                    type='text'
                    required
                    name='firstName'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      width: {
                        lg: "25vw",
                        md: "25vw",
                        sm: "60vw",
                        xs: "80vw",
                      },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                  <Label sx={{ mt: 2 }}>Username</Label>
                  <CssTextField
                    type='text'
                    required
                    name='lastName'
                    autoComplete='off'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{
                      width: {
                        lg: "25vw",
                        md: "25vw",
                        sm: "60vw",
                        xs: "80vw",
                      },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                  <Label sx={{ mt: 2 }}>Surname</Label>
                  <CssTextField
                    type='text'
                    required
                    name='surname'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    sx={{
                      width: {
                        lg: "25vw",
                        md: "25vw",
                        sm: "60vw",
                        xs: "80vw",
                      },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                  <Label sx={{ mt: 2 }}>Country </Label>
                  <CssTextField
                    type='text'
                    required
                    name='surname'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    sx={{
                      width: {
                        lg: "25vw",
                        md: "25vw",
                        sm: "60vw",
                        xs: "80vw",
                      },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                  <Label sx={{ mt: 2 }}>city </Label>
                  <CssTextField
                    type='text'
                    required
                    name='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    sx={{
                      width: {
                        lg: "25vw",
                        md: "25vw",
                        sm: "60vw",
                        xs: "80vw",
                      },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                  <Label sx={{ mt: 2 }}>Street </Label>
                  <CssTextField
                    type='text'
                    required
                    name='street'
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    sx={{
                      width: {
                        lg: "25vw",
                        md: "25vw",
                        sm: "60vw",
                        xs: "80vw",
                      },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                  <Label sx={{ mt: 2 }}>Vat </Label>
                  <CssTextField
                    type='text'
                    required
                    name='street'
                    value={vat}
                    onChange={(e) => setVat(e.target.value)}
                    sx={{
                      width: {
                        lg: "25vw",
                        md: "25vw",
                        sm: "60vw",
                        xs: "80vw",
                      },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
              </Grid>

              {/* </Grid> */}
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
          </Box>
          <Box
            sx={{
              width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mt: 5,
            }}
          >
            <ProfileImgBox>
              <img
                style={imgStyles}
                src={dp ? dp : initialDp}
                alt='profile-png'
              />
            </ProfileImgBox>
            <input
              style={{ padding: "5px 10px", background: "green" }}
              type='file'
              ref={avatarFileRef}
              hidden
              name='dp'
              accept='image/*'
              onChange={handleDpUpload}
            />
            <Typography sx={{ mt: 2 }}>{avatar ? avatar.name : ""}</Typography>

            <NavBtn
              sx={{ width: "180px", mt: 3 }}
              onClick={() => avatarFileRef.current.click()}
            >
              Browse Image
            </NavBtn>
          </Box>
        </Box>
      </HeadComponent>
    </Box>
  );
};

export default UserProfileUpdate;
