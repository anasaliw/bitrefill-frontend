import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableBody,
  styled,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useEffect } from "react";
import {
  ComponentTitle,
  HeadComponent,
  Label,
  NavBtn,
} from "../../../Styles/CommonStyles";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  GetFilteredOrdersAction,
  getAllOrderAction,
} from "../../../Redux/actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { BootstrapInput } from "../Users/EditUser";

const usersData = [
  { transactionID: 56534, customerEmail: "testing@gmail.com", amount: 250 },
  { transactionID: 56534, customerEmail: "testing@gmail.com", amount: 250 },
  { transactionID: 56534, customerEmail: "testing@gmail.com", amount: 250 },
  { transactionID: 56534, customerEmail: "testing@gmail.com", amount: 250 },
  { transactionID: 56534, customerEmail: "testing@gmail.com", amount: 250 },
];

const Transactions = () => {
  const [revenue, setRevenue] = useState();
  const navigate = useNavigate();
  const [openProduct, setOpenProduct] = React.useState(false);
  const [productType, setProductType] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState();
  const [fromDate, setFromDate] = useState("2023-05-01");
  const date = new Date();
  console.log(date.getDate());
  console.log(date.getMonth() + 1);
  const dates = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const [toDate, setToDate] = useState(`2023-${month}-${dates}`);
  // const fetchData = async () => {
  //   const data = await dispatch(getAllOrderAction());
  //   console.log(data?.data?.orders);
  //   setOrderData(data?.data?.orders);
  //   const returnedData = data?.data?.orders;
  //   let totalPriceValue = 0;
  //   for (let i = 0; i < returnedData.length; i++) {
  //     totalPriceValue += returnedData[i].totalPrice;
  //   }
  //   setRevenue(totalPriceValue);
  // };
  console.log(fromDate, toDate);
  const handleChangeProductType = (event) => {
    setProductType(event.target.value);
  };

  const handleCloseProduct = () => {
    setOpenProduct(false);
  };

  const handleOpenProduct = () => {
    setOpenProduct(true);
  };

  const { orders, loading } = useSelector(
    (state) => state.GetFilteredOrdersReducer
  );
  const fetchFilteredOrders = async () => {
    const resData = await dispatch(
      GetFilteredOrdersAction(fromDate, toDate, productType)
    );
    console.log(resData);
    setProducts(resData?.data?.orders);
    setRevenue(resData?.data?.totalRevenue);
  };

  useEffect(() => {
    fetchFilteredOrders();
    // fetchData();
    // calculateRevenue();
  }, [productType, fromDate, toDate]);
  // const calculateRevenue = () => {
  //   let total = 0;
  //   for (let i = 0; i < usersData.length; i++) {
  //     total += usersData[i].amount;
  //   }
  //   setRevenue(total);
  // };
  console.log(productType);

  console.log("ok");
  return (
    <Layout>
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/dashboard")} sx={{ mb: 5, mt: 2 }}>
            Back
          </NavBtn>
          <ComponentTitle>Transactions</ComponentTitle>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <label htmlFor='data'>From Date</label>
                <input
                  id='data'
                  style={{
                    marginTop: "7px",
                    width: "100%",
                    height: "45px",
                    background: "transparent",
                    color: "white",
                    fontSize: "23px",
                    border: "1px solid white",
                    borderRadius: "5px",
                    paddingLeft: "20px",
                  }}
                  type='date'
                  name='date'
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Box>
              <label htmlFor='data'>To Date</label>
              <input
                id='data'
                style={{
                  marginTop: "7px",
                  width: "100%",
                  height: "45px",
                  background: "transparent",
                  color: "white",
                  fontSize: "23px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  paddingLeft: "20px",
                }}
                type='date'
                name='date'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Box>

            <Box sx={{ width: "100%", ml: 2 }}>
              <Label
                id='demo-controlled-open-select-label'
                sx={{ fontWeight: 400, mb: "10px" }}
              >
                Product Type
              </Label>

              <Select
                labelId='demo-controlled-open-select-label'
                id='demo-controlled-open-select'
                open={openProduct}
                onClose={handleCloseProduct}
                onOpen={handleOpenProduct}
                value={productType}
                // name='category'
                // label='Role'
                onChange={handleChangeProductType}
                inputProps={{
                  MenuProps: {
                    MenuListProps: {
                      sx: {
                        backgroundColor: "black",
                      },
                    },
                  },
                }}
                sx={{
                  height: "40px",
                  mb: 2,
                  // background: "black",
                  // width: { lg: "25vw", md: "25vw", sm: "60vw", xs: "80vw" },
                  // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                fullWidth
                input={<BootstrapInput />}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"processing"}>Processing</MenuItem>
                <MenuItem value={"delivered"}>Delivered</MenuItem>
                <MenuItem value={"shipped"}>Shipped</MenuItem>
                {/* <MenuItem value={"controller"}>Controller</MenuItem> */}
                {/* <MenuItem value={"superUser"}>Super User</MenuItem> */}
              </Select>
            </Box>
          </Box>
          <ComponentTitle sx={{ textAlign: "end" }}>
            Total Revenue: {revenue}£
          </ComponentTitle>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
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
                        #
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                        align='center'
                      >
                        Order Reference
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                        align='center'
                      >
                        Customer Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                        align='center'
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <h1>Loading...</h1>
                    ) : (
                      <>
                        {products?.map((row, index) => (
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
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align='center'
                              component='th'
                              scope='row'
                            >
                              {row?._id}
                              {/* 765458 */}
                            </TableCell>

                            <TableCell align='center'>
                              {row?.user?.email}
                              {/* tester@gmail.com */}
                            </TableCell>
                            <TableCell align='center'>
                              {row?.totalPrice}£
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </HeadComponent>
      </Box>
    </Layout>
  );
};

export default Transactions;
