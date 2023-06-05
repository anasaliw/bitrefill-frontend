import * as Yup from "yup";
export const forgetPasswordSchema = Yup.object({
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
