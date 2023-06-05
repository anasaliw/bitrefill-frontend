import {
  Typography,
  styled,
  Box,
  Button,
  InputLabel,
  TextField,
  OutlinedInput,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "33.89px",
  color: theme.palette.text.primary,
}));
export const HeadComponent = styled(Box)(({ theme }) => ({
  padding: "60px 80px 20px 80px",
  minHeight: "57vh",
  color: theme.palette.text.primary,
  [theme.breakpoints.down(900)]: {
    padding: "60px 30px 20px 30px",
  },
  [theme.breakpoints.down(550)]: {
    padding: "60px 30px 10px 30px",
  },
}));
export const ResponsiveOrderDetails = styled(Box)(({ theme }) => ({
  padding: "60px 80px 20px 80px",
  color: theme.palette.text.primary,
  [theme.breakpoints.down(900)]: {
    padding: "60px 10px 20px 10px",
  },
  [theme.breakpoints.down(550)]: {
    padding: "60px 10px 10px 10px",
  },
}));
export const NavBtn = styled(Button)`
  color: #fff;
  padding: 5px 15px;
  text-transform: none;
  background: linear-gradient(
    270deg,
    #00f902 -16.36%,
    rgba(99, 250, 6, 0) 190%
  );
  border-radius: 20px;
`;
export const LoadingBtn = styled(LoadingButton)`
  color: #fff;
  padding: 5px 15px;
  text-transform: none;
  background: linear-gradient(
    270deg,
    #00f902 -16.36%,
    rgba(99, 250, 6, 0) 190%
  );
  border-radius: 20px;
`;
export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "25px",
  lineHeight: "30.89px",
  textAlign: "center",
  color: theme.palette.text.primary,
}));
export const TableTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "30.89px",
  // textAlign: "center",
  marginRight: "20px",
  color: theme.palette.text.primary,
}));
export const TableData = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "16px",
  // lineHeight: "30.89px",
  // textAlign: "center",
  marginRight: "22px",
  color: theme.palette.text.primary,
}));
export const ComponentTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "25px",
  lineHeight: "30.89px",
  textAlign: "start",
  marginBottom: "20px",
  color: theme.palette.text.primary,
}));
export const GridHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  marginTop: "40px",
  marginBottom: "20px",
}));

export const Label = styled(InputLabel)`
  color: white;
  margin-bottom: 5px;
`;
export const textFieldStyled = {
  height: "40px",
  color: "white",
  borderRadius: "10px",
  WebkitTextFillColor: "white",
  backgroundColor: "white !important",
};
export const CssTextField = styled(TextField)({
  marginBottom: "20px",
  // "& label.Mui-focused": {
  //   color: "white",
  // },

  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-input": {
      // zIndex: 1,
      // background: "black !important",
    },
    "& fieldset": {
      borderColor: "#00f902 !important",
      color: "white",
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
      color: "white",
      // background: "#414141",
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:after": {
      color: "white",
      // background: "#414141",
    },

    "&:hover fieldset": {
      borderColor: "#00f902",
    },
    // "& fieldset": {
    //   background: "black !important",
    //   borderColor: "#FFFF",
    // },
    "&.Mui-focused fieldset": {
      borderColor: "#00f902",
    },
    input: {
      "&:-webkit-autofill": {
        // WebkitBoxShadow: "0 0 0 1000px black inset",
        backgroundColor: "transparent",
        height: "30px",
      },
    },
  },
});
export const CssTextField2 = styled(OutlinedInput)({
  marginBottom: "10px",
  height: "40px",
  color: "white",

  // "& label.Mui-focused": {
  //   color: "white",
  // },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#00f902 !important",
  },

  // "& .MuiOutlinedInput-root": {
  //   "& .MuiOutlinedInput-input": {
  //     // zIndex: 1,
  //     // background: "black !important",
  //     borderColor: "#00f902 !important",
  //   },
  //   "& fieldset": {
  //     borderColor: "#00f902 !important",
  //     color: "white",
  //   },
  //   "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
  //     color: "white",
  //     // background: "#414141",
  //   },
  //   "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:after": {
  //     color: "white",
  //     // background: "#414141",
  //   },

  //   "&:hover fieldset": {
  //     borderColor: "#00f902",
  //   },
  //   // "& fieldset": {
  //   //   background: "black !important",
  //   //   borderColor: "#FFFF",
  //   // },
  //   "&.Mui-focused fieldset": {
  //     borderColor: "#00f902",
  //   },
  //   input: {
  //     "&:-webkit-autofill": {
  //       // WebkitBoxShadow: "0 0 0 1000px black inset",
  //       backgroundColor: "transparent",
  //       height: "30px",
  //     },
  //   },
  // },
});
