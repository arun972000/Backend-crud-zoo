import express, { json } from 'express';
import animalRoutes from './Routes/animals.js';
import DBclient from './Mongoose/connect.js';
import userRoutes from './Routes/appuser.js';
import jwt from "jsonwebtoken"
import cors from "cors"


const app = express();

app.use(cors({origin:"*"}))
app.use(json())



const authmiddleware = (req, res, next) => {
    const authtoken = req.headers["auth-token"];
    try {
        jwt.verify(authtoken, process.env.JWT_key)
        next()
    } catch (err) {
        res.status(401).send("no authorized")
    }
}

app.use("/api/animals",animalRoutes)

app.use("/api/user",userRoutes)

await DBclient()



const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));