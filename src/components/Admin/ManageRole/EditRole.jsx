import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Box, Chip, Select, Typography } from "@mui/material";
import {
  ComponentTitle,
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllEndPointsAction,
  UpdateRoleAction,
  getSingleRoleAction,
} from "../../../Redux/actions";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import { BootstrapInput } from "../Users/EditUser";

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

const EditRole = () => {
  const { loading, roles } = useSelector((state) => state.getSingleRoleReducer);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [personName, setPersonName] = React.useState([]);
  const [payload, setPayload] = React.useState();
  const [role, setRole] = React.useState();
  const fetch = async () => {
    const response = await dispatch(getSingleRoleAction(id));
    console.log(response);
  };
  const [permission, setPermission] = React.useState([]);
  console.log("hello");
  const fetchPermissions = async () => {
    const response = await dispatch(GetAllEndPointsAction());
    console.log(response);
    console.log(response?.data?.allRoutes);
    setPermission(response?.data?.allRoutes);
  };

  React.useEffect(() => {
    fetchPermissions();
  }, []);

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
  useEffect(() => {
    fetch();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(UpdateRoleAction(id, role, personName));
    setRole("");
    setPersonName([]);
    setTimeout(() => {
      navigate("/allRoles");
    }, 1000);
    // setRole("");
    // setPersonName([]);
  };
  console.log(personName);

  return (
    <>
      <Layout>
        <Box sx={{ mt: "64px" }}>
          <HeadComponent>
            <NavBtn onClick={() => navigate("/allRoles")} sx={{ mb: 5, mt: 2 }}>
              Back
            </NavBtn>
            <ComponentTitle>Edit Roles</ComponentTitle>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                  Role Title :{" "}
                  <Typography variant='span'>
                    {roles?.data?.role?.role}
                  </Typography>
                </Typography>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}
                >
                  <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                    Permissions:
                  </Typography>
                  {roles?.data?.role?.permissions.map((value, index) => (
                    <Chip
                      sx={{ background: "#2b2b2b", m: "2px" }}
                      key={index}
                      label={value.title}
                    />
                  ))}
                </Box>
              </>
            )}
            <form onSubmit={handleSubmit}>
              <Label sx={{ mt: 2 }}>Update Role</Label>
              <CssTextField
                type='text'
                required
                name='password'
                autoComplete='off'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
                sx={{
                  //   width: { lg: "30vw", md: "30vw", sm: "60vw", xs: "80vw" },
                  "& .MuiOutlinedInput-input": {
                    p: "0 0 0 10px !important",
                    // paddingLeft: "5px",
                  },
                }}
                InputProps={{
                  style: textFieldStyled,
                }}
              />

              <>
                <Label id='demo-multiple-chip-label'>Permissions</Label>
                {/* <Select
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
                  input={<BootstrapInput />}
                  // input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected?.map((value, index) => (
                        <Chip key={index} label={value.title} />
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
                </Select> */}
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
                          backgroundColor: "black",
                          maxHeight: "250px",
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
                <NavBtn type='submit' sx={{ mt: 4, mb: 10 }}>
                  Update Roll
                </NavBtn>
              </>
            </form>
          </HeadComponent>
        </Box>
      </Layout>
    </>
  );
};

export default EditRole;
