const EmployeeRequestRejectionByManager=require("../../../utility/manager/rejectRequest/rejecteRequest")
async function managerRejectRequest(req, res){
    EmployeeRequestRejectionByManager.rejectRequestByManager(req.params.id, req.params.item_no)
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