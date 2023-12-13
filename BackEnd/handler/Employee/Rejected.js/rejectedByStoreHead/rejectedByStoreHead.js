const EmployeeStoreHeadRejectedRequest=require("../../../../utility/employee/rejectedRequest/rejectedByStoreHead/rejectedByStoreHead")

function EmployeeStoreHeadRejectedRequest(req, res){
    EmployeeStoreHeadRejectedRequest.EmployeeStoreHeadRejectedRequest()
        .then((data)=>{
            res.send(data.Employee_Request)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again!"})
        })
}

module.exports={EmployeeStoreHeadRejectedRequest}