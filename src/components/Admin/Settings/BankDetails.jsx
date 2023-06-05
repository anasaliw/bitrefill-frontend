import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Box, Grid } from "@mui/material";
import {
  CssTextField,
  HeadComponent,
  Label,
  LoadingBtn,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { textFieldStyledMultiline } from "../AddProduct/EditSingleProduct";
import { useDispatch } from "react-redux";
import {
  BankDetailsAction,
  GetLatestBankDetailsAction,
} from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";

const BankDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = React.useState({
    accTitle: "",
    bankName: "",
    accNumber: Number,
    swiftCode: "",
    routingNumber: "",
    bankAddress: "",
  });
  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ok");
    const res = await dispatch(BankDetailsAction(bankDetails));
    if (res.data.success === true) {
      navigate("/dashboard");
    }
  };

  const fetchBank = async () => {
    const res = await dispatch(GetLatestBankDetailsAction());
    console.log("bank", res?.data?.accounts?.accTitle);
    setBankDetails({
      ...bankDetails,
      accTitle: res?.data?.accounts?.accTitle,
      bankName: res?.data?.accounts?.bankName,
      accNumber: res?.data?.accounts?.accNumber,
      swiftCode: res?.data?.accounts?.swiftCode,
      bankAddress: res?.data?.accounts?.bankAddress,
      routingNumber: res?.data?.accounts?.routingNumber,
    });
  };

  useEffect(() => {
    fetchBank();
  }, []);
  console.log(bankDetails);
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

            <Title sx={{ textAlign: "center", mb: 7 }}>Add Bank Details</Title>
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
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Account Title
                  </Label>
                  <CssTextField
                    type='text'
                    name='accTitle'
                    autoComplete='off'
                    value={bankDetails.accTitle}
                    onChange={handleChange}
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
                  <Label sx={{ mb: 2, textAlign: "start" }}>Bank Name</Label>
                  <CssTextField
                    type='text'
                    fullWidth
                    name='bankName'
                    value={bankDetails.bankName}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Account Number
                  </Label>
                  <CssTextField
                    type='number'
                    fullWidth
                    name='accNumber'
                    value={bankDetails.accNumber}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>Swift Code</Label>
                  <CssTextField
                    type='text'
                    id='outlined-multiline-static'
                    rows={4}
                    fullWidth
                    name='swiftCode'
                    value={bankDetails.swiftCode}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>
                    Routing Number
                  </Label>
                  <CssTextField
                    type='text'
                    fullWidth
                    name='routingNumber'
                    value={bankDetails.routingNumber}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} md={5.9} sm={12} xs={12}>
                  <Label sx={{ mb: 2, textAlign: "start" }}>Bank Address</Label>
                  <CssTextField
                    type='text'
                    fullWidth
                    name='bankAddress'
                    value={bankDetails.bankAddress}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                    sx={
                      {
                        // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                      }
                    }
                    InputProps={{
                      style: textFieldStyled,
                    }}
                  />
                </Grid>
              </Grid>

              <LoadingBtn
                // loading={loading}
                // loadingIndicator='Adding…'
                type='submit'
                // disabled={images === null ? true : false}
                sx={{
                  mt: 5,
                  margin: "20px auto",
                  width: { lg: "20vw", md: "30vw", sm: "60vw", xs: "80vw" },
                }}
              >
                Update
              </LoadingBtn>
            </form>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default BankDetails;
