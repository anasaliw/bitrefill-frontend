import {
  styled,
  Box,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Slider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  CssTextField,
  GridHeader,
  HeadComponent,
  Label,
  NavBtn,
  PageTitle,
  Title,
  textFieldStyled,
} from "../../Styles/CommonStyles";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  AllProductsUserAction,
  GetAllCategoriesAction,
  getAllCategoriesActionUpdated,
} from "../../Redux/actions";
import { DataProvider } from "../../Context/ContextAPI";
import Navbar from "../Navbar/Navbar";
import { textFieldStyledMultiline } from "../Admin/AddProduct/AddProduct";
import { SearchNormal } from "iconsax-react";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  //   background: "transparent",
  // borderRadius: "20px",
  maxHeight: "30px !important",

  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .MuiInputBase-root": {
    borderRadius: "20px",
  },

  "& .MuiInputBase-input": {
    borderRadius: "20px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.transparent,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contract, setContract] = useState();
  const [open, setOpen] = useState();
  const [dapps, setDapps] = useState();
  const [gte, setGte] = useState(0);
  const [lte, setLte] = useState(100000);
  const [guides, setGuides] = useState();
  const [personName, setPersonName] = useState();
  const [arrayOfRoles, setArrayOfRoles] = useState();
  const [categorizedProducts, setCategorizedProducts] = useState();
  const [value, setValue] = React.useState([0, 1000000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("range2", newValue);
    setGte(newValue[0]);
    setLte(newValue[1]);
  };

  const fetchProduct = async () => {
    console.log("hiting");
    const response = await dispatch(
      AllProductsUserAction(gte, lte, personName)
    );
    console.log("check", response);
    const resData = response?.data?.products;
    console.log(resData);
    // ! For Contracts
    let contractsCategory = await resData.filter(
      (data) => data.category === "contracts"
    );
    setDapps(resData);
    return resData;
  };

  // useEffect(() => {

  // }, []);

  // console.log("dapps", dapps);
  // console.log("contract", contract);
  // console.log("guide", guides);

  const { loading, products } = useSelector(
    (state) => state.AllProductsUserReducer
  );
  // console.log(products);
  const loginCheck = JSON.parse(localStorage.getItem("data"));
  console.log(loginCheck);
  // const { userRole, setUserRole } = useContext(DataProvider);
  const fetchCategories = async () => {
    const response = await dispatch(GetAllCategoriesAction());
    // console.log(response.data.categories);
    const resData = response?.data?.categories;
    console.log("categories", resData);
    const pushedValues = [];
    // for (let i = 0; i < resData?.length; i++) {
    //   const data = resData[i]?.category;
    //   pushedValues.push(data);
    // }
    // // setArrayOfRoles(response?.data?.categories);
    // console.log(pushedValues);
    setArrayOfRoles(resData);
    console.log("products", products);
    return resData;
  };

  const [productType, setProductType] = useState();
  const [productTypeDigital, setProductTypeDigital] = useState();
  const fetchDataDynamic = async () => {
    // ! Dynamic Home page of categories starts here
    const items = await fetchProduct();
    const itemCategories = await fetchCategories();
    let dynamicHome = [];
    let dynamicObject = { categoryName: "", categoryList: [] };
    console.log("itemSS", items);
    // console.log("itemCategories", itemCategories);
    for (let i = 0; i < itemCategories.length; i++) {
      dynamicObject.categoryName = itemCategories[i];
      let filteredCategory = await items.filter(
        (data) => data.category.category.toLowerCase() === itemCategories[i]
      );
      // console.log("items1", filteredCategory);
      dynamicObject.categoryList = filteredCategory;
      // console.log("dynamic", dynamicObject);
      dynamicHome.push(dynamicObject);
      dynamicObject = { categoryName: "", categoryList: [] };
    }
    // console.log("dynamic", dynamicHome);
    setContract(dynamicHome);
    // ! Dynamic Home page of categories Ends here

    // ! Finding if product is digital or not

    // let filteredPhysicalProduct = await items.filter((data) =>
    //   console.log("hittingS", data)
    // );
  };
  console.log("type", productType);

  const fetchAllProduct = async () => {
    const res = await dispatch(AllProductsUserAction());
    console.log("checkItem", res?.data?.products);
    if (personName === "physical") {
      let filteredPhysicalProduct = await res?.data?.products.filter(
        (data) => data.productType === "physical"
      );
      setProductType(filteredPhysicalProduct);
    }
    if (personName === "digital") {
      let filteredPhysicalProduct = await res?.data?.products.filter(
        (data) => data.productType === "digital"
      );
      setProductType(filteredPhysicalProduct);
    }
  };
  console.log("checkType", productType);
  useEffect(() => {
    fetchAllProduct();
  }, [personName]);

  useEffect(() => {
    fetchDataDynamic();
  }, []);
  const [showProductType, setShowProductType] = useState(false);
  console.log("person", personName);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    if (value === "") {
      setShowAllProducts(true);
    } else {
      setShowAllProducts(false);
      setShowProductType(false);
    }
    if (value === "byCategory") {
      setPersonName();
      setShowAllProducts(false);
      setShowProductType(false);
    }
    if (value === "physical" || value === "digital") {
      console.log();
      // setPersonName();
      setShowAllProducts(false);
      setShowProductType(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const fetchDynamic = async () => {
    const res = await dispatch(AllProductsUserAction(gte, lte, personName));
    console.log(res?.data?.products);
    setCategorizedProducts(res?.data?.products);
  };
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchDynamic();
  }, [personName, gte, lte]);

  return (
    <>
      <Navbar />
      <Dialog
        PaperProps={{
          sx: {
            backgroundColor: "#2b2b2b",
            minWidth: "267px",
            minHeight: "250px",
          },
        }}
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Filter By Price</DialogTitle>
        <DialogContent>
          {/* <Box sx={{}}>
            <Label sx={{ textAlign: "start" }}>Greater than</Label>

            <CssTextField
              type='text'
              // name='description'
              id='outlined-multiline-static'
              //   label="Multiline"
              // multiline
              rows={4}
              fullWidth
              value={gte}
              onChange={(e) => setGte(e.target.value)}
              required
              sx={
                {
                  // width: { lg: "20vw", md: "20vw", sm: "70vw", xs: "80vw" },
                }
              }
              InputProps={{
                style: textFieldStyled,
              }}
            />
          </Box> */}
          <Box>
            {/* <Label sx={{ textAlign: "start" }}>Less Than</Label>

            <CssTextField
              type='text'
              // name='description'
              id='outlined-multiline-static'
              //   label="Multiline"
              // multiline
              rows={4}
              fullWidth
              value={lte}
              onChange={(e) => setLte(e.target.value)}
              required
              sx={
                {
                  // width: { lg: "20vw", md: "20vw", sm: "70vw", xs: "80vw" },
                }
              }
              InputProps={{
                style: textFieldStyled,
              }}
            /> */}
            <Slider
              sx={{
                marginTop: "30px",
                "& .MuiSlider-thumb": {
                  color: "#00f902",
                  border: "3px solid white",
                },
                "& 	.MuiSlider-track": {
                  minHeight: "10px",
                  background:
                    "linear-gradient( 270deg, #00f902 -16.36%, rgba(99, 250, 6, 0) 190% )",
                },
              }}
              getAriaLabel={() => "Price Range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay='auto'
              min={0}
              max={100000}
              getAriaValueText={valuetext}
            />
            <Label
              id='demo-controlled-open-select-label'
              sx={{ fontWeight: 400, mb: "10px", fontSize: "13px" }}
            >
              Select Category
            </Label>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              open={open}
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
                      maxHeight: "250px",
                      backgroundColor: "black",
                      overflowY: "scroll",
                      "& .Mui-selected": {
                        background: "green !important",
                      },
                      "& .Mui-selected:hover": {
                        background:
                          "linear-gradient( 270deg,#00f902 -16.36%,rgba(99, 250, 6, 0) 190%) !important",
                      },
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
                width: "100%",

                "& .css-zifabg-MuiInputBase-root": {
                  // width: "30vw !important",
                  marginBottom: "0px !important",
                },
                "& .MuiInputBase-root": {
                  marginBottom: "0px !important",
                },
                "& .css-1uwzc1h-MuiSelect-select-MuiInputBase-input": {
                  borderColor: "#00f902",
                },
              }}
              input={<BootstrapInput />}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"byCategory"}>By Category</MenuItem>
              <MenuItem value={"physical"}>Goods</MenuItem>
              <MenuItem value={"digital"}>Digital products</MenuItem>
              {arrayOfRoles?.map((data, index) => (
                <MenuItem key={index} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            {/* </FormControl> */}
            {/* <SearchNormal
              Title='search'
              style={{
                marginLeft: 10,
                marginTop: 7,
                cursor: "pointer",
                "&:hover": {
                  color: "green",
                },
              }}
              onClick={fetchProduct}
            /> */}
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <NavBtn onClick={handleDialogClose} autoFocus>
            Done
          </NavBtn>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          minHeight: "396px",
          background: "#202020",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   width: "100vw",
          flexDirection: "column",
          mt: "64px",
          textAlign: "center",
          p: { lg: "0 80px", md: "0 30px", sm: "0 15px", xs: "0 15px" },
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { lg: "40px", md: "30px", sm: "25px", xs: "25px" },
            lineHeight: "48.41px",
            color: "text.primary",
          }}
        >
          Are you in hurry?
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: "40px", md: "30px", sm: "25px", xs: "25px" },
            fontWeight: 600,
            lineHeight: "48.41px",
            color: "text.primary",
          }}
        >
          Buy ready made Web3 Softwares, Dapps, Contracts...{" "}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { lg: "40px", md: "30px", sm: "25px", xs: "25px" },
            mt: "50px",
            // lineHeight: "48.41px",
            color: "white",
          }}
        >
          Pay Directory in cryptocurrencies
        </Typography>
      </Box>
      <HeadComponent>
        <PageTitle>Product</PageTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
            mt: 3,
          }}
          // sx={{  }}
        >
          <Box
            onClick={handleDialogOpen}
            sx={{
              display: "flex",
              outline: "1px solid white",
              padding: "5px 8px 5px 5px",
              height: "24px",
              borderRadius: "10px",
              cursor: "pointer",
              mt: 4,
              ml: "auto",
            }}
          >
            <FilterAltOutlinedIcon />
            <Typography>Filters</Typography>
          </Box>
        </Box>
        {showProductType ? (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {productType?.map((data, index) => {
              // if (index >= 4) return "";
              return (
                <Grid
                  key={index}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  item
                  onClick={() => navigate(`/product/${data._id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <img
                    style={{
                      width: "100%",
                      maxHeight: "218px",
                      minHeight: "218px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    src={data?.images[0]?.url}
                    alt='pic'
                  />
                  <Typography>{data.name}</Typography>
                  <Typography>{data.price}$</Typography>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <>
            {showAllProducts ? (
              <>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {dapps?.map((data, index) => {
                    // if (index >= 4) return "";
                    return (
                      <Grid
                        key={index}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        item
                        onClick={() => navigate(`/product/${data._id}`)}
                        sx={{ cursor: "pointer" }}
                      >
                        <img
                          style={{
                            width: "100%",
                            maxHeight: "218px",
                            minHeight: "218px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          src={data?.images[0]?.url}
                          alt='pic'
                        />
                        <Typography>{data.name}</Typography>
                        <Typography>{data.price}$</Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <>
                {personName ? (
                  <>
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                      {categorizedProducts?.map((data) => (
                        <Grid
                          lg={3}
                          md={4}
                          sm={6}
                          xs={12}
                          item
                          sx={{ color: "white", cursor: "pointer" }}
                          onClick={() => navigate(`/product/${data._id}`)}
                        >
                          <img
                            // style={{ width: "100%" }}
                            src={data?.images[0]?.url}
                            style={{
                              width: "100%",
                              maxHeight: "218px",
                              minHeight: "218px",
                              objectFit: "contain",
                              borderRadius: "10px",
                            }}
                            alt='pic'
                          />
                          <Typography>{data.name}</Typography>
                          <Typography>{data.price}$</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Box sx={{ color: "text.primary", mt: 2 }}>
                      <GridHeader>
                        {/* <PageTitle>Contracts</PageTitle> */}
                        <Typography
                          sx={{ cursor: "pointer" }}
                          onClick={() => navigate("/contracts")}
                        >
                          {/* See All */}
                        </Typography>
                      </GridHeader>
                      {contract?.map((data, index) => (
                        <React.Fragment key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              m: "20px 0px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                letterSpacing: "1.2px",
                                fontSize: "20px",
                              }}
                            >
                              {data.categoryName.toUpperCase()}
                            </Typography>
                            <Link
                              to={`/dapps/${data.categoryName}`}
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              See All
                            </Link>
                          </Box>
                          <Grid container spacing={3}>
                            {data.categoryList.map((list, index2) => {
                              if (index2 >= 4) return "";
                              return (
                                <Grid
                                  key={index2}
                                  lg={3}
                                  md={4}
                                  sm={6}
                                  xs={12}
                                  item
                                  onClick={() =>
                                    navigate(`/product/${list._id}`)
                                  }
                                  sx={{ cursor: "pointer", width: "100%" }}
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      maxHeight: "218px",
                                      minHeight: "218px",
                                      objectFit: "cover",
                                      borderRadius: "10px",
                                    }}
                                    src={list?.images[0]?.url}
                                    alt='pic'
                                  />
                                  <Typography>{list.name}</Typography>
                                  <Typography>{list.price}$</Typography>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </React.Fragment>
                      ))}
                      {/* <Grid container spacing={3}>
                  {contract?.map((data, index) => {
                    // if (index >= 4) return "";
                    return (
                      <Grid
                        key={index}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        item
                        onClick={() => navigate(`/product/${data._id}`)}
                        sx={{ cursor: "pointer" }}
                      >
                        <img
                          style={{
                            width: "100%",
                            maxHeight: "296px",
                            minHeight: "296px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          src={data?.images[0]?.url}
                          alt='pic'
                        />
                        <Typography>{data.name}</Typography>
                        <Typography>{data.price}</Typography>
                      </Grid>
                    );
                  })}
                </Grid> */}
                    </Box>
                    {/* <Box sx={{ color: "text.primary" }}>
                <GridHeader>
                  <PageTitle>Dapps</PageTitle>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    // onClick={() => navigate(`/product/${data._id}`)}
                    onClick={() => navigate(`/dapps`)}
                  >
                    See All
                  </Typography>
                </GridHeader>
                <Grid container spacing={3}>
                  {dapps?.map((data, index) => {
                    if (index >= 4) return "";
                    return (
                      <Grid
                        key={index}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        item
                        onClick={() => navigate(`/product/${data._id}`)}
                        sx={{ cursor: "pointer" }}
                      >
                        <img
                          style={{
                            borderRadius: "10px",
                            width: "100%",
                            maxHeight: "296px",
                            minHeight: "296px",
                            objectFit: "cover",
                          }}
                          src={data.images[0].url}
                          alt='pic'
                        />
                        <Typography>{data.name}</Typography>
                        <Typography>{data.price}</Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ color: "text.primary" }}>
                <GridHeader>
                  <PageTitle>Guides</PageTitle>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/guide`)}
                  >
                    See All
                  </Typography>
                </GridHeader>
                <Grid container spacing={3}>
                  {guides?.map((data, index) => {
                    if (index >= 4) return "";
                    return (
                      <Grid
                        key={index}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        item
                        onClick={() => navigate(`/product/${data._id}`)}
                        sx={{ cursor: "pointer" }}
                      >
                        <img
                          style={{
                            borderRadius: "10px",
                            width: "100%",
                            maxHeight: "296px",
                            minHeight: "296px",
                            objectFit: "cover",
                          }}
                          src={data.images[0].url}
                          alt='pic'
                        />
                        <Typography>{data.name}</Typography>
                        <Typography>{data.price}</Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box> */}
                  </>
                )}
              </>
            )}
          </>
        )}
      </HeadComponent>
    </>
  );
};

export default Home;
