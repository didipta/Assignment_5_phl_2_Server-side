"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Book_controller_1 = require("./Book.controller");
const auth_1 = __importDefault(require("../Users/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), Book_controller_1.BookController.createbook);
router.get("/", Book_controller_1.BookController.getAllbook);
router.get("/get/new", Book_controller_1.BookController.getNewBooks);
exports.BookRoutes = router;
