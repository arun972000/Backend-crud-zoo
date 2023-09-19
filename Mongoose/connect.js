import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const DBclient=async()=>{
    try{
        await mongoose.connect("mongodb+srv://arunpandian972000:VYku76ZoIs3qhhgL@cluster0.eqbprpg.mongodb.net/loginExercise?retryWrites=true&w=majority",{
            UseNewUrlParser:true
        })
        console.log("db connected")
    }catch(err){
        console.log(err)
    }
   
}

export default DBclient;