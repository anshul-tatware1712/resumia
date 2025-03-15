import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,20}$/,
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
    )
    .trim()
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
