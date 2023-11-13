const getitemUtility=require("../../utility/item/getItem");

function getItem(req, res){
    getitemUtility.getitemUtility(req.params.itemNo)
        .then((data)=>{
            res.send(data.Item[0])
        })
        .catch((error)=>{
            console.log("Error from get item>>>", error);
            res.status(500).json({error:"Internal Server Error!"})
        })
}

module.exports={getItem}