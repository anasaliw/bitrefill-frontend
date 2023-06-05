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
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  styled,
  TextField,
  Skeleton,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useState, useCallback } from "react";
import { SearchNormal1 } from "iconsax-react";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../../Styles/CommonStyles";
import Layout from "../Layout/Layout";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AllProductsAction, deleteProductAction } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import { GetEmployeeDetailsAction } from "../../../Redux/actions/AdminActions";
import { checkPermissionAction } from "../../../Redux/actions/checkPermissionAction";
import { CSVLink } from "react-csv";

// const CssStyledInput = styled(TextField)(({ theme }) => ({
//   "& label.Mui-focused": {
//     color: "white",
//   },
//   "& .MuiInput-underline:before": {
//     color: "white",
//     borderBottomColor: "#703D70",
//   },
//   "& .MuiInput-underline:after": {
//     color: "white",
//     borderBottomColor: "white",
//   },
//   "& #custom-css-outlined-input": {
//     color: "white",
//   },
// }));

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState();
  const [downloadProductsData, setDownloadProductsData] = useState([]);
  const [recall, setRecall] = useState();
  const { loading, products } = useSelector(
    (state) => state.AllProductsReducer
  );
  const fetchProducts = useCallback(async () => {
    const response = await dispatch(AllProductsAction());
    const data = response?.data?.products;
    setProductsData(data);
    let productDataPushed = [];
    for (let d = 0; d < data.length; d++) {
      let dataToInsert = {
        Name: data[d]?.name,
        Description: data[d]?.description,
        Category: data[d]?.category?.category,
        Price: data[d]?.price,
        ProductType: data[d]?.productType,
        Stock: data[d]?.stock,
        OrderId: data[d]?._id,
      };
      productDataPushed.push(dataToInsert);
    }
    setDownloadProductsData(productDataPushed);
    console.log("products", data);
    // console.log(response);
  }, []);
  // useEffect(() => {
  // dispatch(AllProductsAction());
  // fetchProducts();
  // }, []);
  //   console.log(products);
  const handleDelete = async (id) => {
    console.log(id);
    await dispatch(deleteProductAction(id));
    setRecall(!recall);
  };

  const fetchUserDetails = async () => {
    const res = await dispatch(GetEmployeeDetailsAction());
  };
  const RunThePermissionFunction = async () => {
    await dispatch(checkPermissionAction());
  };

  const { employees } = useSelector((state) => state.GetEmployeeDetailsReducer);
  const { permissionValidation } = useSelector(
    (state) => state.GetPermissionValidation
  );
  console.log("permissions", permissionValidation);

  const handlePermissionCheck = (validate) => {
    if (employees?.data?.employee?.role === "superAdmin") {
      return true;
    }
    return permissionValidation?.map((item) => {
      if (item.title === validate) {
        console.log("ok");
        return true;
      } else {
        return false;
      }
    });
  };
  useEffect(() => {
    fetchUserDetails();
    RunThePermissionFunction();
    fetchProducts();
  }, [recall]);
  return (
    <>
      <Layout>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Box sx={{ mt: "64px" }}>
            <HeadComponent>
              <NavBtn
                onClick={() => navigate("/dashboard")}
                sx={{ mb: 5, mt: 2 }}
              >
                Back
              </NavBtn>
              <ComponentTitle sx={{ mb: 2 }}>All Products</ComponentTitle>

              <>
                {/* <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-password'>
                    Search Products
                  </InputLabel>
                  <FilledInput
                    fullWidth
                    sx={{ width: "100%" }}
                    id='filled-adornment-password'
                    type={"text"}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton edge='end'>{<SearchNormal1 />}</IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl> */}
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
                          Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                          }}
                          align='center'
                        >
                          Category
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                          }}
                          align='center'
                        >
                          Price
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                          }}
                          align='center'
                        >
                          Sample Image
                        </TableCell>

                        <TableCell
                          sx={{
                            fontWeight: 600,
                          }}
                          align='center'
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productsData?.map((row, index) => (
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
                          <TableCell align='center' component='th' scope='row'>
                            {index + 1}
                          </TableCell>
                          <TableCell align='center' component='th' scope='row'>
                            {row?.name}
                          </TableCell>

                          <TableCell align='center'>
                            {row?.category?.category}
                          </TableCell>
                          <TableCell align='center'>{row?.price}</TableCell>
                          <TableCell align='center'>
                            <img
                              src={row?.images[0]?.url}
                              style={{ width: "30px" }}
                              alt='sample-ppic'
                            />
                          </TableCell>
                          <TableCell
                            align='center'
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {handlePermissionCheck("updateProduct") ? (
                              <Box
                                onClick={() =>
                                  navigate(`/editSingleProduct/${row?._id}`)
                                }
                                sx={{
                                  mr: "20px",
                                  "& :hover": {
                                    color: "#03D705",
                                    // background: "black",
                                  },
                                }}
                              >
                                <CreateOutlinedIcon
                                  sx={{
                                    width: "20px",
                                  }}
                                />
                              </Box>
                            ) : (
                              ""
                            )}

                            {handlePermissionCheck("deleteProduct") ? (
                              <Box
                                onClick={() => handleDelete(row?._id)}
                                sx={{
                                  //   mr: "20px",
                                  "& :hover": {
                                    color: "#03D705",
                                    // background: "black",
                                  },
                                }}
                              >
                                <DeleteOutlineOutlinedIcon
                                  sx={{ width: "20px" }}
                                />
                              </Box>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
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
                  data={downloadProductsData}
                >
                  Download
                </CSVLink>
              </>
            </HeadComponent>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default AllProducts;
