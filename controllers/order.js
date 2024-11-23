import { Order } from "../models/order.js"; // Import the Order model
import { Product } from "../models/product.js"; // Import the Product model

// Controller function to add a new order
export const addOrder = async (req, res) => {
    console.log("cake")
  const { vendorEmail, empEmail, pid, units } = req.body;

  // Validation: Ensure all required fields are provided
  if (!vendorEmail || !empEmail || !pid || !units) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Find the product details by its ID
    const product = await Product.findOne({ pid });

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Calculate total price based on units and price per unit
    const totalPrice = product.price * units;

    // Create a new order using the provided and extracted data
    const newOrder = new Order({
      vendorEmail,
      empEmail,
      pid: product.pid, // Using the product's MongoDB ObjectId
      name: product.name,
      units,
      price: totalPrice,
      deliveryStatus: "Pending", // Default status
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Return the saved order as a response
    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while placing the order." });
  }
};

// Controller function to fetch all orders created by a specific employee
export const getOrdersByEmployee = async (req, res) => {
    console.log("cake")
  const { empEmail } = req.query;

  // Validation: Ensure employee email is provided
  if (!empEmail) {
    return res.status(400).json({ error: "Employee email is required." });
  }

  try {
    // Fetch orders created by the employee
    const orders = await Order.find({ empEmail });

    // Check if orders exist
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this employee." });
    }

    // Return the orders as a response
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
};

export const getOrdersByVendor = async (req, res) => {
    console.log("cake")
  const { vendorEmail } = req.query;

  // Validation: Ensure employee email is provided
  if (!vendorEmail) {
    return res.status(400).json({ error: "Vendor email is required." });
  }

  try {
    // Fetch orders created by the employee
    const orders = await Order.find({ vendorEmail });

    // Check if orders exist
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this Vendor." });
    }

    // Return the orders as a response
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
};

// Controller function to fetch all orders
export const getAllOrders = async (req, res) => {
   
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Check if any orders exist
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    // Return all orders as a response
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving orders." });
  }
};

export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
  
    // Validation: Ensure all required fields are provided
    if (!orderId || !status) {
      return res.status(400).json({ error: 'Order ID and status are required.' });
    }
  
    try {
      // Find the order by its ID and update the status
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { deliveryStatus: status },
        { new: true } // Return the updated document
      );
  
      // Check if the order was found and updated
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      // Return the updated order as a response
      res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'An error occurred while updating the order status.' });
    }
  };
