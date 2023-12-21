const updateViwedNotification=require("../../../utility/employee/Notification/updateViwedNotification")

async function getupdateOfViwedNotificaion(req, res){
    console.log(req.params.notify_id)
    updateViwedNotification.updateViwedNotification(req.params.notify_id)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })
}

module.exports={getupdateOfViwedNotificaion}