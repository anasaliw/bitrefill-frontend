import {
  AppBar,
  Badge,
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./Styles.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, { useEffect, useState } from "react";
import { NavBtn, Title } from "../../Styles/CommonStyles";
import { HambergerMenu } from "iconsax-react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
const AdminNavbar = ({ func }) => {
  // const location = useLocation();
  const navigate = useNavigate();
  const responsive = useMediaQuery("(max-width:800px)");
  // const [path, setPath] = React.useState("/");
  // useEffect(() => {
  //   setPath(location.pathname);
  // }, [location.pathname]);
  // console.log(path);
  return (
    <>
      <AppBar elevation={0} sx={{ backgroundColor: "#151617" }}>
        <Toolbar>
          {responsive ? (
            <>
              <Title>Dashboard</Title>
              <Box sx={{ ml: "auto", cursor: "pointer" }}>
                <HambergerMenu />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", pl: "55px", alignItems: "center" }}>
                <Title>Dashoard</Title>
                <Typography
                  sx={{ fontWeight: 400, ml: 3, cursor: "pointer" }}
                  onClick={() => navigate("/addProduct")}
                >
                  Order history
                </Typography>
                <Typography
                  onClick={() => navigate("/orderDetails")}
                  sx={{ fontWeight: 400, ml: 3, cursor: "pointer" }}
                >
                  Order details
                </Typography>
                <Typography
                  onClick={() => navigate("/allUsers")}
                  sx={{ fontWeight: 400, ml: 3, cursor: "pointer" }}
                >
                  All Users
                </Typography>
                <Typography
                  onClick={() => navigate("/transactions")}
                  sx={{ fontWeight: 400, ml: 3, cursor: "pointer" }}
                >
                  Transactions
                </Typography>
                <TextField
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
              <NavBtn
                onClick={() => navigate("/orderDetails")}
                sx={{
                  ml: "auto",
                  mr: "10px",
                  // mr: "57px"
                }}
              >
                Exit
              </NavBtn>
              <NavBtn onClick={func} sx={{ mr: "57px" }}>
                Switch
              </NavBtn>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminNavbar;
