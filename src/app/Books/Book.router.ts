import express from "express";
import { BookController } from "./Book.controller";
import auth from "../Users/auth";

const router = express.Router();

router.post("/", auth(), BookController.createbook);
router.get("/", BookController.getAllbook);
router.get("/get/new", BookController.getNewBooks);
router.get("/:id", BookController.getSingleBook);
router.patch("/review/:id", auth(), BookController.setReview);
router.patch("/:id", auth(), BookController.updateBook);
router.delete("/:id", auth(), BookController.deleteBook);

export const BookRoutes = router;
