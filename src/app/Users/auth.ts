import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../shared/ApiError";
import { jwtHelpers } from "../../shared/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { User } from "./User.model";

const auth =
  () =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);

      // id diye user get

      const { emails } = verifiedUser;
      const isUserExist = await User.isUserExist(emails);
      
      if (!isUserExist) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // get user from db

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
