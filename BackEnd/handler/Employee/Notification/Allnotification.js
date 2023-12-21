const notifications=require("../../../utility/employee/Notification/notifications")

async function getAllNotification(req, res){
    notifications.notifications(req.body.decoded.user_name)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })
}

module.exports={getAllNotification}