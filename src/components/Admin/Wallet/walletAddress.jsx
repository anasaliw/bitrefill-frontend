import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Box, Grid } from "@mui/material";
import {
  ComponentTitle,
  CssTextField,
  HeadComponent,
  Label,
  LoadingBtn,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetLatestWalletAddressAction,
  WalletAddressAction,
} from "../../../Redux/actions";
import { textFieldStyledMultiline } from "../AddProduct/EditSingleProduct";
const walletAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ok");
    const res = await dispatch(WalletAddressAction(walletAddress));
    if (res.data.success === true) {
      navigate("/dashboard");
    }
  };
  //   const fetchAddress=()=>{
  //    const res= dispatch(GetLatestWalletAddressAction())
  //    console.log(res)
  //    setWalletAddress(res?.data)
  //   }
  //   useEffect(()=>{
  //     fetchAddress()
  //   },[])

  return (
    <>
      <Layout>
        <Box sx={{ marginTop: "-44px", minHeight: "80vh" }}>
          <HeadComponent>
            <NavBtn
              onClick={() => navigate("/dashboard")}
              sx={{ mb: 5, mt: 2 }}
            >
              Back
            </NavBtn>

            <Title sx={{ mb: 7 }}>Add Wallet Address</Title>

            <form
              style={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <Label sx={{ mb: 2, textAlign: "start" }}>
                Enter Wallet Address
              </Label>
              <CssTextField
                multiline
                type='text'
                name='accTitle'
                autoComplete='off'
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                // fullWidth
                required
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyledMultiline,
                }}
              />
              <NavBtn type='submit' sx={{ width: "100px" }}>
                Update
              </NavBtn>
            </form>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default walletAddress;
