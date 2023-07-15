import { IPaginationOptions } from "../../shared/Ipagination";
import { IGenericResponse } from "../../shared/common";
import { paginationHelpers } from "../../shared/paginationHelper";
import { IBook } from "./Book.interface";
import { Book } from "./Book.model";

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

const getAllbook = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Book.find({}).skip(skip).limit(limit);

  const total = await Book.countDocuments();

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

export const BookService = {
  createBook,
  getAllbook,
  getNewBooks,
};
