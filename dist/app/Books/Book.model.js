"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "NewUser",
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Book = (0, mongoose_1.model)("Books", BookSchema);
