import * as Yup from "yup";

export const validationSchemaRegistration = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_\s!@#$%^&*()\-+=?]+$/, "Invalid name format")
    .required()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: Yup.string()
    .email("Enter a valid email")
    .required()
    .min(4, "Email must be at least 4 characters")
    .max(50, "Email must not exceed 50 characters"),
  home_page: Yup.string()
    .url("Enter a valid URL for the home page")
    .required("Home page is required")
    .min(4, "Home page must be at least 4 characters")
    .max(150, "Home page cannot exceed 50 characters"),
  password: Yup.string()
    .min(4, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required(),
});
