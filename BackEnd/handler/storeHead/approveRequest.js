//1.check the role of currently logged in user
//2.if the role of the user is not storehead then return else continue
//3.check if the request with the given id exist in the manager approved employee request
//4.if not return else add that request to the storehead approved employee request DB.

const validateApprovalofStorehead=require("../../utility/Auth/validateRequest");
const addApprovalByStoreHead=require("../../utility/common/addApprovalByStoreHeads")


function approveRequestByStoreHead(req, res){

    console.log(req.params.id);
    console.log(req.body.decoded);

    if (req.body.decoded.role != "storehead"){
        return res.sendStatus(401);
    }

    validateApprovalofStorehead.validateApprovalofStorehead(req.params.id)
        .then((data)=>{
            console.log(data)
            if(data.ManagerAppEmpRequest && data.ManagerAppEmpRequest.length === 1){
                addApprovalByStoreHead.addApprovalByStoreHead(req.params.id, data)
                    .then((data)=>{
                        res.send(data)
                    })
                    .catch((error)=>{
                        console.log(error);
                        if(error.response.errors[0].message.includes("Uniqueness violation")){
                            res.send({"message":"Already Approved"});
                        }
                    })

            }else{
                res.send({"message":"NO request found tobe approved or Invalid Request Id."})
            }
        })
        .catch((error)=>{
            console.log(error.response.errors[0].message);
            res.send({"message":"No Request found tobe approved"});
        })

}

module.exports={approveRequestByStoreHead}