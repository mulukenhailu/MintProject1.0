const addNewUser=require("../../utility/common/addNewUser")
const bcrypt = require("bcrypt");
const saltRounds = 10;

function register(req, res){

    
    if (req.body.decoded.role != "admin"){
        return res.sendStatus(401);
    }


    let {user_name, password, first_name, last_name, role_id}=req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
     
    console.log(hash)

        addNewUser.addNewUser(user_name, hash, first_name, last_name, role_id)
            .then((data)=>{
                console.log(data)
                res.send(data)
            })
            .catch((error)=>{
                console.log("Unexpected error while adding new user to the database");
                console.log(error);
                return;
            });
}

module.exports={register}