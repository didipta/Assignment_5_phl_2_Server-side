import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IBook } from "./Book.interface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./Book.service";
import { paginationFields } from "../../shared/pagination";
import pick from "../../shared/pick";

const createbook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...book } = req.body;
    const result = await BookService.createBook(book);
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "cow created successfully!",
      data: result,
    });
  }
);

const getAllbook = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllbook(paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getNewBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getNewBooks();
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    data: result,
  });
});

export const BookController = {
  createbook,
  getAllbook,
  getNewBooks,
};
