import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllProductsAction, getSingleUserAction } from "../../../Redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import {
  ComponentTitle,
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import {
  Box,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import Layout from "../Layout/Layout";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
// import { Label } from "@mui/icons-material";
import { ProfileImgBox, imgStyles } from "../../UserProfile/UserProfileUpdate";

const ViewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(id);
  const [orderHistory, setOrderHistory] = useState();
  const { loading, users } = useSelector((state) => state.getSingleUserReducer);

  const fetchSingleUserData = async () => {
    await dispatch(getSingleUserAction(id));
  };
  const { products } = useSelector((state) => state.AllProductsReducer);
  const fetchAllOrders = async () => {
    const response = await dispatch(AllProductsAction());
    console.log(response?.data?.products);
    setOrderHistory(response?.data?.products);
    let pushedValue = [];
    console.log("ok");
    for (let i = 0; i < response?.data?.products.length; i++) {
      if (response?.data?.products[i].user === users?.data?.user?._id) {
        console.log("match");
        pushedValue.push(response?.data?.products[i]);
      }
      console.log("pushed", pushedValue);
    }
  };
  // console.log(products?.data?.products);
  console.log(users?.data?.user?._id);
  // console.log(orderHistory);

  // const UserOrder = async () => {
  //   let pushedValue = [];
  //   console.log("ok");
  //   for (let i = 0; i < products?.data?.products.length; i++) {
  //     if (products?.data?.products[i].user === users?.data?.user?._id) {
  //       console.log("match");
  //       pushedValue.push(products?.data?.products[i]);
  //     }
  //     console.log("pushed", pushedValue);
  //   }
  // };
  useEffect(() => {
    fetchSingleUserData();
    fetchAllOrders();
    // setTimeout(() => {
    //   UserOrder();
    // }, 8000);
  }, []);

  return (
    <>
      <Layout>
        <Box sx={{ mt: "64px", mb: "64px" }}>
          <HeadComponent>
            <NavBtn onClick={() => navigate("/allUsers")} sx={{ mb: 5, mt: 2 }}>
              Back
            </NavBtn>
            <ComponentTitle>User Detail</ComponentTitle>
            {loading ? (
              <LoadingSkeleton />
            ) : (
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
                    //   justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Grid container rowGap={2} columnGap={2}>
                    <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                      <Label sx={{ mt: 2 }}>Name</Label>
                      <CssTextField
                        type='text'
                        required
                        // name='firstName'
                        disabled={true}
                        value={users?.data?.user?.name}
                        // onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        sx={{
                          // width: {
                          //   lg: "25vw",
                          //   md: "25vw",
                          //   sm: "60vw",
                          //   xs: "80vw",
                          // },
                          color: "white",
                          //   WebkitTextFillColor: "white",
                          "& .MuiInputBase-input": {
                            WebkitTextFillColor: "white !important",
                          },
                        }}
                        InputProps={{
                          style: textFieldStyled,
                        }}
                        inputProps={{
                          sx: { color: "white" },
                        }}
                      />
                    </Grid>

                    <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                      <Label sx={{ mt: 2 }}>Email</Label>
                      <CssTextField
                        type='text'
                        required
                        name='email'
                        disabled={true}
                        value={users?.data?.user?.email}
                        fullWidth
                        // onChange={(e) => email(e.target.value)}
                        sx={{
                          // width: {
                          //   lg: "25vw",
                          //   md: "25vw",
                          //   sm: "60vw",
                          //   xs: "80vw",
                          // },
                          "& .MuiInputBase-input": {
                            WebkitTextFillColor: "white !important",
                          },
                        }}
                        InputProps={{
                          style: textFieldStyled,
                        }}
                      />
                    </Grid>
                    <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                      <Label sx={{ mt: 2 }}>Role</Label>
                      <CssTextField
                        type='text'
                        required
                        // name='lastName'
                        disabled
                        value={users?.data?.user?.role}
                        // onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        sx={{
                          // width: {
                          //   lg: "25vw",
                          //   md: "25vw",
                          //   sm: "60vw",
                          //   xs: "80vw",
                          // },
                          "& .MuiInputBase-input": {
                            WebkitTextFillColor: "white !important",
                          },
                        }}
                        InputProps={{
                          style: textFieldStyled,
                        }}
                      />
                    </Grid>
                  </Grid>
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
                      //   src={dp ? dp : "/assets/img.png"}
                      src={users?.data?.user?.avatar?.url}
                      alt='profile-png'
                    />
                  </ProfileImgBox>
                  {/* <input
                    style={{ padding: "5px 10px", background: "green" }}
                    type='file'
                    ref={avatarFileRef}
                    hidden
                    name='dp'
                    accept='image/*'
                    onChange={handleDpUpload}
                  /> */}
                  {/* <NavBtn
                sx={{ width: "180px", mt: 3 }}
                onClick={() => avatarFileRef.current.click()}
              >
                Upload Profile
              </NavBtn> */}
                </Box>
              </Box>
            )}
            <>
              <ComponentTitle
                sx={{
                  fontWeight: 800,
                  mt: 5,
                  // height: {xl:'300px', lg: "200px", md: "100px", sm: "100px", xs: "50px" },
                }}
              >
                User's Order History
              </ComponentTitle>
              {orderHistory?.length > 0 ? (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      width: "100%",
                      boxShadow: "none !important",
                      background: "#2B2B2B",
                      borderRadius: "10px",
                      mt: 5,
                    }}
                  >
                    <Table sx={{}} aria-label='simple table'>
                      <TableHead
                      // sx={{ backgroundColor: "#F6F7FB" }}
                      >
                        <TableRow
                          sx={{
                            "& > td, & > th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Order ID
                          </TableCell>

                          <TableCell
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Name
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Category
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Price
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Sample Image
                          </TableCell>

                          {/* <TableCell
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Actions
                          </TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderHistory?.map((row, index) => {
                          if (row?.user === users?.data?.user?._id)
                            return (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  "& > td, & > th": {
                                    border: 0,
                                  },
                                  "&:hover": {
                                    //   backgroundColor: "#F6F7FB",
                                    //   background: "#D9D9D9",
                                    //   color: "black",
                                    cursor: "pointer",
                                  },
                                }}
                              >
                                <TableCell
                                  align='center'
                                  component='th'
                                  scope='row'
                                >
                                  {row?._id}
                                </TableCell>
                                <TableCell
                                  align='center'
                                  component='th'
                                  scope='row'
                                >
                                  {row?.name}
                                </TableCell>

                                <TableCell align='center'>
                                  {row?.price}
                                </TableCell>
                                <TableCell align='center'>
                                  {row?.price}
                                </TableCell>
                                <TableCell align='center'>
                                  <img
                                    src={row?.images[0]?.url}
                                    style={{ width: "30px" }}
                                    alt='sample-ppic'
                                  />
                                </TableCell>
                              </TableRow>
                            );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                "No Orders yet"
              )}
            </>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default ViewUser;
