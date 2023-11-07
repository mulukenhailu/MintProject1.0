const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next){

    
    if(!(req.cookies)){
        return res.status(401).send("Unauthorized request");
    }

    const token=req.cookies.accessToken;
    console.log("==>", token);
    
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
      }
      
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        req.body.decoded=decoded;
        next();
      } catch (err) {
        res.status(400).send("Invalid token.");
    }
}

module.exports={verifyAccessToken}