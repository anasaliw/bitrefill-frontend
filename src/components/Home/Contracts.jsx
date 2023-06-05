import React, { useState, useEffect } from "react";
import { HeadComponent, NavBtn, PageTitle } from "../../Styles/CommonStyles";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllProductsUserAction } from "../../Redux/actions";
const contract = [
  { img: "assets/img.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img2.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img3.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img4.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img3.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img5.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img6.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img4.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img2.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img3.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img4.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img3.png", productTitle: "Product Title", price: "20£" },
  { img: "assets/img2.png", productTitle: "Product Title", price: "20£" },
  //   { img: "assets/img.png", productTitle: "Product Title", price: "20£" },
  //   { img: "assets/img4.png", productTitle: "Product Title", price: "20£" },
];
const Contracts = () => {
  const [contracts, setContracts] = useState("contracts");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    const res = await dispatch(AllProductsUserAction(contracts));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { loading, products } = useSelector(
    (state) => state.AllProductsUserReducer
  );

  return (
    <Box sx={{ marginTop: "64px" }}>
      <HeadComponent>
        <NavBtn onClick={() => navigate("/")}>Back</NavBtn>
        <PageTitle sx={{ mt: 5 }}>Products</PageTitle>
        <PageTitle sx={{ textAlign: "start", mt: 5, mb: 3 }}>
          Contracts
        </PageTitle>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Grid container spacing={3}>
            {products?.data?.products.map((data) => (
              <Grid
                lg={3}
                md={4}
                sm={6}
                xs={12}
                item
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => navigate(`/product/${data._id}`)}
              >
                <img
                  style={{
                    width: "100%",
                    maxHeight: "296px",
                    minHeight: "296px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  src={data.images[0].url}
                  alt='pic'
                />
                <Typography>{data.name}</Typography>
                <Typography>{data.price}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </HeadComponent>
    </Box>
  );
};

export default Contracts;
