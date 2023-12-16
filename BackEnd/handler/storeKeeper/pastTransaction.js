const allPastTransactions=require("../../utility/storeKeeper/transactions")

async function history(req, res){
    allPastTransactions.allTransactions()
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })
}

module.exports={history}