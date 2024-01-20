const getAllItemsUtility=require("../../utility/item/getAllItem")

function getAllItem(req, res){

    console.log(req.params.status)

        getAllItemsUtility.getAllItemsUtility(req.params.status)
            .then((data)=>{
                res.send(data)
            })
            .catch((error)=>{
                console.log("Error from get all item>>>", error)
                res.status(500).json({error:"Retry Again!"})
            })
}

module.exports={getAllItem}