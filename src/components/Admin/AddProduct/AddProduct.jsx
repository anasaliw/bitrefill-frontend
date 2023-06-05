import {
  Box,
  MenuItem,
  Select,
  InputBase,
  styled,
  Typography,
  Grid,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import {
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  Title,
  textFieldStyled,
  LoadingBtn,
} from "../../../Styles/CommonStyles";
import { CropLandscapeOutlined } from "@mui/icons-material";
import {
  AddProductAction,
  GetAllCategoriesAction,
  getAllCategoriesActionUpdated,
} from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
export const textFieldStyledMultiline = {
  // height: "40px",
  color: "white",
  borderRadius: "10px",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [images, setImages] = React.useState(null);
  const [stock, setStock] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  // const [personName, setPersonName] = useState();
  const [arrayOfRoles, setArrayOfRoles] = useState();

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeProductType = (event) => {
    setProductType(event.target.value);
  };
  useEffect(() => {
    console.log(productType);
  }, [productType]);
  // console.log(category);

  const handleCloseProduct = () => {
    setOpenProduct(false);
  };

  const handleOpenProduct = () => {
    setOpenProduct(true);
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    //   background: "transparent",
    borderRadius: "20px",

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
  const avatarFileRef = useRef(null);

  const handlePicsUpload = (e) => {
    setImages([]);
    const files = Array.from(e.target.files);
    // console.log(typeof files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      // console.log(file);
    });
  };
  // console.log(images);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const myForm = new FormData();
    myForm.set("name", title);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    // AddProductAction(myForm)
    const response = await dispatch(
      AddProductAction(
        title,
        price,
        description,
        category.toLowerCase(),
        images,
        stock,
        productType
      )
    );
    if (response?.data?.success === true) {
      setLoading(false);
      // setTitle("");
      // setCategory("");
      // setDescription("");
      // setPrice("");
    } else {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    const response = await dispatch(getAllCategoriesActionUpdated());
    const resData = response?.data?.categories;
    const pushedValues = [];
    for (let i = 0; i < resData?.length; i++) {
      const category = resData[i]?.category;
      const categoryId = resData[i]?._id;
      pushedValues.push({ categoryId: categoryId, category: category });
    }
    // setArrayOfRoles(response?.data?.categories);
    console.log(pushedValues);

    setArrayOfRoles(pushedValues);
  };
  console.log(arrayOfRoles);
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(category);
  return (
    <Layout>
      <Box sx={{ mt: "64px", mb: 5 }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/dashboard")} sx={{ mb: 5, mt: 2 }}>
            Back
          </NavBtn>
          <Box>
            <Title sx={{ textAlign: "center", mb: 7 }}>Add a Product</Title>
            <form
              style={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Product Title
                  </Label>
                  <CssTextField
                    autoComplete='off'
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    // sx={{
                    //   width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    // }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Product Price
                  </Label>
                  <CssTextField
                    type='number'
                    name='price'
                    autoComplete='off'
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Product Description
                  </Label>
                  <CssTextField
                    type='text'
                    name='description'
                    id='outlined-multiline-static'
                    multiline
                    autoComplete='off'
                    // rows={4}
                    minRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyledMultiline,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Available Stock
                  </Label>
                  <CssTextField
                    type='text'
                    // name='description'
                    id='outlined-multiline-static'
                    //   label="Multiline"
                    // multiline
                    rows={4}
                    autoComplete='off'
                    fullWidth
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyledMultiline,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
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
                      height: "40px",
                      mb: 2,
                      // background: "black",
                      // width: { lg: "25vw", md: "25vw", sm: "60vw", xs: "80vw" },
                      // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      "& .css-1uwzc1h-MuiSelect-select-MuiInputBase-input": {
                        borderColor: "#00f902",
                      },
                    }}
                    fullWidth
                    input={<BootstrapInput />}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"physical"}>Physical</MenuItem>
                    <MenuItem value={"digital"}>digital</MenuItem>
                    {/* <MenuItem value={"controller"}>Controller</MenuItem> */}
                    {/* <MenuItem value={"superUser"}>Super User</MenuItem> */}
                  </Select>
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label
                    id='demo-controlled-open-select-label'
                    sx={{ fontWeight: 400, mb: "15px" }}
                  >
                    Category
                  </Label>

                  <Select
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    open={open}
                    required
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={category}
                    name='role'
                    fullWidth
                    // label='Role'
                    onChange={handleChangeSelect}
                    inputProps={{
                      MenuProps: {
                        MenuListProps: {
                          sx: {
                            backgroundColor: "black",
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
                      height: "30px",
                      mb: 5,
                      // background: "black",
                      // width: {
                      //   lg: "25vw",
                      //   md: "25vw",
                      //   sm: "60vw",
                      //   xs: "80vw",
                      // },
                      "& .css-1uwzc1h-MuiSelect-select-MuiInputBase-input": {
                        borderColor: "#00f902",
                      },
                    }}
                    input={<BootstrapInput />}
                  >
                    {/* <MenuItem value={""}></MenuItem> */}
                    {arrayOfRoles?.map((data, index) => (
                      <MenuItem key={index} value={data.categoryId}>
                        {data.category}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* <label style={{ marginTop: "5px" }}>
                    Category
                    <input
                      required
                      list='browsers'
                      name='myBrowser'
                      value={category}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "45px",
                        border: "1px solid white",
                        background: "transparent",
                        borderRadius: "4px",
                        color: "white",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <datalist id='browsers' style={{ width: "100vh" }}>
                    {arrayOfRoles?.map((data, index) => (
                      <option value={data} />
                    ))}
                    
                  </datalist> */}
                </Grid>
              </Grid>
              <input
                type='file'
                name='productImages'
                ref={avatarFileRef}
                hidden
                // accept='image/*'
                multiple
                onChange={handlePicsUpload}
                required
                accept='image/png, image/jpeg, image/jpg'
              />
              <NavBtn
                sx={{ width: "180px", mt: 3 }}
                onClick={() => avatarFileRef.current.click()}
              >
                Upload Images
              </NavBtn>
              {images === null ? (
                <Typography
                  sx={{ color: "red", fontSize: "10px", mt: "2px", ml: 1 }}
                >
                  Please Upload Images
                </Typography>
              ) : (
                ""
              )}
              <LoadingBtn
                loading={loading}
                loadingIndicator='Adding…'
                type='submit'
                disabled={images === null ? true : false}
                sx={{
                  mt: 5,
                  margin: "20px auto",
                  width: { lg: "20vw", md: "30vw", sm: "60vw", xs: "80vw" },
                }}
              >
                Submit
              </LoadingBtn>
            </form>
          </Box>
        </HeadComponent>
      </Box>
    </Layout>
  );
};

export default AddProduct;
