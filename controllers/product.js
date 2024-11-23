import { Product } from "../models/product.js"; // Import the Product model

// Controller function to add a new product
export const addProduct = async (req, res) => {
  const { pid, name, description, price, available } = req.body;

  // Validation: Ensure all required fields are provided
  if (!pid || !name || !description || price === undefined || available === undefined) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Create a new product using the provided data
    const newProduct = new Product({
      pid,
      name,
      description,
      price,
      available,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Return the saved product as a response
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the product.' });
  }
};

// Controller function to get all products
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Check if products exist
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }

    // Return all products as a response
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving products.' });
  }
};

// Controller function to update the availability of a product
export const updateProductAvailability = async (req, res) => {
  const { pid, available } = req.body;

  // Validation: Ensure required fields are provided
  if (!pid || available === undefined) {
    return res.status(400).json({ error: 'Product ID and availability status are required.' });
  }

  try {
    // Find the product by its ID and update its availability
    const updatedProduct = await Product.findOneAndUpdate(
      { pid },
      { available },
      { new: true } // Return the updated document
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Return the updated product as a response
    res.status(200).json({ message: 'Product availability updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating product availability.' });
  }
};
