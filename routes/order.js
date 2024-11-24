import express from "express";
import {
  addOrder,
  getOrdersByEmployee,
  getAllOrders,
  getOrdersByVendor,
  updateOrderStatus,
  deleteOrder
} from "../controllers/order.js";

const router = express.Router();

router.post("/addOrder", addOrder); // Add a new order
router.get("/empOrders", getOrdersByEmployee); // Get orders for a specific employee
router.get("/allOrders", getAllOrders); // Get all orders
router.get("/vendOrders", getOrdersByVendor); // Get orders for a specific employee
// router.get("/getAllOrders", getAllOrders); // Get orders for a specific employee
router.post("/updateOrderStatus", updateOrderStatus); // Add a new order
router.delete('/deleteOrder', deleteOrder);

export default router;
