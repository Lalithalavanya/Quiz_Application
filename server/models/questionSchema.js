import mongoose from "mongoose";
const {Schema} =mongoose;

/**Question model */
const questionModel=new Schema({
    questions : {type : Array,default : []},
    answers : {type : Array,default : []},
    createdAt : {type : Date,default : Date.now}
});

export default mongoose.model('Question',questionModel); //Mongoose will create a question collection inside mongoDB database with the questionModel structure