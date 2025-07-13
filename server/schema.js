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
const schema2=mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    SuperPower:{
        type:String,
        
    },
    BackStory:{
        type:String,
       
    },
    keyBattles:{
        type:String,
        
    },
    Weakness:{
        type:String,
    },
    preferredRole:{
        type:String,
    }
});
const heroes=mongoose.model('Heroes',schema2);
module.exports={user,heroes};

