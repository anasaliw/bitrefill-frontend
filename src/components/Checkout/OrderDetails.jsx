import React, { useContext, useState, useEffect } from "react";
// import {ethers} from "ethers";
// import { sendEth } from './sendEth';
// import { sendBnb } from './sendBnb';
// import { sendUsdt } from './sendUsdt';
// import { sendUsdc } from './sendUsdc';
// import { sendBusd } from './sendBusd';
// import { sendWbtc } from './sendWbtc';

import {
  ComponentTitle,
  CssTextField,
  CssTextField2,
  HeadComponent,
  Label,
  NavBtn,
  PageTitle,
  ResponsiveOrderDetails,
} from "../../Styles/CommonStyles";
import "./Style.css";
import CopyToClipboard from "react-copy-to-clipboard";
// import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { DataProvider } from "../../Context/ContextAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchShippingAction,
  GetAllDeliveryDatesAction,
  placeOrderAction,
} from "../../Redux/actions";
import DialogForPrivacy from "./DialogForPrivacy";
import Checkout from "./Checkout";
import CryptoPay from "./CryptoPay";
// import { withStyles } from "@mui/styles";

const GridBox = styled(Box)`
  border-radius: 10px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  background: #3a3a3a;
  height: 65px;
  cursor: pointer;
  &:hover {
    color: black;
    background: #d9d9d9;
  }
  &:focus {
    color: black;
    background: #d9d9d9;
  }
`;
const textFieldStyled = {
  height: "40px",
  color: "white",
  borderRadius: "10px",
};

