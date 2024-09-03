import {
  IPasswordUpdateType,
  UserAuthorizationType,
  IUsernameUpdateType,
  UserRegistrationType
} from "../types/authTypes";


export const initialValueUpdateUsername: IUsernameUpdateType = {
  username: "",
};

export const initialValueUpdatePassword: IPasswordUpdateType = {
  password: "",
  new_password: "",
  confirmPassword: "",
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