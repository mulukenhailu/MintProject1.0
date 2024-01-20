const validateResetPassword = require("../../utility/Auth/validateResetPassword");

async function confirmOldPassword(req, res) {
    try {
        let { oldpassword } = req.body;
        console.log(oldpassword);

        const data = await validateResetPassword.validateResetPassword(req.body.decoded.user_name, oldpassword.toString());
        console.log(data);
        if (data){
            res.send(data);
        }
        else{
            res.status(402).send({error:"Incorrect Password."})
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(501).send({ error: "Retry Again." });
    }
}

module.exports = { confirmOldPassword };
