import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Layout from "../Layout/Layout";
import {
  ComponentTitle,
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { BootstrapInput } from "../Users/EditUser";
import { instance } from "../../../config";
import {
  CreateRollAndPermissionAction,
  GetAllEndPointsAction,
} from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Permissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let arrayOf = [];

  //   const functionTry = () => {
  //     for (let i = 0; i < permissionTry.length; i++) {
  //       const path = permissionTry[i].path;
  //       const title = permissionTry[i].title;
  //       arrayOf.push({ path: path, title: title });
  //     }
  //   };
  //   functionTry();
  console.log(arrayOf);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [payload, setPayload] = React.useState();
  const [role, setRole] = React.useState();
  console.log(personName);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      //   typeof value === "string" ? value.split(",") :
      value
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // for (let i = 0; i < personName.length; i++) {
    //   const path = personName[i].path;
    //   const method = personName[i].method;
    //   arrayOf.push({ path: path, method: method });
    // }
    // setPayload(arrayOf);
    dispatch(CreateRollAndPermissionAction(role, personName));
    setRole("");
    setPersonName([]);
  };
  console.log(payload);
  const [permission, setPermission] = useState();
  const fetchPermissions = async () => {
    const response = await dispatch(GetAllEndPointsAction());
    console.log(response?.data?.allRoutes);
    setPermission(response?.data?.allRoutes);
  };

  React.useState(() => {
    fetchPermissions();
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
            <ComponentTitle>Create Roles and Permissions</ComponentTitle>
            <form onSubmit={handleSubmit}>
              <Label sx={{ mt: 2 }}>Enter Role</Label>
              <CssTextField
                type='text'
                required
                name='password'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
                autoComplete='off'
                sx={
                  {
                    //   width: { lg: "30vw", md: "30vw", sm: "60vw", xs: "80vw" },
                  }
                }
                InputProps={{
                  style: textFieldStyled,
                }}
              />

              <>
                <Label id='demo-multiple-chip-label'>Permissions</Label>
                <Select
                  fullWidth
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  required
                  value={personName}
                  onChange={handleChange}
                  inputProps={{
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          maxHeight: "250px",
                          backgroundColor: "black",
                          overflowY: "scroll",
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
                  sx={{
                    maxHeight: "300px",
                    "& .css-1uwzc1h-MuiSelect-select-MuiInputBase-input": {
                      borderColor: "#00f902",
                    },
                  }}
                  input={<BootstrapInput />}
                  // input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value, index) => (
                        <Chip
                          sx={{ background: "#2b2b2b" }}
                          key={index}
                          label={value.title}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {permission?.map((name, index) => (
                    <MenuItem
                      key={index}
                      value={permission[index]}
                      style={getStyles(name, personName, theme)}
                    >
                      {name.title}
                    </MenuItem>
                  ))}
                </Select>
                <NavBtn type='submit' sx={{ mt: 4 }}>
                  Create Role
                </NavBtn>
              </>
            </form>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default Permissions;
