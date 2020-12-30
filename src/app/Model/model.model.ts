export class Model {

}

export interface Products {
  id: number;
  name: string;
  description: string;
  ageRestriction: number;
  company: string;
  price: number;
}

export interface UserManagerResponse {
  message: string;
  isSuccess: boolean;
  errors: string[];
  expireDate: string | null;
}

export interface Users{
  roles: string[];
  id: string;
  userName: string;
  normalizedUserName: string | null;
  email: string;
  normalizedEmail: string |null;
  emailConfirmed: true;
  passwordHash: null;
  securityStamp: null;
  concurrencyStamp: null;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface RegisterViewModel {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginViewModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ChangePaswordViewModel {
  newPassword: string;
  oldPassword: string;
  id: string;
}
