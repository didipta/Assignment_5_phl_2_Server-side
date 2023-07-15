import { Schema, model } from "mongoose";
import { IBook } from "./Book.interface";

const BookSchema = new Schema<IBook>(
  {
    Title: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    Genre: {
      type: String,
      required: true,
    },
    Publication_Date: {
      type: Date,
      required: true,
    },
    Reviews: [
      {
        Reviewer: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        Review_Date: {
          type: Date,
          required: true,
        },
        Review_Text: {
          type: String,
          required: true,
        },
      },
    ],
    postby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook>("Books", BookSchema);
