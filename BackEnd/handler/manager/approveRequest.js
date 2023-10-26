const validateApproval=require("../../utility/Auth/validateRequest")

function approveRequest(req, res){
    console.log(req.params)
    // check if the request exist in the employee request or not 
    validateApproval.validateApproval(req.params.id)
        .then((data)=>{
            if (data.Employee_Request.length === 1){
                res.send("ok")
            }
            else{
                res.send({"message":"NO request found to send"})
            }
        })
        .catch((error)=>{
            console.log(error)
        })


    

    // if it exists add the request to the manager approved employee requeat DB using the same request id 
}

module.exports={approveRequest}