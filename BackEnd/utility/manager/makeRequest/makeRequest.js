const  { gql, GraphQLClient  }=require('graphql-request');
const confirmationNumber=require("../../Auth/confirmationNumber")
const updateQuantity=require("../../item/update/updateQuantity")

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const doc=gql`
mutation MyMutation(
    $item_no: Int!, 
    $manager_username: String!, 
    $quantity_requested: Int!, 
    $confirmation_number: Int!
    $item_name:String!
  ) {
    insert_ManagerRequest(objects: {
      item_no: $item_no, 
      manager_username: $manager_username, 
      quantity_requested: $quantity_requested, 
      confirmation_number: $confirmation_number, 
      item_name: $item_name
    }) {
      returning {
        id
        item_no
        quantity_requested
        manager_username
        is_approved
        confirmation_number
        isApprovedByStoreHead
        isRejectedByStoreHead
        created_at
        updated_at
      }
    }
    update_Item(where: {item_number: 
        {_eq: $item_no}}, 
        _inc: { productquantitynumber: $quantity_requested}) {
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

  async function managerRequest(item_no, item_name, quantity_requested, manager_username){

                const variables={
                    item_no: item_no, 
                    item_name:item_name,
                    manager_username: manager_username, 
                    quantity_requested: quantity_requested,
                    confirmation_number: confirmationNumber.confirmationNumber()
                    }

            try{
                const data=await client.request(doc, variables, requestHeaders)
                    updateQuantity.updateQuantity(Number(item_no), Number(quantity_requested))
                        .then(async (update_data)=>{
                            console.log(update_data)
                        })
                        .catch((error)=>{
                            console.log("Error while updating Quantity from Manager Request.")
                            return error
                        })
                return data
            }catch(error){
                console.log("Error while inserting Request into the manager Request DB.")
                return error
            }
  }

  module.exports={managerRequest}