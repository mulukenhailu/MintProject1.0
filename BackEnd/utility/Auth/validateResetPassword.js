const bcrypt = require("bcrypt");
const validateLogin = require("../Auth/validateLogin");

async function validateResetPassword(user_name, oldPassword) {
    console.log(user_name, oldPassword);

    try {
        const data = await validateLogin.validateLogin(user_name);

        if (data.User) {
            const isValid = bcrypt.compareSync(oldPassword, data.User[0].Password);
            console.log(isValid);
            return isValid;
        }
    } catch (error) {
        console.log("Error while validating Reset Password.");
        throw error;
    }
}

module.exports = { validateResetPassword };
