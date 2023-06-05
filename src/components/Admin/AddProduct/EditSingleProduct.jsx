import {
  Box,
  MenuItem,
  Select,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
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
  SingleProductAction,
  UpdateProductAction,
  getAllCategoriesActionUpdated,
} from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
export const textFieldStyledMultiline = {
  color: "white",
  borderRadius: "10px",
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
const EditSingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openProduct, setOpenProduct] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [images, setImages] = React.useState(null);
  const [pageLoading, setLoading] = React.useState(false);
  const [productType, setProductType] = React.useState("");
  const [stock, setStock] = React.useState(0);
  const [productId, setProductId] = React.useState("");
  const [arrayOfRoles, setArrayOfRoles] = React.useState();

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };
  const fetchCategories = async () => {
    const response = await dispatch(getAllCategoriesActionUpdated());
    const resData = response?.data?.categories;
    const pushedValues = [];
    for (let i = 0; i < resData?.length; i++) {
      const categoryName = resData[i]?.category;
      const categoryId = resData[i]?._id;
      pushedValues.push({ categoryId: categoryId, category: categoryName });
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

  const handleChangeProductType = (event) => {
    setProductType(event.target.value);
    // console.log(category);
  };
  const handleCloseProduct = () => {
    setOpenProduct(false);
  };

  const handleOpenProduct = () => {
    setOpenProduct(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const avatarFileRef = useRef(null);

  const fetch = async () => {
    const response = await dispatch(SingleProductAction(id));
    console.log(response?.data?.product?.category?.category);
    setCategory(response?.data?.product?.category?.category);
    setPrice(response?.data?.product?.price);
    setTitle(response?.data?.product?.name);
    setDescription(response?.data?.product?.description);
    setProductId(response?.data?.product?._id);
    setStock(response?.data?.product?.stock);
    setProductType(response?.data?.product?.productType);
  };
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
  useEffect(() => {
    fetch();
  }, []);

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
      UpdateProductAction(
        title,
        price,
        description,
        category,
        images,
        stock,
        productType,
        productId
      )
    );
    if (response?.data?.success === true) {
      setLoading(false);
      setTitle("");
      setCategory("");
      setDescription("");
      setPrice("");
    } else {
      setLoading(false);
    }
  };
  const { loading, order } = useSelector((state) => state.UpdateProductReducer);

  console.log(loading);
  return (
    <>
      <Layout>
        <Box sx={{ mt: "64px", mb: 5 }}>
          <HeadComponent>
            <NavBtn
              onClick={() => navigate("/allProducts")}
              sx={{ mb: 5, mt: 2 }}
            >
              Back
            </NavBtn>
            {false ? (
              <LoadingSkeleton />
            ) : (
              <Box>
                <Title sx={{ textAlign: "center", mb: 7 }}>
                  Edit a Product
                </Title>
                <form
                  style={{
                    display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                    flexDirection: "column",
                  }}
                  onSubmit={handleSubmit}
                >
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Product Title
                  </Label>
                  <CssTextField
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoComplete='off'
                    sx={{
                      width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Product Price
                  </Label>
                  <CssTextField
                    type='number'
                    name='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    autoComplete='off'
                    required
                    sx={{
                      width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }}
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Product Description
                  </Label>
                  <CssTextField
                    type='text'
                    autoComplete='off'
                    name='description'
                    id='outlined-multiline-static'
                    //   label="Multiline"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    sx={{
                      width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }}
                    InputProps={{
                      style: textFieldStyledMultiline,
                    }}
                  />
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Available Stock
                  </Label>
                  <CssTextField
                    type='text'
                    // name='description'
                    id='outlined-multiline-static'
                    //   label="Multiline"
                    // multiline
                    autoComplete='off'
                    rows={4}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    sx={{
                      width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }}
                    InputProps={{
                      style: textFieldStyledMultiline,
                    }}
                  />
                  <Label
                    id='demo-controlled-open-select-label'
                    sx={{ fontWeight: 400, mb: "10px" }}
                  >
                    Product Type
                  </Label>
                  <Select
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    // autoComplete='off'
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
                      width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"physical"}>Physical</MenuItem>
                    <MenuItem value={"digital"}>digital</MenuItem>
                  </Select>
                  <Label
                    id='demo-controlled-open-select-label'
                    sx={{ fontWeight: 400, mb: "10px" }}
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
                    // fullWidth
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
                      height: "40px",
                      mb: 2,
                      width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
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
                  <input
                    type='file'
                    name='productImages'
                    ref={avatarFileRef}
                    hidden
                    // accept='image/*'
                    multiple
                    onChange={handlePicsUpload}
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
                    loading={pageLoading}
                    loadingIndicator='Adding…'
                    type='submit'
                    disabled={images === null ? true : false}
                    sx={{
                      mt: 5,
                      margin: "20px auto",
                      width: { lg: "20vw", md: "30vw", sm: "60vw", xs: "80vw" },
                    }}
                  >
                    Update
                  </LoadingBtn>
                </form>
              </Box>
            )}
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default EditSingleProduct;
