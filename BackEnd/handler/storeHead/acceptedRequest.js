const acceptedRequest=require("../../utility/storeHead/acceptedRequest/acceptedRequest")



function acceptance(req, res){

    if (req.body.decoded.role != "storehead"){
        return res.sendStatus(401);
    }
    
    acceptedRequest.acceptedRequest()
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{   
            console.log("Error from the storeHead accepted Request:", error)
            res.status(500).send({error:"Please Retry Again."})
        })
}
module.exports={acceptance}