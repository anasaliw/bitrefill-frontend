import React, { useEffect, useState } from "react";
import {
  CssTextField,
  Label,
  LoadingBtn,
  NavBtn,
  Title,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import Footer from "../../Footer/Footer";
import { GetAllRoleAction } from "../../../Redux/actions";
import { BootstrapInput } from "../Users/EditUser";
import { useDispatch } from "react-redux";
import { registerEmployeeAction } from "../../../Redux/actions/AdminActions";
import { useNavigate } from "react-router-dom";

const RegisterEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [arrayOfRoles, setArrayOfRoles] = React.useState();
  const [role, setRole] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
    role: personName,
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const fetchAllRoll = async () => {
    const response = await dispatch(GetAllRoleAction());
    const resData = response?.roles;
    const pushedValues = [];
    for (let i = 0; i < resData.length; i++) {
      const data = resData[i].role;
      pushedValues.push(data);
    }
    setArrayOfRoles(pushedValues);
    console.log(pushedValues);
  };
  // console.log(arrayOfRoles);
  const handleRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerEmployeeAction(registerValues));
    console.log(res);

    if (res?.data?.success) {
      // setRegisterValues();
      // navigate("/dashboard");
    }
  };

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setRegisterValues({ ...registerValues, role: value });
  };

  useEffect(() => {
    fetchAllRoll();
  }, []);
  // console.log(registerValues);
  return (
    <>
      <Layout>
        <Box sx={{ mt: "104px", minHeight: "80vh", mb: 15 }}>
          <NavBtn
            onClick={() => navigate("/dashboard")}
            sx={{ mb: 5, mt: 2, ml: 10 }}
          >
            Back
          </NavBtn>
          <Box
            sx={{
              width: { lg: "50%", md: "50%", sm: "70%", xs: "85%" },
              margin: "auto",
              color: "text.primary",
              padding: "20px",
              borderRadius: "20px",
              background: "#2b2b2b",
            }}
          >
            <Box>
              <Title sx={{ textAlign: "center", mb: 7 }}>Register</Title>
              <form onSubmit={handleRegisterSubmit}>
                <Label sx={{ mt: 2 }}>Name</Label>
                <CssTextField
                  type='text'
                  name='name'
                  value={registerValues.name}
                  onChange={handleRegisterChange}
                  required
                  autoComplete='off'
                  fullWidth
                  sx={
                    {
                      // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }
                  }
                  InputProps={{
                    style: textFieldStyled,
                  }}
                />
                <Label sx={{ mt: 2 }}>Email</Label>
                <CssTextField
                  type='text'
                  autoComplete='off'
                  name='email'
                  value={registerValues.email}
                  onChange={handleRegisterChange}
                  fullWidth
                  required
                  sx={
                    {
                      // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }
                  }
                  InputProps={{
                    style: textFieldStyled,
                  }}
                />
                <Label sx={{ mt: 2 }}>Password</Label>
                <CssTextField
                  type='password'
                  name='password'
                  value={registerValues.password}
                  onChange={handleRegisterChange}
                  fullWidth
                  autoComplete='off'
                  required
                  sx={
                    {
                      // width: { lg: "30vw", md: "30vw", sm: "70vw", xs: "80vw" },
                    }
                  }
                  InputProps={{
                    style: textFieldStyled,
                  }}
                />
                <Label
                  id='demo-controlled-open-select-label'
                  sx={{ fontWeight: 400, mb: "10px" }}
                >
                  Role
                </Label>

                <Select
                  labelId='demo-controlled-open-select-label'
                  id='demo-controlled-open-select'
                  open={open}
                  required
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={registerValues.role}
                  name='role'
                  // label='Role'
                  onChange={handleChangeSelect}
                  inputProps={{
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          backgroundColor: "black",
                          "& .Mui-selected": {
                            background: "green !important",
                          },
                          "& .Mui-selected:hover": {
                            background:
                              "linear-gradient( 270deg,#00f902 -16.36%,rgba(99, 250, 6, 0) 190%) !important",
                          },
                        },
                      },
                    },
                  }}
                  fullWidth
                  sx={{
                    height: "40px",
                    "& .css-1uwzc1h-MuiSelect-select-MuiInputBase-input": {
                      borderColor: "#00f902",
                    },
                    // background: "black",
                    // width: {
                    //   lg: "25vw",
                    //   md: "25vw",
                    //   sm: "60vw",
                    //   xs: "80vw",
                    // },
                  }}
                  input={<BootstrapInput />}
                >
                  {arrayOfRoles?.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>

                <LoadingBtn
                  type='submit'
                  fullWidth
                  sx={{ mt: 3, mb: 3 }}
                  loadingPosition='end'
                  loading={loading}
                >
                  Register
                </LoadingBtn>
              </form>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default RegisterEmployee;
