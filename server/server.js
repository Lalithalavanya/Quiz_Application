import express  from "express";
import morgan from "morgan"; //whenever we make a request from this server,we get that request inside console by using morgan library
import cors from 'cors'; //cors is used for cross domain data-sharing
import { config } from "dotenv"; //The dotenv package is commonly used for managing environment variables in Node.js applications
import router from "./router/route.js"; //note that while importing in backend always use .js
import connect from "./database/conn.js";

const app=express();

/***app middlewares */ 
app.use(morgan('tiny'))
app.use(cors({
    origin : ["https://quiz-app.onrender.com"]
}));
app.use(express.json()); //informing express that we are using json format
config(); //used to load environment variables from a .env file into the Node.js runtime environment

/*application port*/
const port=process.env.PORT || 8080;
// connect();  //we connected mongoDB database to our application

//Routes
app.use('/api',router) /**apis */ //you are telling Express to use the router middleware for any incoming requests that match the path /api.

app.get('/',(req,res)=>{
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

//start server only when we have valid connection i.e server is connected only when database is connected
connect().then(()=>{
    try {
        app.listen(port,()=>{
        console.log(`Server connected to http://localhost:${port}`)
})
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error=>{
    console.log("Invalid Database Connection")
})
