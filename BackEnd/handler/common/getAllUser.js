const userAggregate=require("../../utility/common/userAggregate");

function getAllUser(req, res){

    console.log(req.query.id, typeof req.query.id);
    console.log(req.query.username,  typeof req.query.username);

    if((req.query.id && req.query.username)){

            userAggregate.userAggregate(req.query.id, req.query.username)
            .then((data)=>{
                
                if(data.User.length === 0){
                    res.send("No user Found")
                }
                else{
                    res.send(data.User)
                }
            })
            .catch((error)=>{
                console.log("Error from getuser");
                console.log(error);
                res.status(500).json({error:"Internal server error."})
            })


    }
    else if((req.query.id)){

        userAggregate.userAggregate(req.query.id)
            .then((data)=>{
                if(data.User.length === 0){
                    res.send("No user Found")
                }
                else{
                    res.send(data.User)
                }
            })
            .catch((error)=>{
                console.log("Error from getuser");
                console.log(error);
                res.status(500).json({error:"Internal server error."})
            })
    }else{

        console.log("no input");

        userAggregate.userAggregate()
            .then((data)=>{
                if(data.User.length === 0){
                    res.send("No user Found")
                }
                else{
                    res.send(data.User)
                }
            })
            .catch((error)=>{
                console.log("Error from getuser");
                console.log(error);
                res.status(500).json({error:"Internal server error."})
            })

    }
}

module.exports={getAllUser}