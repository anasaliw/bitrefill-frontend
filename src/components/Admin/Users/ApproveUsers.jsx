import { useNavigate } from "react-router-dom";
import {
  getAllUsersAction,
  getUserApprovedAction,
} from "../../../Redux/actions";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../../Styles/CommonStyles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import Layout from "../Layout/Layout";

const ApproveUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [persons, setPersons] = React.useState();
  const fetchData = async () => {
    const response = await dispatch(getAllUsersAction());
    console.log(response?.users);
    const filteredData = response?.users.filter(
      (data) => data?.approvalByAdmin === false
    );
    console.log(filteredData);
    setPersons(filteredData);
  };
  const { loading, users } = useSelector((state) => state.GetAllUsersReducer);
  const [reHit, setReHit] = React.useState(true);
  useEffect(() => {
    fetchData();
  }, [reHit]);
  const handleApprove = async (event, id) => {
    let approved;
    await dispatch(getUserApprovedAction(id, (approved = true)));
    setReHit(!reHit);
  };

  //   console.log(filteredData);
  //   setPersons(filteredData);
  //   console.log(users?.data?.users);

  return (
    <>
      <Layout>
        <Box sx={{ mt: "64px" }}>
          <HeadComponent>
            <ComponentTitle>All Users</ComponentTitle>
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
                        Username
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
                        IP Address
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                        align='center'
                      >
                        Avatar
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
                    {persons?.map((row, index) => (
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
                        <TableCell align='center' component='th' scope='row'>
                          {row?.userName}
                        </TableCell>

                        <TableCell align='center'>{row?.email}</TableCell>
                        <TableCell align='center'>{row?.userIP}</TableCell>
                        <TableCell align='center'>
                          <img
                            style={{ width: "30px", height: "30px" }}
                            src={row?.avatar.url}
                            alt='Avatar'
                          />
                        </TableCell>
                        <TableCell align='center'>
                          <NavBtn onClick={(e) => handleApprove(e, row?._id)}>
                            Approve
                          </NavBtn>
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

export default ApproveUsers;
