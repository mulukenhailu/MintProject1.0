const deleteItemUtility=require("../../utility/item/deleteItem");

function deleteItem(req, res){
    deleteItemUtility.deleteItemUtility(req.params.itemNo)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log("Error from delete item>>>", error);
            res.status(500).json({error:"Internal Server Error!"})
        })
}

module.exports={deleteItem}