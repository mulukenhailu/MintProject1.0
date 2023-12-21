const storeHeadRejectEmployeeRequest=require("../../utility/storeHead/rejectRequest/rejectRequest")

async function storeHeadRejectEmployeeReq(req, res){

    let{reason, receiver}=req.body
    console.log(req.params.id, req.params.item_no, req.params.quantity_requested, reason, receiver)
    
    storeHeadRejectEmployeeRequest.rejectRequestByStoreHead(
        req.params.id, 
        req.params.item_no, 
        req.params.quantity_requested, 
        reason,
        req.body.decoded.user_name,
        receiver
        )
        .then((data)=>{
            console.log(data)
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })

}

module.exports={storeHeadRejectEmployeeReq}