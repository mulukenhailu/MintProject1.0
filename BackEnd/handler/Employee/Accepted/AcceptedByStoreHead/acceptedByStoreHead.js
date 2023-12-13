const EmployeeStoreHeadAcceptedRequest=require("../../../../utility/employee/acceptedRequest/AcceptedByStoreHead/acceptedByStoreHead")

function EmployeeStoreHeadAcceptedRequest(req, res){
    EmployeeStoreHeadAcceptedRequest.EmployeeStoreHeadAcceptedRequest()
        .then((data)=>{
            res.send(data.Employee_Request)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again!"})
        })
}

module.exports={EmployeeStoreHeadAcceptedRequest}