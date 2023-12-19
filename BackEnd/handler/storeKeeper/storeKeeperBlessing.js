//check if the the request with the given id exists in the StoreHead approved Employee request DB
//if it exists check if the confirmation number of  the given request match with id of the stored request in the DB
//if it match , insert the data with the additional parameter of ----> (storeKeeper user_name ) into the History DB.

const validateRequestForStoreKeeper=require("../../utility/storeKeeper/validateRequest")
const storekeeperConfirmEmpReq=require("../../utility/storeKeeper/confirmRequest")

async  function RequestForTheStoreKeeper(req, res){

    if (req.body.decoded.role != "storekeeper" ){
        return res.sendStatus(401);
    }

    validateRequestForStoreKeeper.validateRequestForStoreKeeper(req.params.id)
        .then((data)=>{
            console.log(data)
            console.log(typeof  data.storeHeadApprovedEmpRequest[0].confirmation_number)
            console.log(typeof Number(req.params.confirmation_number))
            if (data.storeHeadApprovedEmpRequest[0].confirmation_number === Number(req.params.confirmation_number)){
                storekeeperConfirmEmpReq.finalize(data, req.body.decoded.user_name)
                    .then((data)=>{
                        res.send(data)
                    })
                    .catch((error)=>{
                        console.log(error)
                        res.status(500).send({error:"Retry Again."})
                    })
            }
            else{
                res.send("Incorrect Confirmation Password.")
            }
        })
        .catch((error)=>{
            console.log(error)
        })
}

module.exports={RequestForTheStoreKeeper}
