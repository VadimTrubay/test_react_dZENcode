export interface initialAuthType {
  user: userType,
  access_token: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: null;
}

export interface userType {
  id: number;
  username: string;
  email: string;
  home_page: string;
}

export interface authType {
  id: number;
  username: string;
  email: string;
  password: string;
  new_password: string;
}

export interface authUserType {
  id: number;
  username: string;
  email: string;
  password: string;
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