const paymentDetails = [
  { img: "/assets/bitcoin.png", title: "ETH", price: "0.0000006" },
  { img: "/assets/etherium.png", title: "BNB", price: "0.0000006" },
  { img: "/assets/b2.png", title: "USDT ETH", price: "0.0000006" },
  { img: "/assets/b3.png", title: "USDC ETH", price: "0.0000006" },
  { img: "/assets/b4.png", title: "USDC BNB", price: "0.0000006" },
  { img: "/assets/b4.png", title: "BUSDC BSC", price: "0.0000006" },
  { img: "/assets/b5.png", title: "WBDC ETH", price: "0.0000006" },
];
const bankDetails = [
  { name: "Account Title", value: "John" },
  { name: "Bank Name", value: "next bank" },
  { name: "Account Number", value: "2642165435453248" },
  { name: "Swift Code", value: "57546574" },
  { name: "Bank Address", value: "Rue du Rhône 67 - 1204 Genève" },
];
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const OrderDetails = () => {
  const [showSummary, setShowSummary] = React.useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingPrice, setShippingPrice] = useState(39);
  const [totalPrice, setTotalPrice] = useState(0);

  // const [bank, setBank] = useState(false);
  const [bank, setBank] = useState(false);
  const [crypto, setCrypto] = useState(false);
  const [address, setAddress] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [checkProductType, setCheckProductType] = React.useState(true);

  // set usestate for metmask connection
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  // For business
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [vat, setVat] = useState("");

  //! Add, Update Cart Starts Here
  const { products, setProducts, userRole } = useContext(DataProvider);
  console.log(userRole);
  const [itemPrice, setItemPrice] = useState();
  const [copy, setCopy] = React.useState(
    "Account Title: John \nBank Name: next bank \nAccount Number: 2642165435453248 \nSwift Code: 57546574 \nRouting No: 57546574 \nBank Address: Rue du Rhône 67 - 1204 Genève"
  );

  //! For DIalog Box Start

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);
  const handleFetch = async () => {
    const res = await dispatch(GetAllDeliveryDatesAction());
    console.log(res.data.deliveries);
  };
  const { loading, deliveryDates } = useSelector(
    (state) => state.GetAllDeliveryDates
  );
  console.log(deliveryDates);
  useEffect(() => {
    handleFetch();
  }, []);
  console.log("date", deliveryDates);
  const [expectedDelivery, setExpectedDelivery] = useState("");

  const handleClickOpen = (e, scrollType) => {
    e.preventDefault();
    console.log(deliveryDates?.data?.deliveries);
    const deliveryData = deliveryDates?.data?.deliveries;
    const findedCountry = deliveryData?.filter(
      (data) => data.nation === shippingInfo.country.toLocaleLowerCase()
    );
    setExpectedDelivery(findedCountry[0]?.expectedDeliveryDate);
    console.log("country", findedCountry);
    calculateTotal();
    if (itemPrice === 0) {
      Swal.fire("Please Add Products To the Cart", "", "error", {
        buttons: false,
        timer: 2000,
      });
    } else if (localStorage.getItem("data")) {
      setOpen(true);
      setScroll(scrollType);
      setShowSummary(false);
    } else {
      Swal.fire("Please Login First", "", "error", {
        buttons: false,
        timer: 2000,
      });
    }
  };
  console.log("day", expectedDelivery);
  const handleClose = () => {
    setOpen(false);
  };
  const checkLogin = localStorage.getItem("data");

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if (!checkLogin) {
      navigate("/login");
    }
  }, [open, checkLogin]);
  //! For DIalog Box End

  const dispatch = useDispatch();
  const [handleEffect, setHandleEffect] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    pinCode: Number,
    phoneNo: Number,
  });
  const [paymentInfo, setPaymentInfo] = useState({
    id: "",
    status: "",
  });
  const [shippingTax, setShippingTax] = useState();

  const [shippingPriceToSend, setShippingTaxToSend] = useState(0);
  const handleShippingAddress = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  const handleCountryChange = (e) => {
    setShippingInfo({ ...shippingInfo, country: e.target.value });
  };
  console.log(shippingInfo.country);
  // useEffect(() => {
  //   if (shippingInfo?.country === shippingTax?.country) {
  //     console.log("HUrraahhh");
  //     setTotalPrice((prevState) => prevState + shippingTax?.nationShipping);
  //   }
  // }, [shippingInfo?.country]);

  const calculateTotal = () => {
    console.log(products);
    let iteratePrice = 0;
    for (let i = 0; i < products.length; i++) {
      // setitemPrice(1000);
      if (products[i].quantity > 1) {
        console.log("quantity");
        iteratePrice += products[i].price * products[i].quantity;
      } else {
        iteratePrice += products[i].price;
      }
    }
    // setTimeout(()=>{
    setItemPrice(iteratePrice);
    // },1000)

    let prices = itemPrice + shippingPrice;
    console.log(shippingTax?.nationShipping);
    setTotalPrice(iteratePrice + shippingPrice);

    console.log(prices);
  };
  const handleProductType = () => {
    for (let i = 0; i < products.length; i++) {
      // console.log(products[i].name);
      if (products[i].productType === "digital") {
        console.log("digital");
        // setCheckProductType(false);
      }
    }
  };

  const fetchData = async () => {
    const res = await dispatch(FetchShippingAction());
    console.log(res?.data?.tax[0]);
    setShippingTax(res?.data?.tax[0]);
  };
  // console.log(shippingTax);

  useEffect(() => {
    fetchData();
    calculateTotal();

    handleProductType();
    if (localStorage.getItem("user")) {
    }

    // let prices = itemPrice + shippingPrice;
    // setTotalPrice(prices);

    // console.log(products.length);
  }, [handleEffect]);

  const handleRemoveItem = async (e, index, id) => {
    // console.log(e);
    console.log(index);
    products.splice(index, 1);
    // console.log(id);
    // console.log(data);
    // let filteredProducts = products.filter((data) => data.product != id);
    // console.log(filteredProducts);
    // setProducts(filteredProducts);
    setProducts(products);
    console.log("products", products);
    setHandleEffect(!handleEffect);
    calculateTotal();
  };
  console.log(products);
  // ! Add,Update Cart Ends Here

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  // console.log(checked);
  let createPayment = {
    id: "",
    method: "",
    status: false,
  };

  const handlePlaceOrder = async () => {
    if (localStorage.getItem("data")) {
      const response = await dispatch(
        placeOrderAction(
          shippingInfo,
          products,
          itemPrice,
          shippingPriceToSend,
          totalPrice,
          businessName,
          businessAddress,
          vat,
          createPayment
        )
      );
      if (response?.data?.success === true) {
        setProducts([]);
        setShippingInfo();
        navigate("/");
      }
    } else {
      Swal.fire("Please Login First", "", "error", {
        buttons: false,
        timer: 2000,
      });
    }
    handleClose();
  };

  const handleCrypto = () => {
    async function connectMetamask() {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setConnected(true);
          setAccount(address);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Metamask not found");
      }

      setBank(false);
      setAddress(false);
      setCrypto(true);
    }
    connectMetamask();
  };
  const handleBank = () => {
    setAddress(false);
    setCrypto(false);
    setBank(true);
  };
  const [cryptoState, setCryptoState] = useState({
    address: "3QS7yLPNC9kZHjofzn5TWdyASbduXHuvDW",
    amount: 45512,
  });
  const handleAddress = (index) => {
    setCrypto(false);
    setBank(false);
    setAddress(true);
    console.log(index);
    // if(index===0){
    //   set
    // }
  };
  const handleInc = (e, index) => {
    // setData({ ...data, quantity: data.quantity + 1 });
    const updatedProduct = [...products];
    updatedProduct[index] = {
      ...updatedProduct[index],
      quantity: updatedProduct[index].quantity + 1,
    };
    setProducts(updatedProduct);
    console.log(index);
    calculateTotal();
  };
  const handleDec = (e, index) => {
    console.log(index);
    if (products[index].quantity > 1) {
      const updatedProduct = [...products];
      updatedProduct[index] = {
        ...updatedProduct[index],
        quantity: updatedProduct[index].quantity - 1,
      };
      setProducts(updatedProduct);
    }
    calculateTotal();
  };

  return (
    <Box sx={{ mt: "64px" }}>
      <ResponsiveOrderDetails>
        {true ? (
          <Checkout
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            scroll={scroll}
            descriptionElementRef={descriptionElementRef}
            handlePlaceOrder={handlePlaceOrder}
            itemPrice={itemPrice}
            setItemPrice={setItemPrice}
            shippingTax={shippingTax}
            shippingInfo={shippingInfo}
            showSummary={showSummary}
            setShowSummary={setShowSummary}
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
          />
        ) : (
          ""
        )}
        <DialogForPrivacy
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          scroll={scroll}
          descriptionElementRef={descriptionElementRef}
          handlePlaceOrder={handlePlaceOrder}
          itemPrice={itemPrice}
          setItemPrice={setItemPrice}
          shippingTax={shippingTax}
          shippingInfo={shippingInfo}
          showSummary={showSummary}
          setShowSummary={setShowSummary}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          setShippingTaxToSend={setShippingTaxToSend}
          expectedDelivery={expectedDelivery}
          createPayment={createPayment}
        />
        {/* <h1 className='h1Tag'>Hello</h1> */}
        <NavBtn onClick={() => navigate("/")}>Back</NavBtn>
        <form onSubmit={(e) => handleClickOpen(e, "paper")}>
          <Box
            sx={{
              mt: 5,
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
                mr: { lg: "20px", md: "20px", sm: "35px", xs: "15px" },
                mb: { lg: "0px", md: "0px", sm: "20px", xs: "20px" },
                width: { lg: "98%", md: "98%", sm: "95%", xs: "90%" },
                // width: "100%",
                background: "#2B2B2B ",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <ComponentTitle>Information</ComponentTitle>
              <>
                {checkProductType ? (
                  <>
                    <Label>First Name</Label>

                    <CssTextField2
                      required
                      name='firstName'
                      value={shippingInfo.firstName}
                      onChange={handleShippingAddress}
                      autoComplete='off'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    <Label>Last Name</Label>
                    <CssTextField2
                      required
                      name='lastName'
                      value={shippingInfo.lastName}
                      onChange={handleShippingAddress}
                      autoComplete='off'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    {/* <Label>Email</Label>

                  <CssTextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }}
                    type='email'
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  /> */}
                    <Label>Telephone</Label>
                    <CssTextField2
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      autoComplete='off'
                      required
                      name='phoneNo'
                      onChange={handleShippingAddress}
                      value={shippingInfo.phoneNo}
                      type='number'
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    <Label>Delivery Address</Label>
                    <CssTextField2
                      required
                      name='address'
                      onChange={handleShippingAddress}
                      value={shippingInfo.address}
                      autoComplete='off'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      type='text'
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    <Label>State</Label>
                    <CssTextField2
                      name='state'
                      required
                      onChange={handleShippingAddress}
                      value={shippingInfo.state}
                      autoComplete='off'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      type='text'
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    <Label>Town</Label>
                    <CssTextField2
                      name='city'
                      required
                      onChange={handleShippingAddress}
                      value={shippingInfo.city}
                      autoComplete='off'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      type='text'
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    <Label>Postcode/Zip code</Label>
                    <CssTextField2
                      name='pinCode'
                      required
                      onChange={handleShippingAddress}
                      value={shippingInfo.pinCode}
                      type='text'
                      autoComplete='off'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    <Label>Country</Label>
                    <CssTextField2
                      name='country'
                      autoComplete='off'
                      required
                      onChange={handleShippingAddress}
                      value={shippingInfo.country}
                      type='text'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                    <Label>Do you have a business?</Label>

                    <Checkbox
                      sx={{
                        padding: "0 !important",

                        "& .css-i4bv87-MuiSvgIcon-root": {
                          color: "white",
                        },
                      }}
                      checked={checked}
                      onChange={handleChecked}
                      {...label}
                    />
                    {checked ? (
                      <>
                        <Label sx={{ mt: 2 }}>Business Name</Label>
                        <CssTextField2
                          type='text'
                          name='businessName'
                          onChange={(e) => setBusinessName(e.target.value)}
                          value={businessName}
                          autoComplete='off'
                          sx={{
                            width: {
                              lg: "30vw",
                              md: "30vw",
                              sm: "70vw",
                              xs: "80vw",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                        />
                        <Label>Business Address</Label>
                        <CssTextField2
                          name='businessAddress'
                          onChange={(e) => setBusinessAddress(e.target.value)}
                          value={businessAddress}
                          autoComplete='off'
                          type='text'
                          sx={{
                            width: {
                              lg: "30vw",
                              md: "30vw",
                              sm: "70vw",
                              xs: "80vw",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                        />
                        <Label>VAT</Label>
                        <CssTextField2
                          name='vat'
                          onChange={(e) => setVat(e.target.value)}
                          value={vat}
                          type='text'
                          autoComplete='off'
                          sx={{
                            width: {
                              lg: "30vw",
                              md: "30vw",
                              sm: "70vw",
                              xs: "80vw",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    <Label>Email</Label>
                    <CssTextField2
                      name='email'
                      onChange={() => setEmail(e.target.value)}
                      value={email}
                      autoComplete='off'
                      sx={{
                        width: {
                          lg: "30vw",
                          md: "30vw",
                          sm: "70vw",
                          xs: "80vw",
                        },
                      }}
                      type='email'
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                  </>
                )}
              </>
            </Box>
            <Box
              sx={{
                width: { lg: "98%", md: "98%", sm: "95%", xs: "90%" },
                // width: "100%",

                background: "#2B2B2B ",
                padding: "20px",
                borderRadius: "5px",
                ml: { lg: "10px", md: "10px", sm: "0px", xs: "0px" },
              }}
            >
              <ComponentTitle>Order Details</ComponentTitle>
              {products.length > 0 ? (
                <>
                  {products?.map((data, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        mb: 2,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={data.image}
                        alt='pic'
                        style={{
                          width: "70px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <Box>
                        <Typography>{data.name}</Typography>
                        <Typography sx={{ fontSize: "13px" }}>
                          {data.price} x {data.quantity} =
                          {data.price * data.quantity} $
                        </Typography>
                        <ButtonGroup
                          size='small'
                          sx={{
                            color: "white",
                            height: "20px",
                            ml: "auto",
                            maxWidth: "20px",

                            "& .MuiButtonGroup-grouped": {
                              minWidth: "30px",
                            },
                          }}
                        >
                          <Button
                            onClick={(e) => handleDec(e, index)}
                            sx={{ color: "white", p: 0 }}
                          >
                            -
                          </Button>
                          <Button sx={{ fontSize: "12px", color: "white" }}>
                            {data.quantity}
                          </Button>
                          <Button
                            onClick={(e) => handleInc(e, index)}
                            sx={{ color: "white", p: 0 }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </Box>

                      <Typography
                        onClick={(e) =>
                          handleRemoveItem(e, index, data?.product)
                        }
                        sx={{
                          ml: "auto",
                          p: "5px 10px 5px 10px",
                          background: "red",
                          borderRadius: "20px",
                          fontSize: "10px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </Typography>
                    </Box>
                  ))}
                </>
              ) : (
                <Button
                  sx={{
                    textTransform: "none",
                    color: "white",
                    height: "52px",
                    mt: 5,
                    mb: 5,
                    background: "#3A3A3A",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "#D9D9D9",
                      color: "black",
                    },
                  }}
                  fullWidth
                  // variant='outlined'
                  onClick={() => navigate("/")}
                >
                  Continue to Shopping
                </Button>
              )}

              {/* <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography>Items Price</Typography>
                <Typography>{itemPrice}£</Typography>
              </Box> */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                {/* <Typography>Shipping </Typography> */}
                {/* <Typography> */}
                {/* {shippingPrice} */}
                {/* {shippingTax?.nationShipping} */}
                {/* {shippingTax?.country === shippingInfo?.country
                    ? shippingTax?.nationShipping
                    : shippingTax?.worldShipping} */}
                {/* 39£ */}
                {/* </Typography> */}
              </Box>
              {/* <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography>Total</Typography>
                <Typography>{totalPrice}£</Typography>
              </Box> */}
              {/* <ComponentTitle>Choose Payment Method</ComponentTitle> */}

              {/* <Grid container rowGap={1} columnGap={2}> */}
              {/* <Grid item xs={11} sm={11.8} md={11.5} lg={11.8}>
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "white",
                      height: "52px",
                      background: "#3A3A3A",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "#D9D9D9",
                        color: "black",
                      },
                      "&:focus": {
                        background: "#D9D9D9",
                        color: "black",
                      },
                    }}
                    fullWidth
                    // variant='outlined'
                    onClick={handleBank}
                  >
                    Bank Transfer
                  </Button> */}
              {/* </Grid> */}
              {/* <Grid item xs={11} sm={5.8} md={5.7} lg={5.8}>
                  <Button
                    fullWidth
                    sx={{
                      textTransform: "none",
                      color: "white",
                      height: "52px",
                      background: "#3A3A3A",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "#D9D9D9",
                        color: "black",
                      },
                      "&:focus": {
                        background: "#D9D9D9",
                        color: "black",
                      },
                    }}
                    onClick={handleCrypto}
                  >
                    Cryptocurrencies
                  </Button>
                </Grid> */}
              {/* </Grid> */}

              {bank ? (
                <Box sx={{ mt: 5 }}>
                  <Grid container rowGap={1} columnGap={1}>
                    {bankDetails.map((data, index) => (
                      <Grid
                        item
                        lg={5.8}
                        md={5.8}
                        sm={11.8}
                        xs={11.8}
                        key={index}
                      >
                        <Label>{data.name}</Label>

                        <CssTextField
                          disabled
                          sx={{
                            color: "white",
                            // WebkitTextFillColor: "white !important",
                            "& .MuiInputBase-input": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                          value={data.value}
                          inputProps={{
                            sx: { color: "white" },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <CopyToClipboard text={copy}>
                    <NavBtn variant='contained' sx={{ width: "180px" }}>
                      Copy to clipboard
                    </NavBtn>
                  </CopyToClipboard>
                </Box>
              ) : (
                ""
              )}

              {/* {crypto ? (
                <Grid container rowGap={1} columnGap={2} sx={{ mt: "20px" }}>
                  {paymentDetails.map((data, index) => (
                    <Grid item xs={12} sm={5.8} md={5.5} lg={5.8} key={index}>
                      <GridBox onClick={() => handleAddress(index)}>
                        <img src={data.img} alt='bitcoin' />
                        <Box sx={{ ml: "12px" }}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {data.title}
                          </Typography>
                          <Typography sx={{ fontSize: "14px" }}>
                            {data.price}
                          </Typography>
                        </Box>
                      </GridBox>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                ""
              )}
              {address ? <CryptoPay /> : ""} */}
            </Box>
          </Box>
          <NavBtn
            type='submit'
            sx={{ margin: "20px auto", display: "flex", width: "300px" }}
            // onClick={handleClickOpen("paper")}
          >
            Place Order
          </NavBtn>
        </form>
      </ResponsiveOrderDetails>
    </Box>
  );
};

export default OrderDetails;
