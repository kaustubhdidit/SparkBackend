import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email, including sensitive fields
        const user = await User.findOne({ email }).select("+password +role +name +perm1 +perm2 +perm3 +perm4 +perm5");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is marked as inactive
        if (!user.perm5) {
            return res.status(403).json({ 
                message: "Account is marked as inactive. Please contact the administrator.",
                success: false 
            });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        // Prepare payload for JWT
        const data = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                perm1: user.perm1,
                perm2: user.perm2,
                perm3: user.perm3,
                perm4: user.perm4,
                perm5: user.perm5,
                createdAt: user.createdAt
            }
        };

        // Generate JWT token
        const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2s' });

        // Respond with success
        return res.status(201).json({ 
            message: "Successfully logged in",
            success: true,
            authToken, 
            data 
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
