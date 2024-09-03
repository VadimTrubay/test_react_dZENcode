import * as Yup from "yup";

export const validationSchemaAuthorization = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required()
    .min(4)
    .max(50),
  password: Yup.string()
    .min(4)
    .max(50),
});
