import { Request, RequestHandler, Response } from "express";

import { UserService } from "./user.service";
import httpStatus from "http-status";

import { ILoginUserResponse, IUser } from "./User.interface";

import sendResponse from "../../shared/sendResponse";
import { paginationHelpers } from "../../shared/paginationHelper";
import pick from "../../shared/pick";
import catchAsync from "../../shared/catchAsync";
import { paginationFields } from "../../shared/pagination";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;
    const result = await UserService.createUser(user);
    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user created successfully!",
      data: result,
    });
  }
);
const loginuser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginuser(loginData);
  const { ...others } = result;

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User lohggedin successfully !",
    data: others,
  });
});
const getAlluser = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAlluser(paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const updateuser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateuser(id, req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
const deleteuser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteuser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user deleted successfully",
    data: result,
  });
});
const getSingleuser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleuser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single user fetched successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAlluser,
  getSingleuser,
  updateuser,
  deleteuser,
  loginuser,
};
