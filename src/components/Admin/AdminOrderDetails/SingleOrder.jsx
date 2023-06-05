import React from "react";
import Layout from "../Layout/Layout";
import { Box } from "@mui/material";
import { HeadComponent } from "../../../Styles/CommonStyles";

const SingleOrder = () => {
  return (
    <>
      <Layout>
        <Box sx={{ mt: "64px" }}>
          <HeadComponent>
            <ComponentTitle sx={{ mb: 2 }}>Order Details</ComponentTitle>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default SingleOrder;
