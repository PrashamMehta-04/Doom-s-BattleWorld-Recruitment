const jwt = require('jsonwebtoken');
const config=require('./config');
const jwt_Key=config.JWTkey;
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
      console.log('Missing auth header');
      return res.sendStatus(401);
    }
  const token = authHeader && authHeader.split(' ')[1];
   if (!token) {
      console.log('Token missing in header');
      return res.sendStatus(401);
    }

  jwt.verify(token, jwt_Key, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = verifyToken;