import MuiAppBar from "@mui/material/AppBar";
import {
  //   MuiAppBar,
  Badge,
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  ListItem,
  List,
  ListItemButton,
  styled,
  ListItemIcon,
  useTheme,
  Drawer,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CssBaseline from "@mui/material/CssBaseline";
// import "./Styles.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, { useContext, useEffect, useState } from "react";
import { NavBtn, Title } from "../../../Styles/CommonStyles";
import { HambergerMenu, Setting } from "iconsax-react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import { Home2 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllRoleAction,
  GetUserDetailsAction,
  logoutAction,
} from "../../../Redux/actions";
import { DataProvider } from "../../../Context/ContextAPI";
import Footer from "../../Footer/Footer";
import { GetEmployeeDetailsAction } from "../../../Redux/actions/AdminActions";
import { checkPermissionAction } from "../../../Redux/actions/checkPermissionAction";

const drawerWidth = 265;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const StyledText = styled("span")(({ theme }) => ({
  fontSize: "12px",
  // fontFamily: "Inter",
  fontWeight: 400,
}));

const Layout = ({ children }) => {
  const theme = useTheme();
  let dispatch = useDispatch();
  const { checkPermissions, setCheckPermissions } = useContext(DataProvider);
  const [open, setOpen] = React.useState(true);
  const collpseDrawer = () => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
  };
  const fetchUserDetails = async () => {
    const res = await dispatch(GetEmployeeDetailsAction());
  };

  const { loading, employees } = useSelector(
    (state) => state.GetEmployeeDetailsReducer
  );

  const fetchEmployeeRoles = async () => {
    console.log(employees?.data?.employee?.role);
    const res = await dispatch(GetAllRoleAction());
    const roles = res?.roles;
    // console.log(roles);
    // for (let i = 0; i < roles.length; i++) {
    //   if (roles[i].role === users?.data?.employee?.role) {
    //     console.log(roles[i]);
    //   } else {
    //     console.log("no");
    //   }
    // }
    const data = roles.filter(
      (row, index) => row.role === employees?.data?.employee?.role
    );
    console.log("check", ...data);
    setCheckPermissions(...data);
  };

  const RunThePermissionFunction = async () => {
    await dispatch(checkPermissionAction());
  };

  const { permissionValidation } = useSelector(
    (state) => state.GetPermissionValidation
  );
  console.log("UserRole", employees?.data?.employee?.role);

  // console.log("employees", employees?.data?.employee);
  // console.log("true", employees?.data?.employee?.role === "superAdmin");
  // console.log(permissionValidation, "hamza");

  // console.log("UserRole", employees?.data?.employee?.role);

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
    // for (let z = 0; z < permissionValidation?.length; z++) {
    //   console.log(permissionValidation[z]?.title, "hamza");
    //   console.log("tiTle", permissionValidation[z]?.title);
    //   if (permissionValidation[z]?.title === validate) {
    //     // console.log("tiTle", permissionValidation[z]?.title, "hama");
    //     return true;
    //   } else if (employees?.data?.employee?.role === "superAdmin") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  };
  // console.log(handlePermissionCheck("createTax"));
  // const [reHit, setReHit] = useState(false);

  // console.log(users);
  useEffect(() => {
    RunThePermissionFunction();
    fetchUserDetails();
    fetchEmployeeRoles();

    // handlePermissionCheck();
  }, []);
  // useEffect(() => {
  //   checkPermissionsFun();
  // }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    let data = "employee";
    const response = await dispatch(logoutAction(data));
    if (response?.data?.success === true) {
      navigate("/");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const loginCheck = JSON.parse(localStorage.getItem("data"));
  // console.log(loginCheck);

  useEffect(() => {
    // if (!loginCheck) {
    //   navigate("/");
    // } else if (loginCheck?.user?.role === "user") {
    //   navigate("/");
    // } else {
    //   navigate("/dashboard");
    // }
    collpseDrawer();
  }, [loginCheck]);

  const responsive = useMediaQuery("(max-width:800px)");
  return (
    <Box sx={{ display: "flex", background: "transparent" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        elevation={0}
        sx={{ backgroundColor: "#151617" }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", pl: "55px", alignItems: "center" }}>
            <Title>Dashboard</Title>

            {/* <TextField
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
            /> */}
          </Box>

          {/* <NavBtn
            sx={{ ml: "auto", mr: "57px" }}
            onClick={() => setUserRole(!userRole)}
          >
            Switch
          </NavBtn> */}
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            background: "#2b2b2b",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              mt: "5px",
              mb: "5px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              //   src={require("./assets/b2.png")}
              src={"/assets/b2.png"}
              // src='https://res.cloudinary.com/learn2code/image/upload/v1664270968/favIcon_axui1g.png'
              width='35px'
            />
            <Typography
              sx={{ ml: "10px", fontWeight: "bold", fontSize: "20px" }}
            >
              Logo
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{ color: "white", "& > li > div > div": { color: "white" } }}>
          <ListItem sx={{ pb: 1.5, pt: 1.5 }}>
            <ListItemButton
              onClick={() => navigate("/dashboard")}
              sx={{
                pt: "0px",
                pb: "0px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "45px" }}>
                <Home2 />
              </ListItemIcon>
              <StyledText>Dashboard</StyledText>
            </ListItemButton>
          </ListItem>
          {/* <ListItem sx={{ pb: 1.5, pt: 1.5 }}>
            <ListItemButton
              onClick={() => navigate("/walletAddress")}
              sx={{
                pt: "0px",
                pb: "0px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "45px" }}>
                <Home2 />
              </ListItemIcon>
              <StyledText>Wallet Address</StyledText>
            </ListItemButton>
          </ListItem> */}
          <ListItem
            sx={{
              pt: 0,
              "& :hover": {
                background: "transparent",
              },
            }}
          >
            <ListItemButton
              sx={{
                pt: "0px",
                pb: "0px",
                "&:hover": {
                  // backgroundColor: "white",
                },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <ListItemIcon sx={{ minWidth: "45px", paddingTop: "12px" }}>
                  <Home2 style={{ color: "white" }} />
                  {/* <Home2 /> */}
                </ListItemIcon>
                <Accordion
                  disableGutters
                  // paperProps={{ sx: { backgroundColor: "red" } }}
                  sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    sx={{
                      padding: "0px 0px",
                      marginRight: "-45px",
                      // "& .MuiAccordionSummary-root": {
                      //   padding: 0,
                      // },
                      "& .MuiAccordion-root	": {
                        "& .Mui-expanded ": {
                          margin: "0px",
                        },
                        "&.MuiPaper-root-MuiAccordion-root.Mui-expanded": {
                          margin: "0px",
                        },
                      },
                    }}
                  >
                    <StyledText>Client Management</StyledText>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    {/* <ListItem> */}
                    <ListItemButton
                      // component={Link}
                      onClick={() => navigate("/allUsers")}
                      sx={{
                        pt: "5px",
                        pb: "5px",
                      }}
                    >
                      <StyledText>All Users</StyledText>
                    </ListItemButton>
                    {handlePermissionCheck("getAllOrders") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/transactions")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Transactions</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}

                    {handlePermissionCheck("getAllOrders") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/adminOrderDetails")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Order</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </ListItemButton>
          </ListItem>

          {/* "getallusers" */}

          <ListItem
            sx={{
              pt: 0,
              "& :hover": {
                background: "transparent",
              },
            }}
          >
            <ListItemButton
              sx={{
                pt: "0px",
                pb: "0px",
                "&:hover": {
                  // backgroundColor: "white",
                },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <ListItemIcon sx={{ minWidth: "45px", paddingTop: "12px" }}>
                  <ShoppingBasketIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <Accordion
                  disableGutters
                  // paperProps={{ sx: { backgroundColor: "red" } }}
                  sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    sx={{
                      padding: "0px 0px",
                      marginRight: "-41px",
                      // "& .MuiAccordionSummary-root": {
                      //   padding: 0,
                      // },
                      "& .MuiAccordion-root	": {
                        "& .Mui-expanded ": {
                          margin: "0px",
                        },
                        "&.MuiPaper-root-MuiAccordion-root.Mui-expanded": {
                          margin: "0px",
                        },
                      },
                    }}
                  >
                    <StyledText>Shop Management</StyledText>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    {/* <ListItem> */}

                    {handlePermissionCheck("createProduct") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/addProduct")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Add Product</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}

                    {handlePermissionCheck("allProductsByAdmin") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/allProducts")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>All Products</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}
                    {handlePermissionCheck("createCategory") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/addCategory")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Add Category</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}

                    {handlePermissionCheck("getAllCategories") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/allCategories")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>All Categories</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              pt: 0,
              "& :hover": {
                background: "transparent",
              },
            }}
          >
            <ListItemButton
              sx={{
                pt: "0px",
                pb: "0px",
                "&:hover": {
                  // backgroundColor: "white",
                },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <ListItemIcon sx={{ minWidth: "45px", paddingTop: "12px" }}>
                  <Setting style={{ color: "white" }} />
                </ListItemIcon>
                <Accordion
                  disableGutters
                  // paperProps={{ sx: { backgroundColor: "red" } }}
                  sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    sx={{
                      padding: "0px 0px",
                      marginRight: "3px",
                      // "& .MuiAccordionSummary-root": {
                      //   padding: 0,
                      // },
                      "& .MuiAccordion-root	": {
                        "& .Mui-expanded ": {
                          margin: "0px",
                        },
                        "&.MuiPaper-root-MuiAccordion-root.Mui-expanded": {
                          margin: "0px",
                        },
                      },
                    }}
                  >
                    <StyledText>Personnel Management</StyledText>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    {/* <ListItem> */}
                    {handlePermissionCheck("registerEmployee") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/addEmployee")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Add Personnel</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}

                    {handlePermissionCheck("getAllEmployees") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/allEmployees")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>All Personnel</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}
                    {handlePermissionCheck("createRole") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/addPermissions")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Add Roles</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}
                    {/* "getAllRoles" */}

                    {handlePermissionCheck("getAllRoles") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/allRoles")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Active Roles</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              pt: 0,
              "& :hover": {
                background: "transparent",
              },
            }}
          >
            <ListItemButton
              sx={{
                pt: "0px",
                pb: "0px",
                "&:hover": {
                  // backgroundColor: "white",
                },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <ListItemIcon sx={{ minWidth: "45px", paddingTop: "12px" }}>
                  <Setting style={{ color: "white" }} />
                </ListItemIcon>
                <Accordion
                  disableGutters
                  // paperProps={{ sx: { backgroundColor: "red" } }}
                  sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    sx={{
                      padding: "0px 0px",
                      marginRight: "-36px",

                      "& .MuiAccordion-root	": {
                        "& .Mui-expanded ": {
                          margin: "0px",
                        },
                        "&.MuiPaper-root-MuiAccordion-root.Mui-expanded": {
                          margin: "0px",
                        },
                      },
                    }}
                  >
                    <StyledText>Settings</StyledText>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    {/* <ListItem> */}
                    <ListItemButton
                      // component={Link}
                      onClick={() => navigate("/updateProfile")}
                      sx={{
                        pt: "5px",
                        pb: "5px",
                      }}
                    >
                      <StyledText>Update Profile</StyledText>
                    </ListItemButton>

                    {handlePermissionCheck("createTax") ? (
                      <ListItemButton
                        // component={Link}
                        onClick={() => navigate("/projectSettings")}
                        sx={{
                          pt: "5px",
                          pb: "5px",
                        }}
                      >
                        <StyledText>Project Setting</StyledText>
                      </ListItemButton>
                    ) : (
                      ""
                    )}
                    <ListItemButton
                      // component={Link}
                      onClick={() => navigate("/bankDetails")}
                      sx={{
                        pt: "5px",
                        pb: "5px",
                      }}
                    >
                      <StyledText>Bank Details</StyledText>
                    </ListItemButton>
                    <ListItemButton
                      // component={Link}
                      onClick={() => navigate("/deliverySetup")}
                      sx={{
                        pt: "5px",
                        pb: "5px",
                      }}
                    >
                      <StyledText>Delivery Status</StyledText>
                    </ListItemButton>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
        {employees?.data?.success === true ? (
          <>
            <Box
              sx={{
                display: "flex",
                mt: "auto",
                padding: "10px 0px 10px 30px",
                alignItems: "center",
              }}
            >
              <img
                src={employees?.data?.employee?.avatar?.url}
                style={{ height: "40px", width: "50px", borderRadius: "10px" }}
                alt='dp'
              />
              &nbsp;
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  {employees?.data?.employee?.name}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {employees?.data?.employee?.email}
                </Typography>
              </Box>
            </Box>
            <NavBtn
              sx={{ width: "80%", height: "30px", margin: "5px auto " }}
              onClick={handleLogout}
            >
              Logout
            </NavBtn>
          </>
        ) : (
          ""
        )}
      </Drawer>
      <Main open={open} sx={{ mt: "5px" }}>
        <Box sx={{ mt: "60px" }}>{children}</Box>
        <Footer />
      </Main>
    </Box>
  );
};

export default Layout;
