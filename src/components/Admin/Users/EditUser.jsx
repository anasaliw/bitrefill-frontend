import {
  Box,
  Grid,
  styled,
  FormControl,
  Select,
  MenuItem,
  Menu,
  InputBase,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  CssTextField,
  HeadComponent,
  Label,
  NavBtn,
  textFieldStyled,
} from "../../../Styles/CommonStyles";
import Layout from "../Layout/Layout";
import {
  GetAllRoleAction,
  UpdateUserByAdminAction,
  getSingleUserAction,
} from "../../../Redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ProfileImgBox = styled(Box)`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 4px solid #ffb686;
  @media (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;

export const imgStyles = {
  maxWidth: "100%",
  borderRadius: "50%",
  height: "100%",
  objectFit: "cover",
};
export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  //   background: "transparent",
  borderRadius: "20px",

  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .MuiInputBase-root": {
    borderRadius: "20px",
  },

  "& .MuiInputBase-input": {
    borderRadius: "20px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.transparent,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const EditUser = () => {
  const { loading, users } = useSelector((state) => state.getSingleUserReducer);
  const avatarFileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(users?.data?.user?.name);

  const [userName, setUsername] = useState(users?.data?.user?.userName);
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dp, setDp] = useState("");
  const [role, setRole] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [arrayOfRoles, setArrayOfRoles] = React.useState();

  const handleChange = (event) => {
    setRole(event.target.value);
    console.log(role);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDpUpload = (e) => {
    setAvatar(e.target.files[0]);
    const file = e.target.files[0];
    setDp(URL.createObjectURL(e.target.files[0]));
  };
  // const handleUpdate = () => {};

  //   console.log("avatar");
  //   console.log(avatar);
  //   console.log("dp");
  //   console.log(avatar);
  // const { id } = useParams();
  // console.log(id);

  const { roles } = useSelector((state) => state.GetAllRoleReducer);
  // console.log(roles);

  const fetchSingleUserData = async () => {
    const response = await dispatch(getSingleUserAction(id));
    // setUsername(response?.data?.user?.userName);
    // setName(response?.data?.user?.name);
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
  // console.log(users);
  useEffect(() => {
    fetchSingleUserData();
    // fetchAllRoll();
  }, []);

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };
  // const handleUpdate = () => {
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateUserByAdminAction(id, name, userName, personName));
  };

  return (
    <Layout>
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/allUsers")} sx={{ mb: 5, mt: 2 }}>
            Back
          </NavBtn>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                // display: "flex",
                // alignItems: "center",
                //   justifyContent: "center",
                // flexDirection: "column",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container rowGap={2} columnGap={5}>
                  <Grid item lg={5.5} md={5.5} sm={5.9} xs={12}>
                    <Label sx={{ mt: 2 }}>Name</Label>
                    <CssTextField
                      type='text'
                      required
                      name='name'
                      autoComplete='off'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      sx={
                        {
                          // width: {
                          //   lg: "25vw",
                          //   md: "25vw",
                          //   sm: "60vw",
                          //   xs: "80vw",
                          // },
                        }
                      }
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                  </Grid>
                  <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
                    <Label sx={{ mt: 2 }}>Username</Label>
                    <CssTextField
                      type='text'
                      required
                      name='userName'
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                      autoComplete='off'
                      sx={
                        {
                          // width: {
                          //   lg: "25vw",
                          //   md: "25vw",
                          //   sm: "60vw",
                          //   xs: "80vw",
                          // },
                        }
                      }
                      InputProps={{
                        style: textFieldStyled,
                      }}
                    />
                  </Grid>

                  {/* <Grid item lg={5.8} md={5.8} sm={5.9} xs={12}>
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
                      value={personName}
                      name='role'
                      // label='Role'
                      onChange={handleChangeSelect}
                      inputProps={{
                        MenuProps: {
                          MenuListProps: {
                            sx: {
                              backgroundColor: "black",
                            },
                          },
                        },
                      }}
                      sx={{
                        height: "40px",
                        // background: "black",
                        width: {
                          lg: "25vw",
                          md: "25vw",
                          sm: "60vw",
                          xs: "80vw",
                        },
                      }}
                      input={<BootstrapInput />}
                    >
                      {arrayOfRoles?.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid> */}
                </Grid>
                <NavBtn
                  type='submit'
                  sx={{
                    mt: 3,
                    width: "100px",
                  }}
                  // onClick={handleUpdate}
                >
                  Update
                </NavBtn>
              </form>
            </Box>
          </Box>
        </HeadComponent>
      </Box>
    </Layout>
  );
};

export default EditUser;
