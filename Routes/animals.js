import express, { json } from 'express';
import { animalmodel } from '../Mongoose/model.js';
import { v4 } from 'uuid';

const animalRoutes = express.Router();

animalRoutes.use(json())


animalRoutes.get("/", async (req, res) => {
    try {
        const animals =await animalmodel.find({}, { id: 1, name: 1, type: 1, gender: 1, imageUrl:1,_id: 0 })
        res.send(animals)
    }catch(err){
        res.status(500).send(err.message)
    }
})


animalRoutes.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const oneAnimal=await animalmodel.findOne({id},{id: 1, name: 1, type: 1, gender: 1, imageUrl:1,_id: 0})
        res.send(oneAnimal)
    }catch(err){
        res.status(500).send(err)
    }
})


animalRoutes.post("/add", async (req, res) => {
    try {
        const payload = req.body;
        const newAnimals = new animalmodel({ ...payload, id: v4() });
        await newAnimals.save();
        res.status(201).send("Animal added"); 
    } catch (err) {
        res.status(500).send("Error adding animal: " + err.message); 
    }
})

animalRoutes.put("/update/:id", async (req, res) => {
    try {
        const {id}=req.params
        const payload=req.body;
        await animalmodel.updateOne({id:id},{$set:payload})
        res.send("animals detail updated")
    }catch(err){
        res.status(401).send("no animal found")
    }
})

animalRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const {id}=req.params
        await animalmodel.deleteOne({id:id})
        res.send("animals removed")
    }catch(err){
        res.status(401).send("no animal found")
    }
})

export default animalRoutes