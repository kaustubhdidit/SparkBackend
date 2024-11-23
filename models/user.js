import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        required: true,
        select: false,
    },
    perm1: {
        type: Boolean,
        required: true,
        default: false,
        select: false,
    },
    perm2: {
        type: Boolean,
        required: true,
        default: false,
        select: false,
    },
    perm3: {
        type: Boolean,
        required: true,
        default: false,
        select: false,
    },
    perm4: {
        type: Boolean,
        required: true,
        default: false,
        select: false,
    },
    perm5: {
        type: Boolean,
        required: true,
        default: false,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const User = mongoose.model("User", schema);