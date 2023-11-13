const getAllItemsUtility=require("../../utility/item/getAllItem")

function getAllItem(req, res){
        getAllItemsUtility.getAllItemsUtility()
            .then((data)=>{
                res.send(data)
            })
            .catch((error)=>{
                console.log("Error from get all item>>>", error)
                res.status(500).json({error:"Internal Server Error!"})
            })
}

module.exports={getAllItem}