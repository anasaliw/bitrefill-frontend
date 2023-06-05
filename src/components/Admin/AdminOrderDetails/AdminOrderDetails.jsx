import {
  Box,
  Button,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Checkbox,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../../Styles/CommonStyles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOrderStatusAction,
  getAllOrderAction,
} from "../../../Redux/actions";
import { CollectionsBookmarkRounded } from "@mui/icons-material";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import { Navigate, useNavigate } from "react-router-dom";
import DateAndTime from "./DateAndTime";
// import DateAndTime from "../../../../../../FYP/client/src/components/forum/DateAndTime";

const productDetails = [
  {
    email: "Email Address",
    customer: "Client name",
    price: "100£",
    productId: "",
    method: "",
    date: "",
  },
  {
    email: "Email Address",
    customer: "Client name",
    price: "100£",
    productId: "",
    method: "",
    date: "",
  },
  {
    email: "Email Address",
    customer: "Client name",
    price: "100£",
    productId: "",
    method: "",
    date: "",
  },
  { email: "", customer: "", price: "", productId: "", method: "", date: "" },
  { email: "", customer: "", price: "", productId: "", method: "", date: "" },
  //   { email: "", customer: "", price: "", productId: "", method: "", date: "" },
  //   { email: "", customer: "", price: "", productId: "", method: "", date: "" },
  //   { email: "", customer: "", price: "", productId: "", method: "", date: "" },
];

