import * as Yup from "yup";
export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(4, "At least  4 letters are required")
    .required("Name is required"),
  userName: Yup.string()
    .min(4, "At least  4 letters are required")
    .required("Username is required"),
  email: Yup.string().email().required("Pls enter correct email"),
  password: Yup.string()
    .min(8)
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and 8 letters"
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
