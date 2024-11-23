import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    console.log("reached");
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const user = await User.findOne({ email });
    if(user)
        return res.status(400).json({ message: "User already exists" });
    
    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);
    console.log("reached1");
    
    // Determine permissions based on role
    const isAdmin = role === "admin";
    const createdUser = await User.create({
        name,
        email,
        password: hashedPass,
        role,
        perm1: isAdmin,
        perm2: isAdmin,
        perm3: isAdmin,
        perm4: isAdmin,
        perm5: true
    });
    console.log("reached2");
    
    // Create JWT token payload with ALL user fields
    const data = {
        user: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            perm1: createdUser.perm1,
            perm2: createdUser.perm2,
            perm3: createdUser.perm3,
            perm4: createdUser.perm4,
            perm5: createdUser.perm5,
            createdAt: createdUser.createdAt
        }
    };
    
    console.log("reached3");
    const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2s' });
    console.log("reached4");
    
    return res.status(201).json({
        success: true,
        authToken,
        data
    });
};