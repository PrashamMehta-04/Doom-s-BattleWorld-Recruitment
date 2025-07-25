require('dotenv').config();
module.exports={
    mongoURI:process.env.MONGO_URI,
    JWTkey:process.env.JWT_SECRET,
    cloudKey:process.env.CLOUDINARY_KEY,
    cloudSecret:process.env.CLOUDINARY_SECRET,
    cloudName:process.env.CLOUDINARY_NAME,
    port:process.env.PORT || 5000,
};
const DOOM_USERNAME = "prashammehta360@gmail.com";