const getSingleNotification=require("../../../utility/employee/Notification/getSingleNotification")

async function getNotification(req, res){
    console.log(req.params.notifyId)
    getSingleNotification.getSingleNotification(req.params.notifyId)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(501).send({error:"Retry Again."})
        })
}

module.exports={getNotification}