const  { gql, GraphQLClient  }=require('graphql-request');
const { currentStoreHead } = require('./currentStoreHead');


const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
  headers: {
  },
})

  const document=gql`
  mutation MyMutation(
    $id: uuid!, 
    $item_no: Int!, 
    $item_name: String!, 
    $quantity_requested: Int!, 
    $manager_username: String!, 
    $employee_username: String!, 
    $confirmation_number: Int!, 
    $storehead_username: String!
    $isApprovedByManager: Boolean!,
    $isApprovedByStoreHead: Boolean!,
    $isRejectedByManager: Boolean!,
    $isRejectedByStoreHead: Boolean!, 
    $sender:String!, 
    $receiver:String!, 
    $description:String!
    $senderFirstName:String!, 
    $senderLastName:String!, 
    $senderProfilePicture:String!
    ) {
    insert_ManagerAppEmpRequest_one(object: {
      id: $id, 
      item_no: $item_no, 
      item_name: $item_name, 
      quantity_requested: $quantity_requested, 
      manager_username: $manager_username, 
      employee_username: $employee_username, 
      confirmation_number: $confirmation_number, 
      storehead_username: $storehead_username
      isApprovedByManager: $isApprovedByManager,
      isApprovedByStoreHead: $isApprovedByStoreHead,
      isRejectedByManager: $isRejectedByManager,
      isRejectedByStoreHead: $isRejectedByStoreHead
    }) {
      id
      item_no
      item_name
      quantity_requested
      manager_username
      employee_username
      storehead_username
      confirmation_number
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
      is_approved
    }

    insert_ManagerAndEmpRequest_one(object: {
      id: $id, item_no: $item_no, 
      item_name: $item_name, 
      quantity_requested: $quantity_requested, 
      manager_username: $manager_username, 
      employee_username: $employee_username, 
      confirmation_number: $confirmation_number, 
      storehead_username: $storehead_username, 
      isApprovedByManager: $isApprovedByManager, 
      isApprovedByStoreHead: $isApprovedByStoreHead, 
      isRejectedByManager: $isRejectedByManager, 
      isRejectedByStoreHead: $isRejectedByStoreHead}) 
      {
      id
      item_no
      item_name
      quantity_requested
      manager_username
      employee_username
      storehead_username
      confirmation_number
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
      is_approved
    }

    update_Employee_Request(where: {id: {_eq: $id}}, _set: {isApprovedByManager: true}) {
      affected_rows
    }


      insert_notification(objects: {
        sender: $sender, 
        receiver: $receiver, 
        description: $description,
        item_no:$item_no,
        quantity_requested:$quantity_requested,
        senderFirstName:$senderFirstName,
        senderLastName:$senderLastName, 
        senderProfilePicture:$senderProfilePicture
      }) {
      returning {
        Notify_Id
        sender
        receiver
        description
        isViwed
        senderFirstName
        senderLastName
        senderProfilePicture
      }
    }
  } 
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function addApprovalByManager(id, data, remark, senderFirstName, senderLastName, senderProfilePicture){
            
            console.log(data.Employee_Request[0]);

                        const variables={
                            id:id, 
                            item_no:data.Employee_Request[0].item_no, 
                            item_name:data.Employee_Request[0].item_name, 
                            quantity_requested:data.Employee_Request[0].quantity_requested, 
                            manager_username:data.Employee_Request[0].manager_username, 
                            employee_username:data.Employee_Request[0].employee_username, 
                            confirmation_number:data.Employee_Request[0].confirmation_number, 
                            storehead_username: await currentStoreHead(),
                            isApprovedByManager:true,
                            isApprovedByStoreHead:data.Employee_Request[0].isApprovedByStoreHead,
                            isRejectedByManager:data.Employee_Request[0].isRejectedByManager,
                            isRejectedByStoreHead:data.Employee_Request[0].isRejectedByStoreHead,
                            sender:data.Employee_Request[0].manager_username,
                            receiver:data.Employee_Request[0].employee_username, 
                            description: remark ? remark : "Accepted.",
                            senderFirstName, 
                            senderLastName, 
                            senderProfilePicture
                            }

                        console.log(variables);

                        try{
                            const data = await client.request(document,variables,requestHeaders);
                            return data
                        }catch(error){
                            console.log("Error while inserting request to the managerApprovedEmpRequest DB");
                            throw  error
                        }
        
   
  }

  module.exports={addApprovalByManager}
