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
    },
});
const user=mongoose.model('User',schema);
const schema2=mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    SuperPower:{
        type:Array,
        
    },
    BackStory:{
        type:String,
       
    },
    keyBattles:{
        type:Array,
        
    },
    Weakness:{
        type:Array,
    },
    preferredRole:{
        type:String,
    },
    Resume:{
      type:String
    },
    AppliedJobs:{
      type:Array,
      default:[]
    }
});
const heroes=mongoose.model('Heroes',schema2);


const doomSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  subTitle: {
    type: String,
    required: true
  },
  requirements:{
    type:Array,
    required:true,
    default: []
  },

  description: {
    type: String,
    required: true
  },
  lastDate: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  users:{
    type:Array,
    default:[],
  }
});

const Doom = mongoose.model('Doom', doomSchema);
module.exports={user,heroes, Doom};