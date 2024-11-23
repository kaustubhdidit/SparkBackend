import { User } from "../models/user.js";

export const checkPermissions = async (req, res) => {
  const { userId, permissions } = req.body;

  // Validate request body
  if (!userId || !Array.isArray(permissions) || permissions.length === 0) {
    return res.status(400).json({ error: "User ID and permissions are required." });
  }

  try {
    // Fetch the user from the database with selected permission fields
    const user = await User.findById(userId).select("+role +perm1 +perm2 +perm3 +perm4 +perm5");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if all requested permissions are true
    const hasPermissions = permissions.every((perm) => user[perm] === true);

    // Send the hasPermissions value as a response
    res.status(200).json({ hasPermissions });
  } catch (error) {
    console.error("Error checking permissions:", error);
    res.status(500).json({ error: "An error occurred while checking permissions." });
  }
};
