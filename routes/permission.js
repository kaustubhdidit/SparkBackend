import express from "express";
import { checkPermissions } from "../controllers/permission.js";

const router = express.Router();

router.post("/check", checkPermissions); // Add a new order
export default router;