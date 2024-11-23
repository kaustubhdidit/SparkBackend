import mongoose from "mongoose";

// Define the schema for an order
const orderSchema = new mongoose.Schema(
  {
    vendorEmail: {
      type: String,
      required: true,
      trim: true,
    },
    empEmail: {
      type: String,
      required: true,
      trim: true,
    },
    pid: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    units: {
      type: Number,
      required: true,
      min: 1, // Minimum 1 unit
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryStatus: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // You can define your own statuses
      default: 'Pending',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model from the schema
export const Order = mongoose.model('Order', orderSchema);
