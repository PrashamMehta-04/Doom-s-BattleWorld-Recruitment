require('dotenv').config();
module.exports={
    mongoURI:process.env.MONGO_URI,
    JWTkey:process.env.JWT_SECRET,
    port:process.env.PORT || 5000,
};