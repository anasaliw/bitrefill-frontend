import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
} from "../../../Styles/CommonStyles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  DeleteCategoryAction,
  getAllCategoriesAction,
  getAllCategoriesActionUpdated,
} from "../../../Redux/actions";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import { Edit } from "iconsax-react";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { GetEmployeeDetailsAction } from "../../../Redux/actions/AdminActions";
import { checkPermissionAction } from "../../../Redux/actions/checkPermissionAction";
// import { GetAllCategoriesAction, getAllCategoriesAction } from '../../../Redux/actions'

const AllCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reHit, setReHit] = useState(false);
  const fetchCategories = async () => {
    const response = await dispatch(getAllCategoriesActionUpdated());
    console.log(response);
  };
  const handleDeleteCategory = async (id) => {
    await dispatch(DeleteCategoryAction(id));
    setReHit(!reHit);
  };

  //Permission Section Starts Here
  const fetchUserDetails = async () => {
    const res = await dispatch(GetEmployeeDetailsAction());
  };
  const RunThePermissionFunction = async () => {
    await dispatch(checkPermissionAction());
  };

  const { employees } = useSelector((state) => state.GetEmployeeDetailsReducer);
  const { permissionValidation } = useSelector(
    (state) => state.GetPermissionValidation
  );
  console.log("permissions", permissionValidation);

  const handlePermissionCheck = (validate) => {
    // console.log(permissionValidation);
    if (employees?.data?.employee?.role === "superAdmin") {
      return true;
    }
    return permissionValidation?.map((item) => {
      if (item.title === validate) {
        console.log("ok");
        return true;
      } else {
        return false;
      }
    });
  };

  //Permission Section ends here

  useEffect(() => {
    fetchCategories();
    fetchUserDetails();
    RunThePermissionFunction();
  }, [reHit]);
  const { loading, categories } = useSelector(
    (state) => state.GetAllCategoriesReducer
  );
  return (
    <Layout>
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/dashboard")} sx={{ mb: 5, mt: 2 }}>
            Back
          </NavBtn>
          <ComponentTitle sx={{ mb: 2 }}>All Categories</ComponentTitle>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {categories?.data?.categories.map((data, index) => (
                <Box
                  key={index}
                  sx={{
                    // display: "flex",
                    margin: "20px 0px",
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: "20px" }}
                      title='Ok'
                    >
                      {data.category}
                    </Typography>
                    <Box sx={{ display: "flex", ml: "auto" }}>
                      {handlePermissionCheck("updateCategory") ? (
                        <IconButton
                          onClick={() => navigate(`/editCategory/${data?._id}`)}
                        >
                          <Edit style={{ color: "white" }} size='24' />
                        </IconButton>
                      ) : (
                        ""
                      )}

                      {handlePermissionCheck("deleteCategory") ? (
                        <IconButton
                          style={{ color: "white" }}
                          onClick={() => handleDeleteCategory(data?._id)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ minHeight: "5px", backgroundColor: "gray" }}></Box>
                </Box>
              ))}
            </>
          )}
        </HeadComponent>
      </Box>
    </Layout>
  );
};

export default AllCategories;
