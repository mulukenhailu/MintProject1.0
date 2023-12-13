const EmployeePendingRequest=require("../../../utility/employee/pendingRequest/pendingRequest")

function EmployeePendingRequest(req, res){
    EmployeePendingRequest.EmployeePendingRequest()
        .then((data)=>{
            res.send(data.Employee_Request)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again!"})
        })
}

module.exports={EmployeePendingRequest}