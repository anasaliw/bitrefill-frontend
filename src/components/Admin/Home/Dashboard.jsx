import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import bgImage from "./black.jpg";
import { useTheme } from "@mui/material/styles";
import { TheGraph, Trade, TransmitSqaure2, Ontology } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import {
  AllProductsUserAction,
  GetFilteredOrdersAction,
  getAllOrderAction,
  getAllUsersAction,
} from "../../../Redux/actions";
import { RemoveCircleOutlineTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [revenue, setRevenue] = useState();
  const [orderData, setOrderData] = useState();

  const fetchData = async () => {
    const data = await dispatch(getAllOrderAction());

    setOrderData(data?.data?.orders);
    const returnedData = data?.data?.orders;
    let totalPriceValue = 0;
    for (let i = 0; i < returnedData.length; i++) {
      totalPriceValue += returnedData[i].totalPrice;
    }
    setRevenue(totalPriceValue);
  };
  console.log(revenue);

  const [borderClr, setBorderClr] = useState("none");
  const [borderClr2, setBorderClr2] = useState("none");
  const [borderClr3, setBorderClr3] = useState("none");

  const fetchAllUsers = async () => {
    const res = await dispatch(getAllUsersAction());
    console.log(res);
  };
  const [countProducts, setCountProducts] = useState(0);
  const fetchAllProduct = async () => {
    const response = await dispatch(AllProductsUserAction());
    console.log(response);
    setCountProducts(response?.data?.filteredProductsCount);
    const resData = response?.data?.products;
    console.log(resData);
  };

  const { loading, users } = useSelector((state) => state.GetAllUsersReducer);
  const { products } = useSelector((state) => state.AllProductsReducer);
  // console.log(users);
  console.log(products);

  const fetchFilteredOrders = async () => {
    let filter;
    let status;
    await dispatch(GetFilteredOrdersAction(filter, status));
  };
  const { orders } = useSelector((state) => state.GetFilteredOrdersReducer);

  console.log(orders);
  useEffect(() => {
    fetchFilteredOrders();
    fetchData();
    fetchAllUsers();
    fetchAllProduct();
  }, []);

  //   console.log("ResposneFromHome", userResData);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: { lg: "50vh", md: "50vh", sm: "50vh", xs: "100vh" },

          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: 30,
        }}
      >
        {/* <Box>
        <Box
          sx={{
            border: "1px solid red",
          }}
        >
          <Typography sx={{ color: "white" }}>Welcome On Board</Typography>
        </Box>
      </Box> */}
        <Box
          sx={{
            width: "100%",
            // border: "1px solid white",
            height: "89vh",
            display: "flex",
            flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
            // flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Box
            sx={{
              marginTop: { lg: "260px", md: "260px", sm: "260px", xs: "30px" },
              width: { lg: "30%", md: "30%", sm: "30%", xs: "70%" },
              height: "35vh",
              border: `2px solid ${borderClr}`,
              backgroundColor: "#2b2b2b",
              boxShadow: 4,
              cursor: "pointer",
              borderRadius: "10px 50px",
            }}
            onMouseEnter={() => setBorderClr(theme.palette.primary.main)}
            onMouseLeave={() => setBorderClr("none")}
          >
            <Box
              sx={{
                height: "35vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Trade color={theme.palette.primary.main} size={50} />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: {
                      lg: "18px",
                      md: "18px",
                      sm: "15px",
                      xs: "15px",
                    },
                  }}
                >
                  Total number of products
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: {
                      lg: "18px",
                      md: "18px",
                      sm: "15px",
                      xs: "15px",
                    },
                  }}
                >
                  {/* {formatter.format(3000)} USD */}
                  {countProducts}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: { lg: "260px", md: "260px", sm: "260px", xs: "30px" },
              width: { lg: "30%", md: "30%", sm: "30%", xs: "70%" },
              border: `2px solid ${borderClr2}`,
              backgroundColor: "#2b2b2b",
              boxShadow: 4,
              cursor: "pointer",
              ml: "10px",
              mr: "10px",
              borderRadius: "10px 50px",
            }}
            onMouseEnter={() => setBorderClr2(theme.palette.primary.main)}
            onMouseLeave={() => setBorderClr2("none")}
          >
            <Box
              sx={{
                height: "35vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <TransmitSqaure2 color={theme.palette.primary.main} size={50} />
              </Box>
              {/* <Box>
                <Typography sx={{ fontSize: "18px" }}>
                  Total sold Item
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "14px" }}>
                  {orders?.data?.soldItems}
                </Typography>
              </Box> */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: {
                      lg: "18px",
                      md: "18px",
                      sm: "15px",
                      xs: "15px",
                    },
                  }}
                >
                  Total Revenue
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "14px" }}>
                  {/* {formatter.format(2500)} */}
                  {orders?.data?.totalRevenue}£
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: { lg: "260px", md: "260px", sm: "260px", xs: "30px" },
              width: { lg: "30%", md: "30%", sm: "30%", xs: "70%" },
              border: `2px solid ${borderClr3}`,
              boxShadow: 4,
              backgroundColor: "#2b2b2b",
              cursor: "pointer",
              borderRadius: "10px 50px",
            }}
            onMouseEnter={() => setBorderClr3(theme.palette.primary.main)}
            onMouseLeave={() => setBorderClr3("none")}
          >
            <Box
              sx={{
                height: "35vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Ontology color={theme.palette.primary.main} size={50} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "18px" }}>Total Users</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "14px" }}>
                  {users?.data?.users?.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
