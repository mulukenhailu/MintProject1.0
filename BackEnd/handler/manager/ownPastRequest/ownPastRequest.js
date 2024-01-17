const ownPastRequest=require("../../../utility/manager/pastRequest/pastRequest")

async function managerPastRequest(req, res){

    if (req.body.decoded.role != "manager" ){
        return res.sendStatus(401);
    }

    ownPastRequest.pastRequest(req.body.decoded.user_name)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Network Error.Retry Again"})
        })

}

module.exports={managerPastRequest}