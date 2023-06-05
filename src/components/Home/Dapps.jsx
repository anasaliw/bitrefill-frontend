import React, { useState, useEffect } from "react";
import { HeadComponent, NavBtn, PageTitle } from "../../Styles/CommonStyles";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllProductsUserAction } from "../../Redux/actions";

const Dapps = () => {
  const { category } = useParams();
  console.log("category", category);
  // const [category, setCategory] = useState("dapps");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let gte = 0;
  let lte = 999999999;

  const fetchData = async () => {
    const res = await dispatch(AllProductsUserAction(gte, lte, category));
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
          {category.toUpperCase()}
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
                  // style={{ width: "100%" }}
                  src={data.images[0].url}
                  style={{
                    width: "100%",
                    maxHeight: "296px",
                    minHeight: "296px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
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

export default Dapps;
