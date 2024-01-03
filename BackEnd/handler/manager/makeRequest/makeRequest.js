const managerRequest=require("../../../utility/manager/makeRequest/makeRequest")

async function managerMakeRequest(req, res){

    if (req.body.decoded.role != "manager" ){
        return res.sendStatus(401);
    }

    let{item_no, item_name, quantity_requested}=req.body
    managerRequest.managerRequest(item_no, item_name, quantity_requested, req.body.decoded.user_name)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })
}

module.exports={managerMakeRequest}