import { Types } from "mongoose";
import { IUser } from "../Users/User.interface";

export type IBook = {
  Title: string;
  Author: string;
  Genre: string;
  Publication_Date: Date;
  Reviews: [
    {
      Reviewer: Types.ObjectId | IUser;
      Review_Date: Date;
      Review_Text: string;
    }
  ];
  postby: Types.ObjectId | IUser;
  image: string;
};
