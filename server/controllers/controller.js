import Questions from "../models/questionSchema.js"
import Results from "../models/resultSchema.js"
import questions,{answers} from "../database/data.js"


//get all questions
export async function getQuestions(req,res){
    // res.json("questions api get request")
    try {
        const q=await Questions.find() //this find method allows us to find all the documents in a collection and return that as a response
        res.json(q)
    } catch (error) {
        res.json({error})
    }
} 

//insert all questions
export async function insertQuestions(req,res){
    // res.json("questions api post request")
    try {
         Questions.insertMany({questions : questions,answers : answers}).then(function(){
            res.json({msg : "Data Saved Successfully..."})
         })
        // Questions.insertMany({questions : [0],answers : [1]},function(err,data){
        //     res.json({msg : "Data Saved Successfully..."})
        // })
    } catch (error) {
        res.json({error})
    }
} 

//delete all questions
export async function dropQuestions(req,res){
    // res.json("questions api delete request")
    try {
        await Questions.deleteMany();
        res.json({msg : "Questions Deleted Successfullly..."});
    } catch (error) {
        res.json({error});
    }
} 

//get all result
export async function getResult(req,res){
    // res.json("result api get request")
    try {
        const r=await Results.find();
        res.json(r);
    } catch (error) {
        res.json({error})
    }
} 

//post all result
export async function storeResult(req,res){
    // res.json("result api post request")
    try {
       const {username,result,attempts,points,achieved}=req.body; //we will get this information from userend and store it to mongoDB Database
       if(!username && !result) throw new Error('Data Not Provided...!');

       Results.create({username,result,attempts,points,achieved}).then(function(err,data){
           res.json({msg : "Result Saved Successfully...!"})
       });

    } catch (error) {
        res.json({error})
    }
} 

//post all result
export async function dropResult(req,res){
    // res.json("result api delete request")
    try {
        await Results.deleteMany();
        res.json({msg : "Result Deleted Successfully...!"});
    } catch (error) {
        res.json({error})
    }
} 