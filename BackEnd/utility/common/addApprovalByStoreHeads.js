const  { gql, GraphQLClient  }=require('graphql-request');
const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  const doc=gql`
  mutation MyMutation(
    $id: uuid!, 
    $item_no: Int!, 
    $item_name: String!, 
    $manager_username: String!, 
    $employee_username: String!, 
    $storehead_username: String!, 
    $quantity_requested: Int!, 
    $confirmation_number: Int!, 
    $is_approved: Boolean!, 
    $isApprovedByManager: Boolean!, 
    $isApprovedByStoreHead: Boolean!, 
    $isRejectedByManager: Boolean!, 
    $isRejectedByStoreHead: Boolean!,
    $sender:String!, 
    $receiver:String!, 
    $description:String!,
    $senderFirstName:String!,
    $senderLastName:String!, 
    $senderProfilePicture:String!
    ) {
    insert_storeHeadApprovedEmpRequest_one(object: {
      id: $id, 
      item_no: $item_no, 
      item_name: $item_name, 
      manager_username: $manager_username, 
      employee_username: $employee_username, 
      storehead_username: $storehead_username, 
      quantity_requested: $quantity_requested, 
      confirmation_number: $confirmation_number, 
      is_approved: $is_approved, 
      isApprovedByManager: $isApprovedByManager, 
      isApprovedByStoreHead: $isApprovedByStoreHead, 
      isRejectedByManager: $isRejectedByManager, 
      isRejectedByStoreHead: $isRejectedByStoreHead
    }) {
      id
      item_no
      item_name
      manager_username
      employee_username
      storehead_username
      quantity_requested
      confirmation_number
      is_approved
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
    }
        update_ManagerAppEmpRequest(where: {
          id: {_eq: $id}, 
          isApprovedByStoreHead: {_eq: false}, 
          isApprovedByManager: {_eq: true}, 
          isRejectedByManager: {_eq: false}, 
          isRejectedByStoreHead: {_eq: false}}, 
          _set: {isApprovedByStoreHead: true}) 
          {
          affected_rows
        }

        update_ManagerAndEmpRequest(where: {
          id: {_eq: $id},  
          isApprovedByManager: {_eq: true},
          isApprovedByStoreHead: {_eq: false}, 
          isRejectedByManager: {_eq: false}, 
          isRejectedByStoreHead: {_eq: false}},
           _set: {isApprovedByStoreHead: true}) 
           {
          affected_rows
        }

        update_Employee_Request(where: {id: {_eq: $id}}, _set: {isApprovedByStoreHead: true}) {
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

  async function addApprovalByStoreHead(id, data, remark, senderFirstName, senderLastName, senderProfilePicture){

    console.log(id, data);

          const variables={
            id:id, 
            item_no:                data.ManagerAndEmpRequest[0].item_no, 
            item_name:              data.ManagerAndEmpRequest[0].item_name, 
            quantity_requested:     data.ManagerAndEmpRequest[0].quantity_requested, 
            manager_username:       data.ManagerAndEmpRequest[0].manager_username, 
            employee_username:      data.ManagerAndEmpRequest[0].employee_username, 
            confirmation_number:    data.ManagerAndEmpRequest[0].confirmation_number, 
            storehead_username:     data.ManagerAndEmpRequest[0].storehead_username, 
            is_approved:            data.ManagerAndEmpRequest[0].is_approved,
            isApprovedByManager:    data.ManagerAndEmpRequest[0].isApprovedByManager,
            isApprovedByStoreHead:  true,
            isRejectedByManager:    data.ManagerAndEmpRequest[0].isRejectedByManager,
            isRejectedByStoreHead:  data.ManagerAndEmpRequest[0].isRejectedByStoreHead,
            sender:                 data.ManagerAndEmpRequest[0].storehead_username, 
            receiver:               data.ManagerAndEmpRequest[0].employee_username,  
            description:            remark ? remark : "Accepted.",
            senderFirstName,
            senderLastName, 
            senderProfilePicture
            }

            console.log(variables);

            try{
              const data= await client.request(doc, variables, requestHeaders);
              return data

            }catch(error){
              console.log("Error while processing approval by the storeHead");
              throw error

            }
  }

  module.exports={addApprovalByStoreHead}