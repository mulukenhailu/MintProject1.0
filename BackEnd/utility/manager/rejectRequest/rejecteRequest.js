const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const validateRejection=require("../../Auth/validateRequest")

const doc=gql`
mutation MyMutation($request_id: uuid!, $item_no: Int!, $quantity_requested: Int!) {
  update_Employee_Request(where: {_and: {id: {_eq: $request_id}, isApprovedByManager: {_eq: false}, isApprovedByStoreHead: {_eq: false}, isRejectedByStoreHead: {_eq: false}, isRejectedByManager: {_eq: false}}},
     _set: {isRejectedByManager: true}) {
    returning {
      Item {
        created_at
        item_number
        productdescription
        productmodel
        productmodelnumber
        productname
        productphoto
        productquantitynumber
        productsource
        productstandardtype
        productstatus
      }
      manager_username
      quantity_requested
    }
  }
  update_Item(where: {item_number: {_eq: $item_no}}, _inc: {productquantitynumber: $quantity_requested}) {
    returning {
      productquantitynumber
    }
  }
}

  
`
const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }



  async  function rejectRequestByManager(request_id, item_no){

    validateRejection.validateApproval(request_id)
        .then(async (data)=>{

            if (data.Employee_Request && data.Employee_Request.length === 1){

              const variables={
                request_id,
                item_no,
                quantity_request:data.Employee_Request.quantity_requested
               }

                try{
                    const data=await client.request(doc, variables, requestHeaders)
                    return data
                }catch(error){
                    console.log("Error from the Manager Rejecting Request.")
                    throw error
                }
                   
            }
            else{
                res.send({"message":"NO request found tobe approved"})
            }

        })
        .catch((error)=>{
          console.log(error)
          res.status(500).send({error:"Retry Again."})
        })


  }

  module.exports={rejectRequestByManager}