const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ? For API
  const [convertToDeliver, setConvertToDeliver] = useState("delivered");
  const [convertToShipped, setConvertToShipped] = useState("shipped");
  const [convertToProcessing, setConvertToProcessing] = useState("processing");
  const [reHitApi, setReHitApi] = useState(false);

  const [pendingUI, setPendingUi] = useState(false);
  const [complete, setComplete] = useState(true);
  // const [pending, setPending] = useState(true);
  const [processing, setProcessing] = useState(true);
  const [shipped, setShipped] = useState();
  const [pendingData, setPendingData] = useState();
  const [shippedUI, setShippedUI] = useState(false);
  const [delivered, setDelivered] = useState();
  const [uncompleted, setUncompleted] = useState();
  const handleComplete = () => {
    setUncompleted(false);
    setShippedUI(false);
    setPendingUi(false);
    setComplete(true);
  };
  const handleUncompleted = () => {
    setPendingUi(false);
    setComplete(false);
    setShippedUI(false);
    setUncompleted(true);
  };
  const handleShipped = () => {
    setPendingUi(false);
    setComplete(false);
    setUncompleted(false);
    setShippedUI(true);
  };
  const handlePending = () => {
    setComplete(false);
    setUncompleted(false);
    setShippedUI(false);
    setPendingUi(true);
  };
  let orderDataDelivered = [];
  let orderDataProcessing = [];
  let orderDataShipped = [];
  const [orderDataDeliveredState, setOrderDataDeliveredState] = useState([]);
  const [orderDataProcessingState, setOrderDataProcessingState] = useState([]);
  const [orderDataShippedState, setOrderDataShippedState] = useState([]);

  const fetchData = async () => {
    const res = await dispatch(getAllOrderAction());
    const resData = res?.data?.orders;
    const filteredProcessingData = resData.filter(
      (data) => data.orderStatus === "processing"
    );
    // setProcessing(filteredProcessingData)
    const deliveredData = resData.filter(
      (data) => data.orderStatus === "delivered"
    );
    const pending = resData.filter((data) => data.orderStatus === "pending");
    const shippedData = resData.filter(
      (data) => data.orderStatus === "shipped"
    );
    for (let d = 0; d < deliveredData.length; d++) {
      let dataToInsertDelivered = {
        customer: deliveredData[d]?.shippingInfo?.firstName,
        customerEmail: deliveredData[d]?.user?.email,
        phoneNo: deliveredData[d]?.shippingInfo?.phoneNo,
        orderId: deliveredData[d]?._id,
        orderId: deliveredData[d]?._id,
        customerAddress: deliveredData[d]?.shippingInfo?.address,
        city: deliveredData[d]?.shippingInfo?.city,
        country: deliveredData[d]?.shippingInfo?.country,
        paymentInfo: deliveredData[d]?.paymentInfo?.status,
        orderStatus: deliveredData[d]?.orderStatus,
        businessName: deliveredData[d]?.businessName,
        businessAddress: deliveredData[d]?.businessAddress,
        ItemsPrice: deliveredData[d]?.itemsPrice,
        ShippingPrice: deliveredData[d]?.shippingPrice,
        TotalPrice: deliveredData[d]?.totalPrice,
      };
      orderDataDelivered.push(dataToInsertDelivered);
    }

    for (let d = 0; d < shippedData.length; d++) {
      let dataToInsertProcessing = {
        customer: shippedData[d]?.shippingInfo?.firstName,
        customerEmail: shippedData[d]?.user?.email,
        phoneNo: shippedData[d]?.shippingInfo?.phoneNo,
        orderId: shippedData[d]?._id,
        orderId: shippedData[d]?._id,
        customerAddress: shippedData[d]?.shippingInfo?.address,
        city: shippedData[d]?.shippingInfo?.city,
        country: shippedData[d]?.shippingInfo?.country,
        paymentInfo: shippedData[d]?.paymentInfo?.status,
        orderStatus: shippedData[d]?.orderStatus,
        businessName: shippedData[d]?.businessName,
        businessAddress: shippedData[d]?.businessAddress,
        ItemsPrice: shippedData[d]?.itemsPrice,
        ShippingPrice: shippedData[d]?.shippingPrice,
        TotalPrice: shippedData[d]?.totalPrice,
      };
      orderDataProcessing.push(dataToInsertProcessing);
    }
    for (let d = 0; d < filteredProcessingData.length; d++) {
      let dataToInsertShipped = {
        customer: filteredProcessingData[d]?.shippingInfo?.firstName,
        customerEmail: filteredProcessingData[d]?.user?.email,
        phoneNo: filteredProcessingData[d]?.shippingInfo?.phoneNo,
        orderId: filteredProcessingData[d]?._id,
        orderId: filteredProcessingData[d]?._id,
        customerAddress: filteredProcessingData[d]?.shippingInfo?.address,
        city: filteredProcessingData[d]?.shippingInfo?.city,
        country: filteredProcessingData[d]?.shippingInfo?.country,
        paymentInfo: filteredProcessingData[d]?.paymentInfo?.status,
        orderStatus: filteredProcessingData[d]?.orderStatus,
        businessName: filteredProcessingData[d]?.businessName,
        businessAddress: filteredProcessingData[d]?.businessAddress,
        ItemsPrice: filteredProcessingData[d]?.itemsPrice,
        ShippingPrice: filteredProcessingData[d]?.shippingPrice,
        TotalPrice: filteredProcessingData[d]?.totalPrice,
      };
      orderDataShipped.push(dataToInsertShipped);
    }
    // console.log("csv", orderDataDelivered);
    setOrderDataDeliveredState(orderDataDelivered);
    setOrderDataProcessingState(orderDataProcessing);
    setOrderDataShippedState(orderDataShipped);
    setProcessing(filteredProcessingData);
    setDelivered(deliveredData);
    setShipped(shippedData);
    setPendingData(pending);
    // console.log(shippedData);
  };
  const { loading, orders } = useSelector((state) => state.getAllOrdersReducer);
  // console.log(delivered);
  // console.log(shipped);

  const handleShipToDeliver = async (id) => {
    await dispatch(UpdateOrderStatusAction(id, convertToDeliver));
    fetchData();
    // setReHitApi(!reHitApi);
    // console.log("ok");
  };
  const handlePendingToProcessing = async (id) => {
    await dispatch(UpdateOrderStatusAction(id, convertToProcessing));
    fetchData();
    // setReHitApi(!reHitApi);
    // console.log("ok");
  };
  const handleProcessToShip = async (id) => {
    await dispatch(UpdateOrderStatusAction(id, convertToShipped));
    // setReHitApi(!reHitApi);
    fetchData();
    // console.log("ok");
  };

  useEffect(() => {
    fetchData();
  }, [reHitApi]);
  // console.log(processing);
  // console.log(processing);
  // console.log("Pending Data", pendingData);

  return (
    <Layout>
      <Box sx={{ mt: "64px", padding: "0 20px" }}>
        <>
          <NavBtn onClick={() => navigate("/dashboard")} sx={{ mb: 5, mt: 2 }}>
            Back
          </NavBtn>
          <ComponentTitle sx={{ mb: 2 }}>Order Details</ComponentTitle>
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                height: "38px",
                color: complete ? "black" : "white",
                background: complete ? "#D9D9D9" : "#3A3A3A",
                borderRadius: "10px",
                width: "160px",
                mr: 3,

                "&:hover": {
                  background: "#D9D9D9",
                  color: "black",
                },
                "&:focus": {
                  background: "#D9D9D9",
                  color: "black",
                },
              }}
              // variant='outlined'
              onClick={handleComplete}
            >
              Complete
            </Button>
            <Button
              sx={{
                height: "38px",
                color: uncompleted ? "black" : "white",
                background: uncompleted ? "#D9D9D9" : "#3A3A3A",
                borderRadius: "10px",
                mr: 3,
                width: "160px",
                "&:hover": {
                  background: "#D9D9D9",
                  color: "black",
                },
                "&:focus": {
                  background: "#D9D9D9",
                  color: "black",
                },
              }}
              // variant='outlined'
              onClick={handlePending}
            >
              Pending
            </Button>
            <Button
              sx={{
                height: "38px",
                color: uncompleted ? "black" : "white",
                background: uncompleted ? "#D9D9D9" : "#3A3A3A",
                borderRadius: "10px",
                mr: 3,
                width: "160px",
                "&:hover": {
                  background: "#D9D9D9",
                  color: "black",
                },
                "&:focus": {
                  background: "#D9D9D9",
                  color: "black",
                },
              }}
              // variant='outlined'
              onClick={handleUncompleted}
            >
              Processing
            </Button>
            <Button
              sx={{
                height: "38px",
                color: shippedUI ? "black" : "white",
                background: shippedUI ? "#D9D9D9" : "#3A3A3A",
                borderRadius: "10px",
                width: "160px",
                // ml: 2,
                "&:hover": {
                  background: "#D9D9D9",
                  color: "black",
                },
                "&:focus": {
                  background: "#D9D9D9",
                  color: "black",
                },
              }}
              // variant='outlined'
              onClick={handleShipped}
            >
              Shipped
            </Button>
          </Box>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {complete ? (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      // width: "70%",
                      boxShadow: "none !important",
                      background: "#2B2B2B",
                      borderRadius: "10px",
                      mt: 5,
                      mb: 5,
                      // overflowX: "scroll",
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
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            #
                          </TableCell>

                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Email
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Customer
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Price
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Reference ID
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Payment Method
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Date
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <>
                          {delivered?.map((row, index) => (
                            <TableRow
                              onClick={() =>
                                navigate(`/singleOrder/${row?._id}`)
                              }
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                                "& > td, & > th": {
                                  border: 0,
                                },
                                "&:hover": {
                                  cursor: "pointer",
                                },
                              }}
                            >
                              <TableCell
                                size='small'
                                align='center'
                                component='th'
                                scope='row'
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                size='small'
                                align='center'
                                component='th'
                                scope='row'
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {row?.user?.email}
                                {/* testing12@gmail.com */}
                              </TableCell>

                              <TableCell
                                size='small'
                                align='center'
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {row?.user?.name}
                                {/* {row?.lastName} */}
                                {/* Client Name */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.totalPrice}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?._id}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.paymentInfo?.status === true
                                  ? "true"
                                  : "false"}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                <DateAndTime date={row?.createdAt} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <CSVLink
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: "5px 15px",
                      textTransform: "none",
                      background:
                        "linear-gradient(270deg,#00f902 -16.36%,rgba(99, 250, 6, 0) 190%)",
                      borderRadius: "20px",
                      display: "flex",
                      width: "100px",
                      margin: "10px auto",
                    }}
                    data={orderDataDeliveredState}
                  >
                    Download
                  </CSVLink>
                </>
              ) : (
                ""
              )}

              {pendingUI ? (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      // width: "100%",
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
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            #
                          </TableCell>

                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Email
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Customer
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Price
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Reference ID
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            PAYMENT METHOD
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            DATE
                          </TableCell>

                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Mark as Processing
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <>
                          {pendingData?.map((row, index) => (
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
                                size='small'
                                component='th'
                                scope='row'
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                component='th'
                                size='small'
                                scope='row'
                              >
                                {row?.user?.email}
                                {/* customer@gmail.com */}
                              </TableCell>

                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                size='small'
                                align='center'
                              >
                                {row?.user?.name}
                                {/* {row?.lastName} */}
                                {/* Test User */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.totalPrice}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?._id}
                                {/* id */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.paymentInfo?.status === true
                                  ? "true"
                                  : "false"}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                <DateAndTime date={row?.createdAt} />
                                {/* {row?.createdAt} */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                <IconButton
                                  onClick={() =>
                                    handlePendingToProcessing(row?._id)
                                  }
                                >
                                  <CheckCircleRoundedIcon
                                    sx={{
                                      color: "white",
                                      "&:hover": {
                                        color: "#c2c2c2",
                                      },
                                    }}
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <CSVLink
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: "5px 15px",
                      textTransform: "none",
                      background:
                        "linear-gradient(270deg,#00f902 -16.36%,rgba(99, 250, 6, 0) 190%)",
                      borderRadius: "20px",
                      display: "flex",
                      width: "100px",
                      margin: "10px auto",
                    }}
                    data={orderDataProcessingState}
                  >
                    Download
                  </CSVLink> */}
                </>
              ) : (
                ""
              )}
              {uncompleted ? (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      // width: "100%",
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
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            #
                          </TableCell>

                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Email
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Customer
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Price
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Reference ID
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            PAYMENT METHOD
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            DATE
                          </TableCell>

                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Mark as shipped
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <>
                          {processing?.map((row, index) => (
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
                                size='small'
                                component='th'
                                scope='row'
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                component='th'
                                size='small'
                                scope='row'
                              >
                                {row?.user?.email}
                                {/* customer@gmail.com */}
                              </TableCell>

                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                size='small'
                                align='center'
                              >
                                {row?.user?.name}
                                {/* {row?.lastName} */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.totalPrice}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?._id}
                                {/* id */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.paymentInfo?.status === true
                                  ? "true"
                                  : "false"}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                <DateAndTime date={row?.createdAt} />
                                {/* {row?.createdAt} */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                <IconButton
                                  onClick={() => handleProcessToShip(row?._id)}
                                >
                                  <CheckCircleRoundedIcon
                                    sx={{
                                      color: "white",
                                      "&:hover": {
                                        color: "#c2c2c2",
                                      },
                                    }}
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <CSVLink
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: "5px 15px",
                      textTransform: "none",
                      background:
                        "linear-gradient(270deg,#00f902 -16.36%,rgba(99, 250, 6, 0) 190%)",
                      borderRadius: "20px",
                      display: "flex",
                      width: "100px",
                      margin: "10px auto",
                    }}
                    data={orderDataProcessingState}
                  >
                    Download
                  </CSVLink>
                </>
              ) : (
                ""
              )}
              {shippedUI ? (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      width: "100%",
                      boxShadow: "none !important",
                      background: "#2B2B2B",
                      borderRadius: "10px",
                      minWidth: "400px",
                      mt: 5,
                    }}
                  >
                    <Table sx={{}} aria-label='simple table'>
                      <TableHead>
                        <TableRow
                          size='small'
                          sx={{
                            "& > td, & > th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            #
                          </TableCell>

                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Email
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Customer
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Price
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Reference ID
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            PAYMENT METHOD
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            DATE
                          </TableCell>
                          <TableCell
                            size='small'
                            sx={{
                              fontWeight: 600,
                            }}
                            align='center'
                          >
                            Mark as Delivered
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <>
                          {shipped?.map((row, index) => (
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
                                  cursor: "pointer",
                                },
                              }}
                            >
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                size='small'
                                align='center'
                                component='th'
                                scope='row'
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                size='small'
                                align='center'
                                component='th'
                                scope='row'
                              >
                                {row?.user?.email}
                                {/* CustomerEmail@gmail.com */}
                              </TableCell>

                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                size='small'
                                align='center'
                              >
                                {row?.user?.name}
                                {/* customer Email */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.totalPrice}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?._id}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {row?.paymentInfo?.status === true
                                  ? "true"
                                  : "false"}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "13px",
                                }}
                                align='center'
                                size='small'
                              >
                                {/* {row?.createdAt} */}
                                <DateAndTime date={row?.createdAt} />
                              </TableCell>
                              <TableCell
                                align='center'
                                size='small'
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                <IconButton
                                  onClick={() => handleShipToDeliver(row?._id)}
                                >
                                  {/* <Checkbox /> */}
                                  <CheckCircleRoundedIcon
                                    sx={{
                                      color: "white",
                                      "&:hover": {
                                        color: "#c2c2c2",
                                      },
                                    }}
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <CSVLink
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: "5px 15px",
                      textTransform: "none",
                      background:
                        "linear-gradient(270deg,#00f902 -16.36%,rgba(99, 250, 6, 0) 190%)",
                      borderRadius: "20px",
                      display: "flex",
                      width: "100px",
                      margin: "10px auto",
                    }}
                    data={orderDataShippedState}
                  >
                    Download
                  </CSVLink>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </>
      </Box>
    </Layout>
  );
};

export default AdminOrderDetails;
