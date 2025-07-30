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
const cloudinary=require('cloudinary').v2;
const verifyToken=require('./Route');
const { Message } = require('./schema');
const nodemailer=require('nodemailer');
app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));
const saltRounds=10;
cloudinary.config({
    cloud_name:config.cloudName,
    api_key:config.cloudKey,
    api_secret:config.cloudSecret,
});
// app.use(cors());
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

app.post('/api/google', async (req, res) => {
    const { username, password, name, type } = req.body;
    try {
        let check = await user.findOne({ Username: username });
        if (!check) {
            const newData = new user({ Username: username, password: password, Name: name, loginType: type,email:username });
            const heroData = new heroes({ Username: username });
            await heroData.save();
            await newData.save();
            console.log("Successfully Registered and Logged in!");
            // Use newData for token
            const token = jwt.sign({ username: newData.Username, name: newData.Name }, jwt_Key, { expiresIn: '20h' });
            res.json({ token });
        } else {
            console.log("Successfully Logged in!");
            // Use check for token
            const token = jwt.sign({ username: check.Username, name: check.Name }, jwt_Key, { expiresIn: '20h' });
            res.json({ token });
        }
    } catch (error) {
        console.error("Server Error: ", error);
        res.status(500).send("Server Error");
    }
});
app.post('/api/login', async(req,res)=>{
    const{username,password}=req.body;
    try{
    const check=await user.findOne({Username:username});
    if(!check){
        console.log("User not found!");
        res.status(404).send(false);
    }
    else{
      const passMatch=await bcrypt.compare(password,check.password);
      if(passMatch){
        console.log("Logged in!");
        const token=jwt.sign({id:check.id,username:check.Username, name:check.Name},jwt_Key,{expiresIn:'20h'})
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
    const{username,password,name,type,Email}=req.body;
    try{
        const check=await user.findOne({username});
        if(check){
            res.status(401).send("Username already exists");
        }
        else{
            const hash=await bcrypt.hash(password,saltRounds);
            const newUser=new user({Username:username,password:hash,Name:name,loginType:type,email:Email});
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
    const{powerArr,bStory,battles,weak,pRole,url}=req.body;
    const username=req.user.username;
    try{
        await heroes.updateOne(
            {Username:username},{
                $set:{
                    SuperPower:powerArr,
                    BackStory:bStory,
                    keyBattles:battles,
                    Weakness:weak,
                    preferredRole:pRole,
                    Resume:url
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
});
app.post('/api/job_post', async (req, res) => {
    try{
        const { companyName, subTitle, description, lastDate, salary, location,requirements } = req.body;
        const newJob = new Doom({
            companyName,
            subTitle,
             requirements,
            description,
            lastDate: new Date(lastDate).toISOString().split('T')[0],
            salary,
            location,
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

app.get('/api/heroes', async (req, res) => {
    const title=req.query.name;
    const result=[];
  try {
    const allHeroes = await Doom.findOne({companyName:title});
    for(const user of allHeroes.users){
        const userData=await heroes.findOne({Username:user});
        result.push(userData);
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    res.status(500).json({ error: "Server error while fetching heroes" });
  }
});

app.get('/api/cards',verifyToken,async (req,res)=>{
    const username=req.user.username;
    try{
        const data=await Doom.find({
            Accepted:{
                $not:{
                    $elemMatch:{Username:username}
                }
            }
        });
        const result=[];
        const user=await heroes.findOne({Username:username});
        for(const jobs of user.AppliedJobs){
           result.push(jobs.name);
        }
        //console.log(products);
        res.json({data,result});
    }
    catch(error){
        console.log("Failed to fetch!",error);
        res.status(500).send(false);
    }
});
app.get('/api/profile',verifyToken,async(req,res)=>{
    const username=req.user.username;
    const check=await heroes.findOne({Username:username});
    if(!check?.SuperPower || check.SuperPower.length === 0){
        res.status(200).send(true);
    }
    else{
        res.status(400).send(false);
    }
});
app.get('/api/heroProfile',verifyToken,async(req,res)=>{
   const username=req.user.username;
   const data=await heroes.findOne({Username:username});
   if(!data){
    console.log("Profile not Found!");
    res.status(404).send(false);
   } 
   else{
    res.json(data);
   }
});
app.get('/api/editprofile', verifyToken, async (req, res) => {
  try {
    const username = req.user.username; // assuming you attach `username` in verifyToken middleware
    const hero = await heroes.findOne({ Username: username });

    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    res.status(200).json({
      SuperPower: hero.SuperPower || [],
      Battles: hero.keyBattles || [],
      Weakness: hero.Weakness || [],
      BackStory: hero.BackStory || '',
      PreferredRole: hero.preferredRole || '',
      ResumeURL: hero.ResumeURL || ''
    });
  } catch (error) {
    console.error('Edit Profile Fetch Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
app.post('/api/job-info',verifyToken,async(req,res)=>{
    const {Title}=req.body;
    try{
    const data=await Doom.findOne({companyName:Title});
    if(!data){
        console.log("No such Title!");
        res.status(404).send(false);
    }
    else{
        res.json(data);
    }
    }
    catch(error){
        console.log(error);
    }
})

app.get('/api/doomOpenings', async (req, res) => {
  try {
    const openings = await Doom.find({}, 'companyName subTitle'); // projection
    if (!openings || openings.length === 0) {
      console.log("No Openings Found!");
      return res.status(404).send(false);
    } else {
      res.json(openings);
    }
  } catch (err) {
    console.error("Error fetching doom openings:", err);
    res.status(500).send("Server Error");
  }
});

const http = require('http');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  },
});

// In-memory map to store socket connections
const users = {}; // { username: socket.id }

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Register user to socket ID
  socket.on('register', (username) => {
    users[username] = socket.id;
    console.log(`${username} registered with socket ID ${socket.id}`);
  });

  socket.on('requestHistory', async ({ sender, recipient }) => {
    try {
      const messages = await Message.find({
        $or: [
          { sender, recipient },
          { sender: recipient, recipient: sender }
        ]
      }).sort({ timestamp: 1 });

      socket.emit('chatHistory', messages);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  });

  socket.on('sendMessage', async (msg) => {
    try {
      const saved = await Message.create(msg);

      const recipientSocket = users[msg.recipient];
      if (recipientSocket) {
        io.to(recipientSocket).emit('receiveMessage', saved);
      }

      socket.emit('receiveMessage', saved);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    for (const [username, id] of Object.entries(users)) {
      if (id === socket.id) {
        delete users[username];
        console.log(`${username} disconnected`);
        break;
      }
    }
  });
});

app.get('/api/users', async (req, res) => {
  try {
    const usersList = await heroes.find({
        AppliedJobs:{$elemMatch:{status:'Accepted'}}
    });
    const formatted = usersList.map(u => ({ username: u.Username }));
    console.log(formatted);
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching users" });
  }
});

app.get('/api/current-user', async (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, jwt_Key);
    res.json({ username: decoded.username });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running with Socket.IO on http://localhost:${PORT}`);
});



app.post('/api/hero-user',verifyToken,async(req,res)=>{
    const username=req.user.username;
    const {title}=req.body;
    try{
        await Doom.updateOne(
            {companyName:title},{
                $push:{
                    users:username
                }
            }
        );
        await heroes.updateOne(
            {Username:username},{
                $push:{
                    AppliedJobs:{name:title,status:'Pending'}
                }
            }
        );
        res.status(200).send(true);
    }
    catch(error){
        console.log("Error! ",error);
    }
});
app.get('/api/status-applications',verifyToken,async(req,res)=>{
    const username=req.user.username;
    try{
        const applications=await heroes.findOne({Username:username});
        console.log(applications.AppliedJobs);
        res.json(applications.AppliedJobs);
        
    }
    catch(error){
        console.error("Error fetching applications:", error);
        res.status(500).send("Server Error");
    }
});
app.post('/api/hero-status',verifyToken,async(req,res)=>{
    const {applications}=req.body;
    const result=[];
    try{
    for(const title of applications){
        const data=await Doom.findOne({companyName:title.name});
        result.push(data);
    }
    res.json(result);
}
catch(error){
    console.error("Error fetching hero status ",error);
    res.status(500).send(false);
}
});
app.post('/api/hero-update',async(req,res)=>{
    const {username,status,title}=req.body;
    try{
        await heroes.updateOne({Username:username,"AppliedJobs.name":title},{
            $set:{
                "AppliedJobs.$.status":status
            }
        });
        await Doom.updateOne({companyName:title},{
            $pull:{users:username}
        });
        if(status=='Accepted'){
        await Doom.updateOne({companyName:title},{
            $push:{Accepted:{username:username,status}}
        });
    }
        res.status(200).send(true);
    }
    catch(error){
        console.error("Error updating",error);
    }
});

app.post('/api/video-call',async(req,res)=>{
    const{recipient,to,subject,text}=req.body;
    try{
        await heroes.updateOne({Username:recipient,"AppliedJobs.$.status":'Accepted'},{
            $set:{
                "AppliedJobs.$.videoCall":true
            }
        });
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:config.Gmail,
                pass:config.Gmail_APP,
            }
        });
        const MailOptions={
            from:config.Gmail,
            to,
            subject,text
        }
        await transporter.sendMail(MailOptions);
        res.status(200).send(true);
    }
    catch(error){
        console.log("Error video call",error);
        res.status(500).send("Server Error");
    }
});
app.post('/api/email',async(req,res)=>{
    const {recipient}=req.body;
    try{
    const data=await user.findOne({Username:recipient});
    res.json(data);}
    catch(error){
        console.log("error fetching email",error);
        res.status(500).send(false);
    }
});
app.post('/api/video-call-off',async(req,res)=>{
    const{username}=req.body;
    try{
        await heroes.updateOne({USername:username,"AppliedJobs.$.videoCall":true},{
            $set:{
                "AppliedJobs.$.videoCall":false
            }
        });
    }
    catch(error){
        console.log("Error video-call off!",error);
    }
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

