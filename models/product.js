import mongoose from "mongoose";

// Define the schema for a product
const productSchema = new mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,  // Assuming productId is required
      unique: true,    // Ensuring productId is unique
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,  // Initially set to available
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model from the schema
export const Product = mongoose.model('Product', productSchema);
