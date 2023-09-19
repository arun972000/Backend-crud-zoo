import mongoose from "mongoose";

const appUserSchema = new mongoose.Schema({
    id: {
        type: "string",
        required: true
    },
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    role: {
        type: "string",
        required: true
    }
})

const animalSchema = new mongoose.Schema({
    id: {
        type: "string",
        required: true
    },
    name: {
        type: "string",
        required: true
    },
    type: {
        type: "string",
        required: true
    },
    imageUrl: {
        type: "string",
        required: true
    },
    gender: {
        type: "string",
        required: true
    }
})

export const usermodel=mongoose.model("login-users",appUserSchema)
export const animalmodel=mongoose.model("animals",animalSchema)