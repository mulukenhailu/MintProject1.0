const rejectRequestByManager=require("../../../utility/manager/rejectRequest/rejecteRequest")
async function managerRejectRequest(req, res){
    
    rejectRequestByManager.rejectRequestByManager(req.params.id, req.params.item_no, req.params.quantity_requested)
        .then((data)=>{
            console.log(data)
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })

}

module.exports={managerRejectRequest}