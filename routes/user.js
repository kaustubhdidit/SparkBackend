import express from "express";
import {login} from "../controllers/login.js";
import {register} from "../controllers/register.js";
import { getAllUsers } from "../controllers/user.js";
import { updatePermissions, deleteUser } from "../controllers/user.js";

const router = express.Router();
console.log("first")
router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.patch("/updatePermissions/:id", updatePermissions); // :id captures the user ID
router.delete("/delete/:id", deleteUser);


export default router;