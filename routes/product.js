import express from "express";
import { addProduct } from "../controllers/product.js";
import { getAllProducts } from "../controllers/product.js";
import { updateProductAvailability } from "../controllers/product.js";

const router = express.Router();

router.post("/addProd", addProduct);
router.get("/getAllProd", getAllProducts);
router.post("/updateAva",updateProductAvailability)

export default router;