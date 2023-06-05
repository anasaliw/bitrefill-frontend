import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableBody,
} from "@mui/material";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../../Styles/CommonStyles";
import { useDispatch, useSelector } from "react-redux";
import { DeleteRoleAction, GetAllRoleAction } from "../../../Redux/actions";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import { useNavigate } from "react-router-dom";
import { GetEmployeeDetailsAction } from "../../../Redux/actions/AdminActions";
import { checkPermissionAction } from "../../../Redux/actions/checkPermissionAction";

const AllRoles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reHit, setReHit] = React.useState(false);

  //Deleting Role
  const DeleteRoles = (id) => {
    dispatch(DeleteRoleAction(id));
    setReHit(!reHit);
  };

  const fetchRoles = () => {
    dispatch(GetAllRoleAction());
  };
  const { loading, roles } = useSelector((state) => state.GetAllRoleReducer);
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

  useEffect(() => {
    fetchRoles();
    fetchUserDetails();
    RunThePermissionFunction();
  }, [reHit]);
  console.log(roles);
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
            <ComponentTitle>All Roles</ComponentTitle>
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
                        Role Title
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                        align='center'
                      >
                        Total Permissions
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
                    {roles?.data?.roles?.map((row, index) => (
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
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell align='center' component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell align='center' component='th' scope='row'>
                          {row?.role}
                        </TableCell>

                        <TableCell align='center'>
                          {row?.permissions.length}
                        </TableCell>

                        <TableCell
                          align='center'
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {handlePermissionCheck("updateRole") ? (
                            <Box
                              onClick={() =>
                                navigate(`/editSingleRole/${row?._id}`)
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
                          {handlePermissionCheck("deleteRole") ? (
                            <Box
                              onClick={() => DeleteRoles(row?._id)}
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
            )}
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default AllRoles;
