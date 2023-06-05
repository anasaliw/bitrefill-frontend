import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableBody,
  styled,
  Typography,
  Switch,
  Stack,
  FormControlLabel,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useEffect, useState } from "react";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
  TableData,
  TableTitle,
} from "../../../Styles/CommonStyles";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserByAdminAction,
  getAllUsersAction,
  getUserApprovedAction,
} from "../../../Redux/actions";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import {
  GetAllEmployeeAction,
  GetEmployeeDetailsAction,
  deleteEmployeeByAdminAction,
} from "../../../Redux/actions/AdminActions";
import { checkPermissionAction } from "../../../Redux/actions/checkPermissionAction";

const usersData = [
  { firstName: "test", lastName: "user", email: "testing@gmail.com" },
  { firstName: "test", lastName: "user", email: "testing@gmail.com" },
  { firstName: "test", lastName: "user", email: "testing@gmail.com" },
  { firstName: "test", lastName: "user", email: "testing@gmail.com" },
];
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    color: "white",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    minWidth: 110,
  },
}));
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const GetAllEmployees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(GetAllEmployeeAction());
  };

  const { loading, users } = useSelector(
    (state) => state.GetAllEmployeesReducer
  );
  // console.log(users);
  console.log(users);

  //Permission Section Starts Here
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
    // console.log(permissionValidation);
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

  //Permission Section ends here

  const [reHit, setReHit] = React.useState(true);
  useEffect(() => {
    fetchData();
    fetchUserDetails();
    RunThePermissionFunction();
  }, [reHit]);

  const handleDelete = async (id) => {
    await dispatch(deleteEmployeeByAdminAction(id));
    setReHit(!reHit);
  };

  return (
    <>
      <Layout>
        <Box sx={{ mt: "64px" }}>
          <HeadComponent>
            <NavBtn
              onClick={() => navigate("/dashboard")}
              sx={{ mb: 5, mt: 2 }}
            >
              Back
            </NavBtn>
            <ComponentTitle>All Employees</ComponentTitle>
            {loading ? (
              <LoadingSkeleton />
            ) : (
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
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                        align='center'
                      >
                        Role
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
                    {users?.data?.employees?.map((row, index) => (
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

                        <TableCell align='center'>{row?.email}</TableCell>
                        <TableCell align='center'>{row?.role}</TableCell>

                        <TableCell align='center'>
                          <LightTooltip
                            placement='bottom-end'
                            sx={{ minWidth: 20 }}
                            // paperProps={{
                            //   backgroundColor: "white",
                            // }}
                            title={
                              <>
                                <Box>
                                  {handlePermissionCheck(
                                    "updateEmployeeProfile"
                                  ) ? (
                                    <Box
                                      sx={{
                                        padding: "4px 5px",
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Typography
                                        onClick={() =>
                                          navigate(
                                            `/admin/editEmployee/${row?._id}`
                                          )
                                        }
                                        sx={{
                                          padding: "0 5px",
                                          fontSize: "12px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Edit
                                      </Typography>
                                    </Box>
                                  ) : (
                                    ""
                                  )}

                                  {handlePermissionCheck(
                                    "deleteEmployeeByAdmin"
                                  ) ? (
                                    <Box
                                      sx={{
                                        padding: "4px 5px",
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      <Typography
                                        sx={{
                                          padding: "0 5px",
                                          fontSize: "12px",
                                        }}
                                      >
                                        Delete
                                      </Typography>
                                    </Box>
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </>
                            }
                          >
                            <Box
                              sx={{
                                border: "1px solid rgb(137, 138, 154)",
                                height: "30px",
                                p: 0,
                                borderRadius: "10px",
                                width: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                              // onClick={handleMenuClick}
                            >
                              <MoreHorizIcon sx={{ fontSize: "16px", p: 0 }} />
                            </Box>
                          </LightTooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default GetAllEmployees;
