const mongoose = require('mongoose'),
{Schema} = mongoose
///مكتبة لتسهيل عملية تسجيل الدخول للمستخدمين 
const PassportLocalMongoose = require('passport-local-mongoose')


// The sechema for User Object 
const UserSchema = new Schema({
    name :{
        type: String ,
        trim :true, // trim is remove spaces on the start or end 
        required: true
    },
    age :{
        type: Number,
        trim:true,
        required: true
    },
    email :{
        type: String,
        trim: true,
        required: true,
        unique: true
    }
})

UserSchema.plugin( PassportLocalMongoose, { usernameField: 'email'})
module.exports = mongoose.model('User', UserSchema)
/**To export the model 
 * exporting by function model by object mongoose 
 * model function takes two paramters 
 * 1- name of the model "User"
 * 2- shape of model "UserSchema" 
 * */
