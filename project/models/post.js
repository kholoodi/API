const mongoose = require('mongoose'),
{Schema} = mongoose

// The sechema for User Object 
const PostSchema = new Schema({
    title:{
        type: String,
        trim :true, // trim is remove spaces on the start or end 
        required: true
    },
    text:{
        type: String ,
        trim:true ,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId , ref:'User'
        
    }
})

module.exports = mongoose.model('Post', PostSchema)
//To export the model 
//exporting by function model by object mongoose 
//model function takes two paramters 
//1- name of the model "Post"
//2- shape of model "PostSchema"
