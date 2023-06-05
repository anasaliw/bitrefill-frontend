import React from "react";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
  TableData,
  TableTitle,
  Title,
} from "../../../Styles/CommonStyles";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleOrderAction,
  getSingleOrderAdminAction,
} from "../../../Redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../Layout/Layout";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import DateAndTime from "../AdminOrderDetails/DateAndTime";

const AdminHome = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  const fetch = async () => {
    const res = await dispatch(getSingleOrderAdminAction(id));
    // console.log(res);
  };
  const { loading, orders } = useSelector(
    (state) => state.GetSingleOrderAdminReducer
  );
  console.log(orders?.data?.order);
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout>
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn sx={{ mb: 2 }}>Back</NavBtn>
          <Typography sx={{ mb: 2 }}>Orders</Typography>
          <ComponentTitle sx={{ mb: 2 }}>Order Details</ComponentTitle>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <Box
              sx={{
                "& > button": {
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <Typography sx={{ mb: 2 }}>Order Details</Typography>
              <Grid
                container
                rowGap={1}
                columnGap={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  "& > div": {
                    background: "#2B2B2B",
                    minHeight: "168px",
                    maxHeight: "228px",
                    borderRadius: "10px",
                    p: "10px",
                  },
                  "& > div > p:first-child": {
                    marginBottom: "30px",
                  },
                }}
              >
                <Grid item xs={12} sm={5.8} md={2.9} lg={2.9}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                    Customer
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {orders?.data?.order?.user?.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {orders?.data?.order?.user?.email}
                  </Typography>
                  {/* <Typography sx={{ fontWeight: 600 }}>
                USA, Virginia 34900
              </Typography> */}
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                    Shipping to:
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {orders?.data?.order?.shippingInfo?.address}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {orders?.data?.order?.shippingInfo?.city}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {orders?.data?.order?.shippingInfo?.state},
                    {orders?.data?.order?.shippingInfo?.country}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                    Payment Method:
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Cryptocurrencies
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                    Order Date
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    <DateAndTime date={orders?.data?.order?.createdAt} />
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  background: "#2b2b2b",
                  mt: 2,
                  p: 2.5,
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <TableTitle>#</TableTitle>
                  <TableTitle>IMAGE</TableTitle>
                  <TableTitle>PRODUCT</TableTitle>
                  <TableTitle sx={{ ml: "auto" }}>TOTAL</TableTitle>
                </Box>
                {orders?.data?.order?.orderItems.map((data, index) => (
                  <Box sx={{ display: "flex", mt: 1.5 }} key={index}>
                    <TableData>{index + 1}</TableData>
                    <img
                      src={data.image}
                      alt='pic'
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                        marginRight: "34px",
                      }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TableData sx={{ fontSize: "14px" }}>
                        {data.name}
                      </TableData>
                      <TableData sx={{ fontSize: "14px" }}>
                        Quantity:{data.quantity}
                      </TableData>
                    </Box>
                    <TableData sx={{ ml: "auto" }}>{data.price}£</TableData>
                  </Box>
                ))}
              </Box>
              <NavBtn sx={{ margin: "20px auto 0px auto" }}>Download</NavBtn>
            </Box>
          )}
        </HeadComponent>
      </Box>
    </Layout>
  );
};

export default AdminHome;
