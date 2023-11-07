const addNewUser = require("../../utility/common/addNewUser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function register(req, res) {
  let { user_name, password, first_name, last_name, role_id } = req.body;

  console.log(user_name, password, first_name, last_name, role);
 
      if (role === "employee"){
        role_id = 1
      }else if(role === "manager"){
        role_id = 2
      }else if(role === "storehead"){
        role_id = 3
      }else if(role === "storekeeper"){
        role_id = 4
      }else if(role === "admin"){
        role = 5
      }else{
        res.status(404).send({"msg":"Please choose the Correct role."})
      }

  console.log(role);

  const hash = bcrypt.hashSync(password, saltRounds);

  addNewUser
    .addNewUser(user_name, hash, first_name, last_name, role)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          console.log("Unexpected error while adding new user to the database");
          console.log(error);
          return;
        });
}

module.exports = { register };
