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
