import React, { useState, useEffect } from "react";
import Layout from "../Admin/Layout/Layout";
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
} from "@mui/material";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../Styles/CommonStyles";
import { useDispatch, useSelector } from "react-redux";
import { GetUserOrdersAction } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";

const UserTransactions = () => {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState();
  const fetchData = async () => {
    const res = await dispatch(GetUserOrdersAction());
    console.log(res?.data?.orders);
    setOrderData(res?.data?.orders);
  };

  const { loading, orders } = useSelector(
    (state) => state.GetUserOrdersReducer
  );
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* <Layout> */}
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/")} sx={{ mb: 3 }}>
            Back
          </NavBtn>
          <ComponentTitle>Transactions</ComponentTitle>

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
                        Transaction Id
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
                        {orderData?.map((row, index) => (
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
      {/* </Layout> */}
    </>
  );
};

export default UserTransactions;
