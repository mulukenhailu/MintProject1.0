const storeHeadPending=require("../../utility/storeHead/pendingRequest/pending")

async function  storeHeadPendings(req, res){

  storeHeadPending.requestToApproveStoreHead()
    .then((data)=>{
      res.send(data)
    })
    .catch((error)=>{
      console.log(error)
      res.status(500).send({error:"Retry again"})
    })

}

module.exports={storeHeadPendings}