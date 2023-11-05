const addNewUser = require("../../utility/common/addNewUser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function register(req, res) {
  let { user_name, password, first_name, last_name, role_id } = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(password, saltRounds);

  addNewUser
    .addNewUser(user_name, hash, first_name, last_name, role_id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.log("Unexpected error while adding new user to the database");
      console.log(error);
      return;
    });
}

module.exports = { register };
