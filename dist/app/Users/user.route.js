"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/signup", user_controller_1.UserController.createUser);
router.post("/login", user_controller_1.UserController.loginuser);
router.get("/", user_controller_1.UserController.getAlluser);
router.get("/:id", user_controller_1.UserController.getSingleuser);
router.patch("/:id", user_controller_1.UserController.updateuser);
router.delete("/:id", user_controller_1.UserController.deleteuser);
exports.UserRoutes = router;
