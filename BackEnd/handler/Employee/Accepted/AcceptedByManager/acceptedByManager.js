const EmployeeManagerAcceptedRequest=require("../../../../utility/employee/acceptedRequest/acceptedBymanager/acceptedByManager")

function EmployeeManagerAcceptedRequest(req, res){
    EmployeeManagerAcceptedRequest.EmployeeManagerAcceptedRequest()
        .then((data)=>{
            res.send(data.Employee_Request)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again!"})
        })
}

module.exports={EmployeeManagerAcceptedRequest}