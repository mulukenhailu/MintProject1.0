//check if the the request with the given id exists in the StoreHead approved Employee request DB
//if it exists check if the confirmation number of  the given request match with id of the stored request in the DB
//if it match , insert the data with the additional parameter of ----> (storeKeeper user_name ) into the History DB.

const validateRequestForStoreKeeper=require("../../utility/storeKeeper/validateRequest")

async  function RequestForTheStoreKeeper(request_id){
    conso
    validateRequestForStoreKeeper.validateRequestForStoreKeeper()
        .then((data)=>{
            console.log(data)
        })
        .catch((error)=>{
            console.log(error)
        })
}

module.exports={RequestForTheStoreKeeper}
