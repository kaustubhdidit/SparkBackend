import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find().select("+role +name +email +perm1 +perm2 +perm3 +perm4 +perm5"); // Exclude password field for security
console.log(users[0].perm1)
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({ 
            message: "Users fetched successfully", 
            success: true, 
            users 
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            success: false 
        });
    }
};

// Update user permissions
export const updatePermissions = async (req, res) => {
    console.log("Request received for updating permissions");
    console.log("Permissions:", req.body);

    const { id } = req.params; // Extract user ID from request params
    const { perm1, perm2, perm3, perm4, perm5 } = req.body; // Extract individual permissions from request body

    try {
        // Validate user existence
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Update the user's permissions if provided in the request body
        if (perm1 !== undefined) user.perm1 = perm1;
        if (perm2 !== undefined) user.perm2 = perm2;
        if (perm3 !== undefined) user.perm3 = perm3;
        if (perm4 !== undefined) user.perm4 = perm4;
        if (perm5 !== undefined) user.perm5 = perm5;

        // Save the updated user to the database
        await user.save();

        console.log("User updated successfully:", user);

        return res.status(200).json({
            message: "User permissions updated successfully",
            success: true,
            user,
        });
    } catch (error) {
        console.error("Error updating permissions:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const deleteUser = async (req, res) => {
    console.log("Request received for deleting user");
    const { id } = req.params; // Extract user ID from request params

    try {
        // Validate user existence and delete in one operation
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        console.log("User deleted successfully:", deletedUser);
        return res.status(200).json({
            message: "User deleted successfully",
            success: true,
            user: deletedUser
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};