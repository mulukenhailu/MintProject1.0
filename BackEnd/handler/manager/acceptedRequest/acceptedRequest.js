//go to the manager approved employee request database
//using the username of currently logged in manager 
//filter out the request for that manager

const acceptedRequest=require("../../../utility/manager/acceptedRequest/acceptedRequest")



function acceptance(req, res){

    if (req.body.decoded.role != "manager" ){
        return res.sendStatus(401);
    }

    acceptedRequest.acceptedRequest(req.body.decoded.user_name)
    .then((data)=>{
        res.send(data)
    })
    .catch((error)=>{
        console.log("error from manager accepted employee request:", error)
        res.status(500).send({error:"Network Error.Retry again!"})
    })
}

module.exports={acceptance}

