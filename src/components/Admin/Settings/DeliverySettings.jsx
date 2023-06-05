import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CssTextField2,
  HeadComponent,
  Label,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { Edit } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddDeliveryDateAction,
  GetAllDeliveryDatesAction,
} from "../../../Redux/actions";
import Layout from "../Layout/Layout";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";

const DeliverySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nation, setNation] = useState("");
  const [delivery, setDelivery] = useState("");
  const [rehit, setRehit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      AddDeliveryDateAction(nation.toLowerCase(), delivery)
    );
    console.log(response?.data);
    if (response?.data?.success === true) {
      setNation("");
      setDelivery("");
      setRehit(!rehit);
    }
  };

  const handleFetch = async () => {
    const res = await dispatch(GetAllDeliveryDatesAction());
    console.log(res.data.deliveries);
  };
  const { loading, deliveryDates } = useSelector(
    (state) => state.GetAllDeliveryDates
  );
  console.log(deliveryDates);
  useEffect(() => {
    handleFetch();
  }, [rehit]);

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

            <Title sx={{ textAlign: "center", mb: 7 }}>
              Add delivery details nation wise
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
              <Grid container spacing={2}>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>Country</Label>
                  <CssTextField2
                    type='text'
                    name='nation'
                    value={nation}
                    onChange={(e) => setNation(e.target.value)}
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
                    Expected Delivery
                  </Label>
                  <CssTextField2
                    type='number'
                    name='delivery'
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
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
              </Grid>
              <NavBtn sx={{ width: "100px", mt: 2 }} type='submit'>
                Submit
              </NavBtn>
            </form>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
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
                          Country
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                          }}
                          align='center'
                        >
                          Expected Date
                        </TableCell>

                        <TableCell
                          sx={{
                            fontWeight: 600,
                          }}
                          align='center'
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deliveryDates?.data?.deliveries?.map((row, index) => (
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
                            {row?.nation}
                          </TableCell>

                          <TableCell align='center'>
                            {row?.expectedDeliveryDate}
                          </TableCell>

                          <TableCell
                            align='center'
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton
                              onClick={() =>
                                navigate(`/editNation/${row?.nation}`)
                              }
                            >
                              <Edit style={{ color: "white" }} size='24' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default DeliverySettings;
