import {
  UserAuthorizationType,
  UserRegistrationType
} from "../types/authTypes";
import {CommentAddType} from "../types/commentsTypes.ts";


export const initialValues: CommentAddType = {
  text: "",
};

export const initialValueUserAuthorization: UserAuthorizationType = {
  email: "",
  password: "",
};

export const initialValueUserRegistration: UserRegistrationType = {
  username: "",
  email: "",
  home_page: "",
  password: "",
  confirmPassword: "",
}