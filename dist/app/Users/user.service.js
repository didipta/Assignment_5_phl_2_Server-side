"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../shared/ApiError"));
const paginationHelper_1 = require("../../shared/paginationHelper");
const User_model_1 = require("./User.model");
const config_1 = __importDefault(require("../../config"));
const jwtHelpers_1 = require("../../shared/jwtHelpers");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isuserExist = yield User_model_1.User.isUserExist(payload.email);
    if (isuserExist) {
        throw new ApiError_1.default(http_status_1.default.IM_USED, "User already exist");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: payload.email,
        role: payload.role,
        phoneNumber: payload.phoneNumber,
    }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    const result = yield User_model_1.User.create(payload);
    return {
        user: result,
        accessToken,
    };
});
const loginuser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isuserExist = yield User_model_1.User.isUserExist(email);
    if (!isuserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isuserExist.password &&
        !(yield User_model_1.User.isPasswordMatched(password, isuserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    const { email: emails, role, phoneNumber } = isuserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ emails, role, phoneNumber }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    return {
        accessToken,
        user: isuserExist,
    };
});
const getAlluser = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield User_model_1.User.find({}).skip(skip).limit(limit);
    const total = yield User_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleuser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.findById(id);
    return result;
});
const updateuser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteuser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    createUser,
    getSingleuser,
    updateuser,
    deleteuser,
    getAlluser,
    loginuser,
};
