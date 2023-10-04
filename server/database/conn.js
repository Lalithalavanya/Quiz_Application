import mongoose from "mongoose";  //mongoose allow us to connect express application with mongoDB database

export default async function connect(){
   await mongoose.connect("mongodb+srv://sunilrathore1787:sunil123@cluster0.g4wexxi.mongodb.net/?retryWrites=true&w=majority");
    // mongoose.connect("mongodb+srv://sunilrathore1787:Sunil@123@cluster0.g4wexxi.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database Connected")
}
