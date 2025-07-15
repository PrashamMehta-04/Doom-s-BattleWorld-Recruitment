const express =require('express');
const cors=require('cors');
const app=express();
const mongoose =require('mongoose');
const config =require('./config');
const PORT =config.port;
const {user} =require('./schema');
const {heroes}=require('./schema');
const {Doom} =require('./schema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const jwt_Key=config.JWTkey;
const verifyToken=require('./Route');
const saltRounds=10;
app.use(cors());
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',()=>{console.log("Error connecting to database")});
db.once('open',()=>{
    console.log("Connected to database");
})
app.use(express.json());
app.post('/api/google',async (req,res)=>{
    const{username,password,name,type}=req.body;
    try{
    const check=await user.findOne({username});
    if(!check){
        const newData=new user({Username:username,password:password,Name:name,loginType:type});
        const heroData=new heroes({Username:username});
        await heroData.save();
       await newData.save();
        console.log("Successfully Logged in!");
        res.status(200).send(true);
    }
    else{
        console.log("Successfully Logged in!");
        res.status(200).send(true);
    }}
    catch(error){
        console.error("Server Error: ",error);
        res.status(500).send("Server Error");
    }
});
app.post('/api/login', async(req,res)=>{
    const{username,password}=req.body;
    try{
    const check=await user.findOne({Username:username});
    console.log(check);
    if(!check){
        console.log("User not found!");
        res.status(404).send(false);
    }
    else{
      const passMatch=await bcrypt.compare(password,check.password);
      if(passMatch){
        console.log("Logged in!");
        const token=jwt.sign({id:check.id,username:check.Username},jwt_Key,{expiresIn:'20h'})
        res.json({token});
      }
      else{
        console.log('Password and Username dont match!');
        res.status(401).send(false);
      }
    }}
    catch(error){
        console.error("Server Error: ", error);
        res.status(500).send("Server Error");
    }
});
app.post('/api/signup',async(req,res)=>{
    const{username,password,name,type}=req.body;
    try{
        const check=await user.findOne({username});
        if(check){
            res.status(401).send("Username already exists");
        }
        else{
            const hash=await bcrypt.hash(password,saltRounds);
            const newUser=new user({Username:username,password:hash,Name:name,loginType:type});
            const newHero=new heroes({Username:username});
            await newHero.save();
            await newUser.save();
            console.log("Successfully Logged in!");
            res.status(200).send(true);
        }
    }
    catch(error){
        console.error("Error in the server ",error);
        res.status(500).send("Server Error!");
    }
});
app.post('/api/resume',verifyToken,async(req,res)=>{
    const{powerArr,bStory,battles,weak,pRole}=req.body;
    const username=req.user.username;
    try{
        await heroes.updateOne(
            {Username:username},{
                $set:{
                    SuperPower:powerArr,
                    BackStory:bStory,
                    keyBattles:battles,
                    Weakness:weak,
                    preferredRole:pRole
                }
            }
        );
        res.status(200).send(true);
        
    }
    catch(error){
        console.error('Server Error',error);
        res.status(500).send('Server Error!');
    }
});
app.get('/api/validate',async (req,res)=>{
    const token=req.header('Authorization').replace('Bearer ','');
    if(!token){
        res.status(401).json({error:'No token provided'});
    }
    else{
        try{
            const decoded=jwt.verify(token,jwt_Key);
            res.json({user:{id:decoded.id,username:decoded.username}});
        }
        catch(err){
            console.error('Error',err);
            res.status(401).json({error:'Invalid token'});
        }
    }
})
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
}
);
app.post('/api/job_post', async (req, res) => {
    try{
        const { companyName, subTitle, description, lastDate, salary, location } = req.body;
        const newJob = new Doom({
            companyName,
            subTitle,
            description,
            lastDate: new Date(lastDate).toISOString().split('T')[0],
            salary,
            location
        });
        await newJob.save();
        console.log("Job posted successfully!");
        res.status(201).json({message: "Job posted successfully!"});
    }
    catch(error){
        console.error("Error posting job:", error);
        res.status(500).json({message: "Error posting job"});
    }
});