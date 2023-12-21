const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const doc=gql     `
                    mutation MyMutation(
                      $request_id: uuid!, 
                      $item_no: Int!, 
                      $quantity_requested: Int!, 
                      $sender:String!,
                      $receiver:String!,
                      $description:String!
                      ) {
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
                            updated_at
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
                      insert_notification(objects: {
                        sender: $sender, 
                        receiver: $receiver, 
                        description: $description, 
                        item_no:$item_no,
                        quantity_requested:$quantity_requested
                      }) {
                        returning {
                          Notify_Id
                          sender
                          receiver
                          description
                          isViwed
                          created_at
                          updated_at
                        }
                      }
                    }
`
const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


 async function rejectRequestByManager(request_id, item_no, quantity_requested, reasonOfRejection, sender, receiver){

    console.log(request_id, item_no, quantity_requested, reasonOfRejection, sender)

    const variables={
      request_id,
      item_no,
      quantity_requested,
      sender,
      receiver,
      description:reasonOfRejection
    }

    console.log(variables)

    try{
      const data=await client.request(doc, variables, requestHeaders)
      return data

    }catch(error){
      throw error
    }

  }

  module.exports={rejectRequestByManager}