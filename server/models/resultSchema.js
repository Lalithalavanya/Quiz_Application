import mongoose from "mongoose";
const {Schema} =mongoose;

/**Result model */
const resultModel=new Schema({
    username : {type: String},
    result : {type : Array,default : []},
    attempts : {type : Number ,default : 0},
    points : {type : Number ,default : 0},
    achieved : {type : String,default : ''},
    createdAt : {type : Date,default : Date.now}
})

export default mongoose.model('result',resultModel); //Mongoose will create a result collection inside mongoDB database with the resultModel structure