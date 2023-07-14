import httpStatus from "http-status";
import ApiError from "../../shared/ApiError";
import { IPaginationOptions } from "../../shared/Ipagination";
import { IGenericResponse } from "../../shared/common";
import { paginationHelpers } from "../../shared/paginationHelper";
import { ILoginUser, ILoginUserResponse, IUser } from "./User.interface";
import { User } from "./User.model";
import config from "../../config";
import { jwtHelpers } from "../../shared/jwtHelpers";
import { Secret } from "jsonwebtoken";

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const isuserExist = await User.isUserExist(payload.email);
  if (isuserExist) {
    throw new ApiError(httpStatus.IM_USED, "User already exist");
  }
  const result = await User.create(payload);
  return result;
};

const loginuser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isuserExist = await User.isUserExist(email);

  if (!isuserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isuserExist.password &&
    !(await User.isPasswordMatched(password, isuserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { email:emails, role,phoneNumber } = isuserExist;
  const accessToken = jwtHelpers.createToken(
    { emails, role,phoneNumber },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );

  return {
    accessToken,
    user: isuserExist,
  };
};

const getAlluser = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await User.find({}).skip(skip).limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleuser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateuser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteuser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getSingleuser,
  updateuser,
  deleteuser,
  getAlluser,
  loginuser,
};
