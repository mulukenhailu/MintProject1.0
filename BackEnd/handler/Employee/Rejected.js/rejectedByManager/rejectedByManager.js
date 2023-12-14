const EmployeeManagerRejectedRequest=require("../../../../utility/employee/rejectedRequest/rejectedByManager/rejectedByManager")

function EmployeesManagerRejectedRequest(req, res){
    EmployeeManagerRejectedRequest.EmployeeManagerRejectedRequest()
        .then((data)=>{
            if(data.Employee_Request.length !==0 ){
                res.send(data.Employee_Request)
            }else{
                res.send("Empty")
            }
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again!"})
        })
}

module.exports={EmployeesManagerRejectedRequest}