const { validateLogin } = require("../../utility/Auth/validateLogin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function login(req, res){

    let{user_name, password} = req.body;

    if (!(user_name && password )) {
        res.status(400).send("Please inset the required information");
      }

    console.log(user_name, password);

    validateLogin(user_name)
    .then((data)=>{
        
        if(data.User.length != 0){

            isValid=bcrypt.compareSync(password, data.User[0].Password)
            
            if(isValid){

                const token = jwt.sign({ role:data.User[0].Role.role_name, user_name: data.User[0].user_name }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                  });

                  console.log("==>", token);

                  res.cookie("accessToken", token, {httpOnly: true, sameSite:"None", secure:true, 
                  maxAge:24*60*60*60*1000
                 });

                console.log("correct password");
                console.log(data.User[0]);
                res.send({"logged_in_user":data.User[0]});

            }else{

                console.log("Incorrect password");
                res.status(400).json({ error: "Incorrect password" });
            }
            
        } else {
            console.log("No user found");
            res.status(400).json({error:"User Not Found."})
        }
    })
    .catch((error)=>{
        console.log("error after fetching  some data from User DB")
        console.log(error);
        res.status(400).json({error:"User Not Found."})
    })


}

module.exports={login}