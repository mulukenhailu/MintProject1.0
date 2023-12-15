const allStoreHeadRejection=require("../../utility/storeHead/rejectRequest/AllRejectedRequest/rejectedRequests")

async function storeHeadRejection(req, res){
    allStoreHeadRejection.allStoreHeadRejectedEmployeeReq()
        .then((data)=>{
            console.log(data)
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })

}

module.exports={storeHeadRejection}