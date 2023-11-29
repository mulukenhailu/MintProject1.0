const userAggregate=require("../../utility/common/userAggregate")

async function allManagersAvailable(req, res){

    userAggregate.userAggregate(2)
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send("Network Error!.")
        })


}

module.exports={allManagersAvailable}