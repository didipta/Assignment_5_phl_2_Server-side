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
    phoneNumber: string
  ): Promise<Pick<IUser, "phoneNumber" | "password" | "role">>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
