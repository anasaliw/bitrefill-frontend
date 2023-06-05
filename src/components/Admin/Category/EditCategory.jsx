import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Box } from "@mui/material";
import {
  ComponentTitle,
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  AddCategoryAction,
  EditCategoryAction,
  GetSingleCategoryAction,
} from "../../../Redux/actions";
import EditSingleProduct from "../AddProduct/EditSingleProduct";
const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const fetchSingle = async () => {
    const res = await dispatch(GetSingleCategoryAction(id));
    console.log(res?.data?.category?.category);
    setCategory(res?.data?.category?.category);
  };
  useEffect(() => {
    fetchSingle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(EditCategoryAction(id, category));
    console.log(res);
    if (res?.data?.success === true) {
      // navigate("/dashboard");
    }
  };

  return (
    <>
      <Layout>
        <Box sx={{ mt: "64px" }}>
          <HeadComponent>
            <NavBtn
              onClick={() => navigate("/allCategories")}
              sx={{ mb: 5, mt: 2 }}
            >
              Back
            </NavBtn>
            <ComponentTitle sx={{ mb: 2 }}>Add Category</ComponentTitle>
            <form onSubmit={handleSubmit}>
              <Label sx={{ mt: 5 }}>Category</Label>
              <CssTextField
                type='text'
                required
                name='category'
                autoComplete='off'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                // autoComplete={false}
                sx={{
                  width: { lg: "30vw", md: "30vw", sm: "60vw", xs: "80vw" },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />
              <br></br>
              <NavBtn type='submit'>Update</NavBtn>
            </form>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default EditCategory;
