const validateApproval=require("../../utility/Auth/validateRequest")
const addApprovalByManager=require("../../utility/common/addApprovalByManager")

function approveRequest(req, res){

    let{remark, senderFirstName, senderLastName, senderProfilePicture}=req.body

    if (req.body.decoded.role != "manager" ){
        return res.sendStatus(401);
    }
    
    console.log(req.params)
    // check if the request exist in the employee request or not 
    validateApproval.validateApproval(req.params.id)
        .then((data)=>{
            console.log(data)
                // if it exists add the request to the manager approved employee requeat DB using the same request id 
            if (data.Employee_Request && data.Employee_Request.length === 1){
                console.log("we are here")
                addApprovalByManager.addApprovalByManager(req.params.id, data, remark, senderFirstName, senderLastName, senderProfilePicture)
                    .then((data)=>{
                        res.send(data);
                    })
                    .catch((error)=>{
                        console.log(error);
                        if(error.response.errors[0].message.includes("Uniqueness violation")){
                            res.send({"message":"Already Approved"});
                        }
                    })
            }
            else{
                res.send({"message":"NO request found tobe approved"})
            }
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."});
        })

}

module.exports={approveRequest}