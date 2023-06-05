import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  Toolbar,
  Menu,
  MenuItem,
  useMediaQuery,
  // makeStyles,
  Theme,
  Drawer,
  List,
  Divider,
  Typography,
  ListItem,
} from "@mui/material";
import "./Styles.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, { useContext, useEffect, useState } from "react";
import { NavBtn, Title } from "../../Styles/CommonStyles";
import { HambergerMenu } from "iconsax-react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { green } from "@mui/material/colors";
import { makeStyles, styled } from "@mui/styles";
import { DataProvider } from "../../Context/ContextAPI";
import {
  AllProductsUserAction,
  GetUserDetailsAction,
  logoutAction,
} from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";

export const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiPaper-root": {
      background: "black",
    },
  },
}));
const ListWrapper = styled(List)`
  position: absolute;
  color: white;
  background-color: #2b2b2b !important;
  margin-top: 1000px;
`;

const Navbar = ({ func }) => {
  const dispatch = useDispatch();
  const { products, setProducts } = useContext(DataProvider);
  const [allProducts, setAllProducts] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [showAvatar, setShowAvatar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const location = useLocation();
  const navigate = useNavigate();
  const responsive = useMediaQuery("(max-width:800px)");
  const getUser = JSON.parse(localStorage.getItem("data"));

  const loginCheck = JSON.parse(localStorage.getItem("data"));
  const { userRole, setUserRole } = useContext(DataProvider);

  const fetchUserDetails = async () => {
    await dispatch(GetUserDetailsAction());
  };
  const fetchProducts = async () => {
    const res = await dispatch(AllProductsUserAction());
    // console.log("products", res?.data);
    setAllProducts(res?.data?.products);
  };
  // console.log("Anas", searchText);
  const { loading, users } = useSelector(
    (state) => state.GetUserDetailsReducer
  );

  // console.log(users);
  useEffect(() => {
    fetchProducts();
    fetchUserDetails();
  }, []);
  useEffect(() => {
    if (getUser) {
      setShowAvatar(true);
    } else {
      setShowAvatar(false);
    }
  }, [getUser]);

  useEffect(() => {}, [products]);

  const handleLogout = async () => {
    const res = await dispatch(logoutAction());
    if (res?.data?.success === true) {
      navigate("/");
    }
    // setShowAvatar(false);
    setAnchorEl(null);
  };
  const handleCloseDrawer = async () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor='right'
        PaperProps={{
          sx: {
            width: "280px",
            background: "transparent",

            backdropFilter: "blur(30px)",
          },
        }}
      >
        <Box sx={{ m: "15px 15px 5px auto", cursor: "pointer" }}>
          <Close onClick={() => setOpen(false)} />
        </Box>
        <Box sx={{ color: "white" }}>
          <Link
            to='/'
            onClick={handleCloseDrawer}
            style={{ textDecoration: "none", marginBottom: "12px" }}
          >
            <Typography style={{ padding: "0px 12px", color: "white" }}>
              Home
            </Typography>
            <Divider style={{ backgroundColor: "gray" }} />
          </Link>
          <Link
            to='/orderDetails'
            onClick={handleCloseDrawer}
            style={{ textDecoration: "none", marginBottom: "12px" }}
          >
            <Typography style={{ padding: "0px 12px", color: "white" }}>
              Cart
            </Typography>
            <Divider style={{ backgroundColor: "gray" }} />
          </Link>
          {loginCheck ? (
            <>
              <Link
                to='/profileManagement'
                style={{ textDecoration: "none" }}
                onClick={handleCloseDrawer}
              >
                <Typography style={{ padding: "0px 12px", color: "white" }}>
                  Profile
                </Typography>
                <Divider style={{ backgroundColor: "gray" }} />
              </Link>
              <Link
                to='/userOrders'
                style={{ textDecoration: "none" }}
                onClick={handleCloseDrawer}
              >
                <Typography style={{ padding: "0px 12px", color: "white" }}>
                  Orders{" "}
                </Typography>
                <Divider style={{ backgroundColor: "gray" }} />
              </Link>
              <Link
                to='/resetPasssword'
                style={{ textDecoration: "none" }}
                onClick={handleCloseDrawer}
              >
                <Typography style={{ padding: "0px 12px", color: "white" }}>
                  Reset Password{" "}
                </Typography>
                <Divider style={{ backgroundColor: "gray" }} />
              </Link>
              <Link
                to='/userTransactions'
                style={{ textDecoration: "none", color: "white" }}
                onClick={handleCloseDrawer}
              >
                <Typography style={{ padding: "0px 12px", color: "white" }}>
                  Transactions
                </Typography>
                <Divider style={{ backgroundColor: "gray" }} />
              </Link>
              <Link
                to='/support'
                style={{ textDecoration: "none", color: "white" }}
                onClick={handleCloseDrawer}
              >
                <Typography style={{ padding: "0px 12px", color: "white" }}>
                  Support
                </Typography>
                <Divider style={{ backgroundColor: "gray" }} />
              </Link>
            </>
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ mt: "auto", mb: 2, textAlign: "center" }}>
          {loginCheck ? (
            <NavBtn onClick={handleLogout} sx={{ width: "200px" }}>
              Logout
            </NavBtn>
          ) : (
            <NavBtn
              onClick={() => navigate("/login")}
              sx={{
                width: "200px",
              }}
            >
              Login
            </NavBtn>
          )}
        </Box>
      </Drawer>
      <AppBar elevation={0} sx={{ backgroundColor: "#151617" }}>
        <Toolbar>
          {responsive ? (
            <>
              <Title>WINESHOP</Title>
              <Box sx={{ ml: "auto", cursor: "pointer" }}>
                <HambergerMenu onClick={() => setOpen(true)} />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", pl: "55px", alignItems: "center" }}>
                <Title
                  component={Link}
                  target='_blank'
                  style={{ textDecoration: "none" }}
                  to={"https://www.google.com.co/webhp"}
                >
                  WINESHOP
                </Title>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{
                      background: "gray",
                      ml: "40px",
                      borderRadius: "20px",
                    }}
                    variant='standard'
                    InputProps={{
                      disableUnderline: true,
                      color: "gray",

                      startAdornment: (
                        <InputAdornment
                          position='start'
                          sx={{ ml: "20px", color: "#FFFF", pt: "2px" }}
                        >
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                {searchText && (
                  <List
                    sx={{
                      position: "absolute",
                      backgroundColor: "#2b2b2b",
                      top: 70,
                      left: 260,
                      width: "300px",
                      borderRadius: "20px",
                    }}
                  >
                    {allProducts
                      .filter((product) =>
                        product.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((filteredText) => (
                        <ListItem
                          component={Link}
                          sx={{ color: "white" }}
                          to={`/product/${filteredText._id}`}
                          onClick={() => setSearchText("")}
                        >
                          {/* <Link
                            to={`/product/${filteredText._id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            onClick={() => setSearchText("")}
                          >
                          </Link> */}
                          {filteredText.name}
                        </ListItem>
                      ))}
                  </List>
                )}
              </Box>

              <NavBtn
                onClick={() => navigate("/orderDetails")}
                sx={{ ml: "auto", mr: "27px" }}
                startIcon={
                  <Badge
                    badgeContent={products.length}
                    sx={{ fontSize: "10px" }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
                  </Badge>
                }
              >
                Cart
              </NavBtn>
              {showAvatar ? (
                <Box
                  sx={{
                    cursor: "pointer",
                    mr: "10px",
                  }}
                  onClick={handleClick}
                  onMouseOver={handleClick}
                >
                  <Avatar
                    sx={{ mr: "52px", height: "38px", bgcolor: green[800] }}
                    src={users?.data?.user?.avatar?.url}
                  ></Avatar>
                </Box>
              ) : (
                ""
              )}

              {loginCheck ? (
                ""
              ) : (
                <NavBtn
                  onClick={() => navigate("/login")}
                  sx={{
                    mr: "52px",
                  }}
                >
                  Login
                </NavBtn>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        sx={{
          mt: "1px",
          "& .MuiMenu-paper": {
            backgroundColor: "black",
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to='/profileManagement'
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/userOrders'>
          Orders
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/userTransactions'>
          Transactions
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/resetPassword'>
          Reset Password
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/support'>
          Support
        </MenuItem>
        {/* <MenuItem onClick={handleClose} component={Link} to='/cryptoPay'>
          Crypto
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
