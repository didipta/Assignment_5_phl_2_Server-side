import express from "express";
import { UserRoutes } from "../app/Users/user.route";
import { BookRoutes } from "../app/Books/Book.router";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
