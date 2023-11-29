const userAggregate=require("../../utility/common/userAggregate")

async function allManagersAvailable(req, res){

    console.log(req)

    userAggregate.userAggregate(2)
        .then((data)=>{
            console.log(data)
            res.send(data.User)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send("Network Error!.")
        })


    console.log(res)
}

module.exports={allManagersAvailable}