import { Model } from "mongoose";

export type IRole = "user" | "admin";

export type IUser = {
  phoneNumber: string;
  role: IRole;
  password: string;
  Name: string;
  address: string;
  email: string;
};
export type UserModel = {
  isUserExist(
    // eslint-disable-next-line no-unused-vars
    email: string
  ): Promise<IUser>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  user: IUser;
};
