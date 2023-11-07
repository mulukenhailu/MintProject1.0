const getUserInfo=require("../../utility/common/getUserInfo");

function userInfo(req, res){

    console.log(req.params.username);

    getUserInfo.getUserInfo(req.params.username)
        .then((data)=>{

            console.log(data);

            if (data.User.length > 1 ){
                res.status(500).json({error:"Unexpected Error has occured.Retry again."})
            }
            
            res.send(data.User[0]);
        })
        .catch((error)=>{
            console.log(error);
            res.sendStatus(404)
        })
    
}

module.exports={userInfo}