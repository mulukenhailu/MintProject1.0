//1.check the role of currently logged in user
//2.if the role of the user is not storehead then return else continue
//3.check if the request with the given id exist in the manager approved employee request
//4.if not return else add that request to the storehead approved employee request DB.

const validateApprovalofStorehead=require("../../utility/Auth/validateRequest");
const addApprovalByStoreHead=require("../../utility/common/addApprovalByStoreHeads")


function approveRequestByStoreHead(req, res){


    let{remark, senderFirstName, senderLastName, senderProfilePicture}=req.body

    if (req.body.decoded.role != "storehead"){
        return res.sendStatus(401);
    }

    validateApprovalofStorehead.validateApprovalofStorehead(req.params.id)
        .then((data)=>{
            console.log(">>>>", data)
            if(data.ManagerAndEmpRequest && data.ManagerAndEmpRequest.length === 1){
                addApprovalByStoreHead.addApprovalByStoreHead(req.params.id, data, remark, senderFirstName, senderLastName, senderProfilePicture)
                    .then((data)=>{
                        res.send(data)
                    })
                    .catch((error)=>{
                        console.log(error);
                        res.send({"message":"Retry Again."});
                    })

            }else{
                res.send({"message":"NO request found tobe approved or Invalid Request Id."})
            }
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send({error:"No Request found tobe approved"});
        })

}

module.exports={approveRequestByStoreHead}