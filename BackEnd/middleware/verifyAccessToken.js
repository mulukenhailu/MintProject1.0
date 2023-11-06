const jwt = require("jsonwebtoken");
<<<<<<< HEAD


function verifyAccessToken(req, res, next){
=======
>>>>>>> 5f1091856a18e693c92999b538410f1e08ca9b40


function verifyAccessToken(req, res, next){
    if(!(req.cookies)){
        return res.status(401).send("Unauthorized request");
    }

    const token=req.cookies.accessToken;
<<<<<<< HEAD
    console.log(">>>>>>>", token);
    
=======
>>>>>>> 5f1091856a18e693c92999b538410f1e08ca9b40
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

