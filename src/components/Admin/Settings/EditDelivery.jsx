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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ComponentTitle,
  CssTextField2,
  HeadComponent,
  Label,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import Layout from "../Layout/Layout";
import {
  GetDeliveryDateByNationAction,
  UpdateDeliveryDate,
} from "../../../Redux/actions";

const EditDelivery = () => {
  const { nationWide } = useParams();
  //   console.log("nation", nationWide);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nation, setNation] = useState("");
  const [delivery, setDelivery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(UpdateDeliveryDate(nation, delivery));
    console.log(response?.data);
    if (response?.data?.success === true) {
      setNation("");
      setDelivery("");
      navigate("/deliverySetup");
      // }
    }
  };

  const handleFetch = async () => {
    const res = await dispatch(GetDeliveryDateByNationAction(nationWide));
    // console.log("nation", res?.data?.delivery?.nation);
    setNation(res?.data?.delivery?.nation);
    setDelivery(res?.data?.delivery?.expectedDeliveryDate);
  };

  useEffect(() => {
    handleFetch();
  }, []);
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
              Edit delivery details nation wise
            </Title>
            <ComponentTitle sx={{ m: "20px 0px" }}>
              Country: {nation}
            </ComponentTitle>
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
                  <Label sx={{ mb: 1, textAlign: "start" }}>
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
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default EditDelivery;
