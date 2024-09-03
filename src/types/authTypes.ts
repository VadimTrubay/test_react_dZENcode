export interface initialAuthType {
  user: userType,
  access_token: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: null;
}

export interface userType {
  id: string;
  username: string;
  email: string;
  home_page: string;
}

export interface authType {
  id: string;
  username: string;
  email: string;
  password: string;
  new_password: string;
}

export interface authUserType {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface UsernameUpdateType {
  id: string;
  username: string;
}

export interface PasswordUpdateType {
  id: string;
  password: string;
  new_password: string;
  confirmPassword: string;
}

export interface PasswordUpdateBackType {
  id: string;
  password: string;
  new_password: string;
}

export interface UserAuthorizationType {
  email: string;
  password: string;
}

export interface UserRegistrationType {
  username: string;
  email: string;
  home_page: string;
  password: string;
  confirmPassword: string,
}

export interface RegisterType {
  username: string;
  email: string;
  password: string;
}

export interface IUsernameUpdateType {
  username: string;
}

export interface IPasswordUpdateType {
  password: string;
  new_password: string;
  confirmPassword: string;
}