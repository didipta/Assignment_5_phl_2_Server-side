import { IPaginationOptions } from "../../shared/Ipagination";
import { IGenericResponse } from "../../shared/common";
import { paginationHelpers } from "../../shared/paginationHelper";
import { IBook, IBookReview } from "./Book.interface";
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

export const BookService = {
  createBook,
  getAllbook,
  getNewBooks,
  getSingleBook,
  setReview,
};
