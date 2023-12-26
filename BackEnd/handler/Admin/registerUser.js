const addNewUser = require("../../utility/common/addNewUser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function register(req, res) {
  let { user_name, password, first_name, last_name, role, manager_username, department} = req.body;

  console.log(req.body)

  console.log(user_name, password, first_name, last_name, role, manager_username, department);
 
      if (role === "employee"){
        role = 1
      }else if(role === "manager"){
        role = 2
      }else if(role === "storehead"){
        role = 3
      }else if(role === "storekeeper"){
        role = 4
      }else if(role === "admin"){
        role = 5
      }else{
        res.status(404).send({error:"Please choose the Correct role."})
      }

  console.log(role);

  const hash = bcrypt.hashSync(password, saltRounds);

  addNewUser
    .addNewUser(user_name, hash, first_name, last_name, role, manager_username, department)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          console.log("Unexpected error while adding new user to the database");
          console.log({"Error adding new User to the DB":error});
          res.status(404).send({error:"The User Name already used"})
        });
}

module.exports = { register };
