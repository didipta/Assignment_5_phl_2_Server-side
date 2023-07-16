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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../shared/paginationHelper");
const Book_model_1 = require("./Book.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_model_1.Book.create(payload);
    return result;
});
const getAllbook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate pagination options
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        andConditions.push({
            $or: [{ Title: regex }, { Author: regex }, { Genre: regex }],
        });
        // Handling Publication_Date separately as a date query
        const parsedDate = Date.parse(searchTerm);
        if (!isNaN(parsedDate)) {
            andConditions.push({ Publication_Date: new Date(parsedDate) });
        }
    }
    // Filters needs $and to fulfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic Sort needs field to do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // Create the whereConditions object based on the andConditions array
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // Perform the search using the Book model with the whereConditions and pagination options
    const result = yield Book_model_1.Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    // Get the total count of documents matching the conditions
    const total = yield Book_model_1.Book.countDocuments(whereConditions);
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
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_model_1.Book.findById(id)
        .populate("postby")
        .populate("Reviews.Reviewer");
    return result;
});
//set review
const setReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Book_model_1.Book.findByIdAndUpdate({ _id: id }, {
        $push: {
            Reviews: payload,
        },
    }, { new: true });
});
exports.BookService = {
    createBook,
    getAllbook,
    getNewBooks,
    getSingleBook,
    setReview,
};
