import { SortOrder } from "mongoose";
import { IPaginationOptions } from "../../shared/Ipagination";
import { IGenericResponse } from "../../shared/common";
import { paginationHelpers } from "../../shared/paginationHelper";
import { IBook, IBookFilters, IBookReview, bookFields } from "./Book.interface";
import { Book } from "./Book.model";

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

const getAllbook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  // Calculate pagination options
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

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
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Create the whereConditions object based on the andConditions array
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // Perform the search using the Book model with the whereConditions and pagination options
  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Get the total count of documents matching the conditions
  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
///get new 10 books

const getNewBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find({}).sort({ createdAt: -1 }).limit(10);
  return result;
};

const updatebook = async (
  id: string,
  payload: IBook
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id)
    .populate("postby")
    .populate("Reviews.Reviewer");
  return result;
};

//set review
const setReview = async (
  id: string,
  payload: IBookReview
): Promise<IBook | null> => {
  return await Book.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        Reviews: payload,
      },
    },
    { new: true }
  );
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBook,
  getAllbook,
  getNewBooks,
  getSingleBook,
  setReview,
  updatebook,
  deleteBook,
};
