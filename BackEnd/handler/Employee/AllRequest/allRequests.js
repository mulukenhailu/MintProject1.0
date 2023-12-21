const allRequestsMade=require("../../../utility/employee/AllRequestsMade/allRequestsMade")

async function getAllRequestMade(req, res){
    allRequestsMade.allRequestsMade(req.body.decoded.user_name)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send({error:"Retry Again."})
        })

}
module.exports={getAllRequestMade}