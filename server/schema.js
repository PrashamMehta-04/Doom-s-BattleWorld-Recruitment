const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:false
    },
    Name:{
        type:String,
        required:true
    },
    loginType:{
        type:String,
        enum:['google','manual'],
        required:true
    }
});
const user=mongoose.model('User',schema);
module.exports={user};