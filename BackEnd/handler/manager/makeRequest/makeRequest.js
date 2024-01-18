const  { gql, GraphQLClient  }=require('graphql-request');
const confirmationNumber=require("../../../utility/Auth/confirmationNumber")
const updateStatus=require("../../../utility/item/update/updateStatus")
const currentStoreHead=require("../../../utility/common/currentStoreHead")
const itemByItemNumber=require("../../../utility/common/itemByItemNumber")

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  

  const doc=gql`
            mutation MyMutation (
                $item_no: Int!, 
                $item_name:String!,
                $quantity_requested: Int!,
                $manager_username: String!, 
                $employee_username: String!
                $storehead_username: String!
                $confirmation_number: Int!
                $quantity_decreased:Int!
                $isApprovedByManager:Boolean!
            ){
                insert_ManagerAndEmpRequest(objects: {
                    item_no: $item_no, 
                    item_name:  $item_name, 
                    quantity_requested: $quantity_requested, 
                    manager_username: $manager_username, 
                    employee_username: $employee_username, 
                    storehead_username: $storehead_username, 
                    confirmation_number: $confirmation_number, 
                    isApprovedByManager: $isApprovedByManager
                }) {
                    returning {
                        id
                        item_no
                        item_name
                        quantity_requested
                        manager_username
                        confirmation_number
                        is_approved
                        isApprovedByManager
                        isApprovedByStoreHead
                        isRejectedByManager
                        isRejectedByStoreHead
                    }
                    }
            update_Item(where: {
                item_number: {_eq: $item_no}}, 
                _inc: { productquantitynumber: $quantity_decreased}) 
                {
                returning {
                    item_number
                    productdescription
                    productmodel
                    productmodelnumber
                    productname
                    productquantitynumber
                    productsource
                    productphoto
                    productstatus
                    productstandardtype
                    created_at
                    updated_at
                }
            }
            }
     `

     const requestHeaders = {
        'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
      }

async function managerMakeRequest(req, res){

            if (req.body.decoded.role != "manager" ){
                return res.sendStatus(401);
            }

            let{item_no, item_name, quantity_requested}=req.body
    
            const variables={
                item_no: item_no, 
                item_name:item_name,
                manager_username: req.body.decoded.user_name, 
                employee_username: req.body.decoded.user_name,
                storehead_username: await currentStoreHead.currentStoreHead(),
                quantity_requested: quantity_requested,
                quantity_decreased: -1*quantity_requested,
                isApprovedByManager:true,
                confirmation_number: confirmationNumber.confirmationNumber()
                }


                itemByItemNumber.itemByItemNumber(item_no, quantity_requested)
                    .then(async (validRequest)=>{
                        if(validRequest){
                            try {
                                const data = await client.request(doc, variables, requestHeaders);
                                if(data.update_Item.returning[0].productquantitynumber==0){
                                    updateStatus.updateStatus(item_no)
                                        .then((Sdata)=>{
                                           console.log(Sdata)
                                        })
                                        .catch((error)=>{
                                            console.log(error)
                                            res.sendStatus(500)
                                        })
                                }
                                res.send(data)
                            } catch (error) {
                                console.log("Error while inserting Request into the manager Request DB.");
                                console.log(error);
                                res.status(500).send({error:"Retry Again!."});
                            }
                        }
                        else{
                            res.status(402).send({error:"Not a valid Quantity."})
                        }
                    })         
    }

module.exports={managerMakeRequest}