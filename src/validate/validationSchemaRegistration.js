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
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one digit"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required(),
});
