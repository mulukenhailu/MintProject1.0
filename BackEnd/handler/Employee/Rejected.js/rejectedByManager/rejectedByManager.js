const EmployeeManagerRejectedRequest=require("../../../../utility/employee/rejectedRequest/rejectedByManager/rejectedByManager")

function EmployeesManagerRejectedRequest(req, res){
    EmployeeManagerRejectedRequest.EmployeeManagerRejectedRequest()
        .then((data)=>{
            res.send(data.Employee_Request)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again!"})
        })
}

module.exports={EmployeesManagerRejectedRequest}