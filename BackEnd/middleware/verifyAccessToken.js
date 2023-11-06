const jwt = require("jsonwebtoken");

var cookie = require('cookie');
function verifyAccessToken(req, res, next){

    // if(!(req.cookies)){
    //     return res.status(401).send("Unauthorized request");
    // }
    res.setHeader('Set-Cookie', cookie.serialize('name', "memem", {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }));
    var cookies = cookie.parse(req.headers.cookie || '');
    console.log(cookies.name)

    // if (!token) {
    //     return res.status(401).send("Access denied. No token provided.");
    //   }
      
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     console.log("decoded", decoded);
    //     req.body.decoded=decoded;
    //     next();
    //   } catch (err) {
    //     res.status(400).send("Invalid token.");
    // }

    next();
}

module.exports={verifyAccessToken}