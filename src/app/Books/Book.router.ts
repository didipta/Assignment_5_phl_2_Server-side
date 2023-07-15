import express from "express";
import { BookController } from "./Book.controller";
import auth from "../Users/auth";

const router = express.Router();

router.post("/", auth(), BookController.createbook);
router.get("/", BookController.getAllbook);
router.get("/new", BookController.getNewBooks);

export const BookRoutes = router;
