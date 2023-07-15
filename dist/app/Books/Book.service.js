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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../shared/paginationHelper");
const Book_model_1 = require("./Book.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_model_1.Book.create(payload);
    return result;
});
const getAllbook = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield Book_model_1.Book.find({}).skip(skip).limit(limit);
    const total = yield Book_model_1.Book.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
///get new 10 books
const getNewBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_model_1.Book.find({}).sort({ createdAt: -1 }).limit(10);
    return result;
});
exports.BookService = {
    createBook,
    getAllbook,
    getNewBooks,
};
