import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserOrdersAction } from "../../Redux/actions";
import { Box, Grid, Typography } from "@mui/material";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../Styles/CommonStyles";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const UserOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchOrders = async () => {
    const res = await dispatch(GetUserOrdersAction());
    console.log(res?.data?.orders);
  };
  const { loading, orders } = useSelector(
    (state) => state.GetUserOrdersReducer
  );
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Box sx={{ mt: "64px" }}>
      <HeadComponent>
        <ComponentTitle>Order Details</ComponentTitle>
        <NavBtn onClick={() => navigate("/")} sx={{ mb: 8, mt: 5 }}>
          Back
        </NavBtn>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {orders?.data?.orders?.length > 0 ? (
              <>
                {orders?.data?.orders.map((data, index) => (
                  <>
                    <Grid container rowGap={2} columnGap={2}>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        <Typography
                          component='span'
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Name:
                        </Typography>{" "}
                        &nbsp;&nbsp;
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                          component='span'
                        >
                          {data?.shippingInfo?.firstName}
                        </Typography>
                        <Box style={{ marginBottom: "20px" }}></Box>
                        <Typography
                          component='span'
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Phone No:
                        </Typography>{" "}
                        &nbsp;&nbsp;
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                          component='span'
                        >
                          {data?.shippingInfo?.phoneNo}
                        </Typography>
                        <Box style={{ marginBottom: "20px" }}></Box>
                        <Typography
                          component='span'
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Reference Id:
                        </Typography>{" "}
                        &nbsp;&nbsp;
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                          component='span'
                        >
                          {data?._id}
                        </Typography>
                        <Box style={{ marginBottom: "20px" }}></Box>
                        <Typography
                          component='span'
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Total Price:
                        </Typography>{" "}
                        &nbsp;&nbsp;
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                          component='span'
                        >
                          {data?.totalPrice}$
                        </Typography>
                        <Box style={{ marginBottom: "20px" }}></Box>
                        <Typography
                          component='span'
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Order Status:
                        </Typography>{" "}
                        &nbsp;&nbsp;
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                          component='span'
                        >
                          {data?.orderStatus}
                        </Typography>
                        <br style={{ marginBottom: "10px" }}></br>
                      </Grid>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        {data?.orderItems?.map((row, index) => (
                          <>
                            <Box sx={{ display: "flex", mb: 2 }}>
                              <img
                                src={row?.image}
                                alt='pic'
                                style={{
                                  height: "45px",
                                  width: "50px",
                                  borderRadius: "5px",
                                }}
                              />
                              &nbsp;&nbsp;
                              <Box>
                                <span>Title: </span> &nbsp; &nbsp;
                                <Typography component={"span"}>
                                  {row?.name}
                                </Typography>
                                <br></br>
                                <span>Quantity : </span>{" "}
                                <Typography component={"span"}>
                                  {row?.quantity}
                                </Typography>
                              </Box>
                              <Box sx={{ ml: "auto" }}>{row?.price}$</Box>
                            </Box>
                          </>
                        ))}

                        <NavBtn
                          sx={{ width: "120px", mt: 2 }}
                          onClick={() =>
                            navigate(
                              `/api/v1/orders/getSingleOrder/${data?._id}`
                            )
                          }
                        >
                          View
                        </NavBtn>
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        height: "5px",
                        backgroundColor: "#7e7d7d",
                        margin: "20px 0px",
                      }}
                    ></Box>
                  </>
                ))}
              </>
            ) : (
              <>
                <h1>No Orders Yet</h1>
              </>
            )}
          </>
        )}
      </HeadComponent>
    </Box>
  );
};

export default UserOrder;
