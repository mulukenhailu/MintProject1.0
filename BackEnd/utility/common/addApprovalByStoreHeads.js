const  { gql, GraphQLClient  }=require('graphql-request');
const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  const doc=gql`
    mutation MyMutation (
        $id:uuid!, 
        $item_no:Int!, 
        $item_name:String!, 
        $manager_username:String!,
        $employee_username:String!, 
        $storehead_username:String!, 
        $quantity_requested:Int!, 
        $confirmation_number:Int!
        $is_approved:Boolean!
        ){
        insert_storeHeadApprovedEmpRequest_one(object: {
            id: $id, 
            item_no: $item_no, 
            item_name: $item_name, 
            manager_username: $manager_username, 
            employee_username: $employee_username, 
            storehead_username: $storehead_username, 
            quantity_requested: $quantity_requested, 
            confirmation_number: $confirmation_number,
            is_approved:$is_approved
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
        }
    }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function addApprovalByStoreHead(id, data){

    console.log(id, data);

          const variables={
            id:id, 
            item_no:data.ManagerAppEmpRequest[0].item_no, 
            item_name:data.ManagerAppEmpRequest[0].item_name, 
            quantity_requested:data.ManagerAppEmpRequest[0].quantity_requested, 
            manager_username:data.ManagerAppEmpRequest[0].manager_username, 
            employee_username:data.ManagerAppEmpRequest[0].employee_username, 
            confirmation_number:data.ManagerAppEmpRequest[0].confirmation_number, 
            storehead_username: data.ManagerAppEmpRequest[0].storehead_username, 
            is_approved:true
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