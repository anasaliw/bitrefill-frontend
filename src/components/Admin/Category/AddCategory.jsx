import React, { useState } from "react";
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
import { useNavigate } from "react-router";
import { AddCategoryAction } from "../../../Redux/actions";
const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddCategoryAction(category));
  };

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
            <ComponentTitle sx={{ mb: 2 }}>Add Category</ComponentTitle>
            <form onSubmit={handleSubmit}>
              <Label sx={{ mt: 5 }}>Category</Label>
              <CssTextField
                autoComplete='off'
                type='text'
                required
                name='category'
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
              <NavBtn type='submit'>Submit</NavBtn>
            </form>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default AddCategory;
