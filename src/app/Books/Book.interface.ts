import { Types } from "mongoose";
import { IUser } from "../Users/User.interface";

export type IBookReview = {
  Reviewer: Types.ObjectId | IUser;
  Review_Date: Date;
  Review_Text: string;
};

export type IBook = {
  Title: string;
  Author: string;
  Genre: string;
  Publication_Date: Date;
  Reviews: IBookReview[];
  postby: Types.ObjectId | IUser;
  image: string;
};

export type IBookFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};

export const bookFields = ["Title", "Author", "Genre", "Publication_Date"];
export const bookFilterableFields = [
  "searchTerm",
  "Genre",
  "Publication_Date",
  "Author",
  "Title",
];
