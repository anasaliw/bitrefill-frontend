import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  HeadComponent,
  Label,
  NavBtn,
  PageTitle,
} from "../../Styles/CommonStyles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
//2nd carousel
import "./Styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { DataProvider } from "../../Context/ContextAPI";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductAction } from "../../Redux/actions";
import { ProductionQuantityLimitsSharp } from "@mui/icons-material";
import { BootstrapInput } from "../Home/Home";

const SingleProduct = () => {
  const { products, setProducts } = useContext(DataProvider);
  const [count, setCount] = useState(1);
  const [personName, setPersonName] = useState("ETH");
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [openAlreadyExist, setOpenAlreadyExist] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [data, setData] = useState({
    id: 1,
    productId: "2",
    productName: "series 5",
    productDetails: "Watch",
    price: 100,
    quantity: 1,
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // const [count,setCount]=useState();
  useEffect(() => {
    // console.log(products);
  }, []);

  // const handleInc = () => {
  //   setData({ ...data, quantity: data.quantity + 1 });
  //   setCount((prevState) => prevState + 1);
  // };
  // const handleDec = () => {
  //   if (data.quantity > 1) {
  //     setData({ ...data, quantity: data.quantity - 1 });
  //   }
  //   if (count > 1) {
  //     setCount((prevState) => prevState - 1);
  //   }
  // };
  const handleDecrement = () => {
    if (data.quantity > 1) {
      setData({ ...data, quantity: data.quantity - 1 });
    }
  };
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };

  const handleConversionChange = (value) => {
    setOpenDialog(false);
    setPersonName(value);
  };

  const handleClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };

  console.log(data);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  const fetchData = async () => {
    const res = await dispatch(SingleProductAction(id));
    console.log("Pric", res?.data?.product?.price);
    fetchTokenPriceUSD(personName, res?.data?.product?.price);
  };
  const [amountInToken, setAmountInToken] = useState(Number);
  function fetchTokenPriceUSD(tokenSymbol, price) {
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=USD`;

    return axios
      .get(apiUrl)
      .then((response) => {
        const priceData = response.data;
        const usdPrice = priceData.USD;
        // const etherPriceUSD = 1800;
        console.log("Token Price in USD:", usdPrice);

        const amountInEther = price / usdPrice;
        console.log("Token Price in USD result:", amountInEther);

        // setConvertedToken(amountInEther)
        console.log("Token Price Converted ");
        setAmountInToken(amountInEther);
        return amountInEther;
        // return usdPrice;
      })
      .catch((error) => {
        console.error("Error fetching token price:", error);
        return null;
      });
  }

  useEffect(() => {
    fetchData();
  }, [personName]);
  const { loading, product } = useSelector(
    (state) => state.singleProductReducer
  );
  const resData = product?.data?.product;
  // const resData = product;
  console.log(resData);

  const handleAddCart = () => {
    setOpenDialog(true);
    for (let i = 0; i <= products.length; i++) {
      // ? This condition will increase the quantity by +1 if product already exist in the cart
      if (products[i]?.product === resData._id) {
        const updatedProducts = [...products];
        updatedProducts[i] = {
          ...updatedProducts[i],
          quantity: updatedProducts[i].quantity + 1,
        };
        // products[i]?.quantity=products[i].quantity+1;
        setProducts(updatedProducts);
        setOpenAlreadyExist(true);
        console.log(...products);
        setTimeout(() => {
          setOpenAlreadyExist(false);
        }, 2000);
        return;
      }
    }
    {
      resData.price;
    }

    //This will add a product in the cart.

    const newArray = [
      ...products,
      {
        product: resData._id,
        name: resData.name,
        image: resData.images[0].url,
        quantity: count,
        price: resData.price,
      },
    ];
    setProducts(newArray);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 4000);
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
    // calculateTotal();
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
    // calculateTotal();
  };
  console.log(products);
  console.log(count);
  return (
    <Box sx={{ mt: "34px" }}>
      <HeadComponent sx={{ color: "text.primary" }}>
        <Collapse in={openAlreadyExist}>
          <Alert
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2, backgroundColor: "#2b2b2b", color: "white" }}
          >
            Quantity has been increased of this product
          </Alert>
        </Collapse>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2, backgroundColor: "#2b2b2b", color: "white" }}
          >
            Item Added Successfully
          </Alert>
        </Collapse>
        <Dialog
          PaperProps={{
            sx: {
              top: 0,
              position: "absolute",
              top: "31px",
              right: { lg: "50px", md: "50px", sm: "50px", xs: "-20px" },
              background: "#2b2b2b",
              color: "white",
              minWidth: "300px",
            },
          }}
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{"My Cart"}</DialogTitle>
          <DialogContent>
            {products.map((data, index) => (
              <Box sx={{ display: "flex", mt: 2 }} key={index}>
                <img
                  src={data.image}
                  alt='image'
                  style={{ width: "40px", height: "40px" }}
                />
                <Box sx={{ ml: "10px" }}>
                  <Typography>{data.name}</Typography>
                  <Typography sx={{ color: "#99A29E", fontSize: "14px" }}>
                    {data.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "white",
                    height: "20px",
                    ml: "auto",
                    display: "flex",
                    borderRadius: "30px",
                    background: "#141716",
                    minWidth: "60px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0px 5px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    onClick={(e) => handleDec(e, index)}
                    sx={{ color: "white", p: 0 }}
                  >
                    -
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "white" }}>
                    {data.quantity}
                  </Typography>
                  <Typography
                    onClick={(e) => handleInc(e, index)}
                    sx={{ color: "white", p: "0 0px 3px 0px" }}
                  >
                    +
                  </Typography>
                </Box>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <NavBtn onClick={handleCloseDialog}>Continue Shopping</NavBtn>
            <NavBtn onClick={() => navigate("/orderDetails")}>Checkout</NavBtn>
          </DialogActions>
        </Dialog>
        <NavBtn onClick={() => navigate("/")}>Back</NavBtn>
        {loading ? (
          <h1>Loading</h1>
        ) : (
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
                width: {
                  lg: "100%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
            >
              <Carousel
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
              >
                {resData.images.map((data, index) => (
                  <Box key={index} sx={{ width: "100%", height: "400px" }}>
                    <img
                      style={{
                        width: "100% !important",
                        // height: "100%",
                        height: "400px",
                        objectFit: "cover",
                      }}
                      src={data.url}
                      alt='pic'
                    />
                  </Box>
                ))}
              </Carousel>
            </Box>
            <Box
              sx={{
                width: "100%",
                pl: { lg: "20px", md: "20px", sm: "0px", xs: "0px" },
                "& > p, div": {
                  marginBottom: "10px",
                },
              }}
            >
              <PageTitle sx={{ textAlign: "start" }}>{resData.name}</PageTitle>
              <Typography>{resData.description}</Typography>

              <PageTitle sx={{ fontSize: "18px", textAlign: "start" }}>
                Price
              </PageTitle>
              <Box
                sx={{
                  border: " 1px solid #D9D9D9",
                  width: "218px",
                  height: "35px",
                  borderRadius: "10px",
                  background: "#2B2B2B",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ pl: "20px" }}>{resData.price}$</Typography>
              </Box>
              <Box
                sx={{
                  border: " 1px solid #D9D9D9",
                  width: "218px",
                  // height: "35px",
                  borderRadius: "10px",
                  background: "#2B2B2B",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                onClick={handleClick}
                onMouseOver={handleClick}
                onMouseOut={handleCloseDialog}
              >
                <Typography sx={{ pl: "20px", fontFamily: "Blinker" }}>
                  Estimated {personName}:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ pl: "20px", fontFamily: "Blinker" }}>
                    {amountInToken.toFixed(10)}{" "}
                  </Typography>
                  <ArrowDownwardIcon sx={{ fontSize: "17px", ml: "10px" }} />
                </Box>
              </Box>
              {/* <Box sx={{ mt: 3, mb: 3 }}>
                <Label
                  id='demo-controlled-open-select-label'
                  sx={{ fontWeight: 400, mb: 2, fontSize: "13px" }}
                >
                  Select Currency
                </Label>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  open={openSelect}
                  // label='Category'

                  required
                  fullWidth
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={personName}
                  name='role'
                  // label='Role'
                  onChange={handleChangeSelect}
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
                    // height: "30px",
                    // mb: 3,
                    // width: "100%",
                    // maxWidth: "100%",
                    // background: "black",

                    width: { lg: "70%", md: "70%", sm: "100%", xs: "100%" },
                    "& .css-zifabg-MuiInputBase-root": {
                      // width: "30vw !important",
                      marginBottom: "0px !important",
                    },
                    "& .MuiInputBase-root": {
                      marginBottom: "0px !important",
                    },
                  }}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={"ETH"}>ETH</MenuItem>
                  <MenuItem value={"BNB"}>BNB</MenuItem>
                  <MenuItem value={"USDT"}>USDC ETH</MenuItem>
                  <MenuItem value={"USDC"}>USDC ETH</MenuItem>
                  <MenuItem value={"USDC"}>USDC BNB</MenuItem>
                  <MenuItem value={"BUSDC"}>BUSDC BSC</MenuItem>
                  <MenuItem value={"WBTC"}>WBTC ETH</MenuItem>
                  <MenuItem value={"BUSD"}>BUSD ETH</MenuItem>
                  <MenuItem value={"BUSD"}>BUSD BNB</MenuItem>
                  <MenuItem value={"DAI"}>DAI BNB</MenuItem>
                  <MenuItem value={"DAI"}>DAI ETH</MenuItem>
                  <MenuItem value={"MATIC"}>MATIC POLYGON</MenuItem>
                  <MenuItem value={"MATIC"}>USDT MATIC</MenuItem>
                </Select>
              </Box> */}

              {/* <ButtonGroup sx={{ color: "white", height: "30px", mt: 3 }}>
                <Button onClick={handleDec} sx={{ color: "white" }}>
                  -
                </Button>
                <Button sx={{ color: "white" }}>{count}</Button>
                <Button onClick={handleInc} sx={{ color: "white" }}>
                  +
                </Button>
              </ButtonGroup> */}

              <Box
                sx={{
                  width: { lg: "318px", md: "318px", sm: "280px", xs: "240px" },
                  height: "35px",
                  cursor: "pointer",
                  background: "#2B2B2B",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
                onClick={handleAddCart}
              >
                <ShoppingCartOutlinedIcon />
                <Typography sx={{ ml: "10px" }}>Add to cart</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src='/assets/verified.png' alt='verified' />
                <Typography sx={{ ml: "10px" }}>
                  Instant Digital Delivery
                </Typography>
              </Box>
              <Accordion
                sx={{
                  backgroundColor: "#151617",
                  color: "text.primary",
                  // borderRadius: "10px",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: "text.primary", pt: "20px" }}
                    />
                  }
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{resData.description}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  backgroundColor: "#151617",
                  color: "text.primary",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: "text.primary", pt: "20px" }}
                    />
                  }
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>How to Redeem</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        )}
      </HeadComponent>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        sx={{
          maxHeight: "250px",
          // minWidth: "350px !important",
          mt: 2,
          mt: "1px",
          "& .MuiMenu-paper": {
            backgroundColor: "#2b2b2b",
          },
        }}
      >
        <MenuItem onClick={() => handleConversionChange("ETH")}>
          <img
            src='/assets/etherium.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          ETH
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("BNB")}>
          {" "}
          <img
            src='/assets/b3.png'
            style={{ width: "22px", marginRight: 10 }}
          />{" "}
          BNB
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("USDT")}>
          <img
            src='/assets/b4.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          USDC ETH
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("USDC")}>
          <img
            src='/assets/b5.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          USDC ETH
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("USDC")}>
          <img
            src='/assets/b3.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          USDC BNB
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("BUSDC")}>
          <img
            src='/assets/b2.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          BUSDC BSC
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("WBTC")}>
          <img
            src='/assets/wbtc.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          WBTC ETH
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("BUSD")}>
          <img
            src='/assets/b2.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          BUSD ETH
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("BUSD")}>
          <img
            src='/assets/b2.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          BUSD BNB
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("DAI")}>
          <img
            src='/assets/dai.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          DAI BNB
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("DAI")}>
          <img
            src='/assets/dai.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          DAI ETH
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("MATIC")}>
          <img
            src='/assets/polygonlogo.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          MATIC POLYGON
        </MenuItem>
        <MenuItem onClick={() => handleConversionChange("MATIC")}>
          <img
            src='/assets/polygonlogo.png'
            style={{ width: "22px", marginRight: 10 }}
          />
          USDT MATIC
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SingleProduct;
