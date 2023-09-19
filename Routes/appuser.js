import express, { json } from "express";
import { usermodel } from "../Mongoose/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userRoutes = express.Router();

userRoutes.use(json());

userRoutes.get("/userInfo/:email", async (req, res) => {
    try {
        const { email } = req.params
        const userInfo = await usermodel.findOne({ email }, { id: 1, name: 1, email: 1, role: 1, _id: 0 })
        res.send(userInfo)
    } catch (err) {
        res.status(500).send(err)
    }

})

userRoutes.post("/register", async (req, res) => {
    try {

        const payload = req.body;
        const userExist = await usermodel.findOne({ email: payload.email })
        if (userExist) {
            return res.send("User already registered")
        }
        bcrypt.hash(payload.password, 10, async (err, hash) => {
            if (err) {
                console.log(err)
            } else {
                const newuser = new usermodel({ ...payload, id: v4(), password: hash, role: "admin" });
                await newuser.save();
                res.status(201).send("user registered successfully");
            }
        })
    } catch (err) {
        res.status(500).send("Error registering user: " + err.message);
    }
})

userRoutes.post("/login", async (req, res) => {
    try {
        const payload = req.body;
        const user = usermodel.findOne({ email: payload.email }, { id: 1, email: 1, password: 1, name: 1, role: 1 });
        if (user) {
            bcrypt.compare(payload.password, user.password, async (_err, result) => {
                if (!result) {
                    console.log("invalid password")
                } else {
                    const res = user.toObject()
                    const jwtToken = jwt.sign(res.role, process.env.JWT_KEY, { expiresIn: "1d" })
                    delete user.password;
                    res.send({ ...res, jwtToken })
                }
            })
        }
    } catch (err) {
        res.status(400).send(err)
    }
})



export default userRoutes;