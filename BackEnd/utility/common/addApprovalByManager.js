const  { gql, GraphQLClient  }=require('graphql-request');
const { userAggregate } = require('./userAggregate');
const { currentStoreHead } = require('./currentStoreHead');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const document=gql`
  mutation MyMutation (
    $id:uuid!, 
    $item_no:Int!, 
    $item_name:String!, 
    $quantity_requested:Int!, 
    $manager_username:String!, 
    $employee_username:String!, 
    $confirmation_number:Int!, 
    $storehead_username:String!){
    insert_ManagerAppEmpRequest_one(object: {
        id: $id, 
        item_no: $item_no, 
        item_name: $item_name, 
        quantity_requested:$quantity_requested, 
        manager_username: $manager_username, 
        employee_username: $employee_username, 
        confirmation_number: $confirmation_number, 
        storehead_username: $storehead_username}) {
      id
      item_no
      item_name
      quantity_requested
      manager_username
      employee_username
      storehead_username
      confirmation_number
      is_approved 
    }
  }
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function addApprovalByManager(id, data){
            
            console.log(data.Employee_Request[0]);

                        const variables={
                            id:id, 
                            item_no:data.Employee_Request[0].item_no, 
                            item_name:data.Employee_Request[0].item_name, 
                            quantity_requested:data.Employee_Request[0].quantity_requested, 
                            manager_username:data.Employee_Request[0].manager_username, 
                            employee_username:data.Employee_Request[0].employee_username, 
                            confirmation_number:data.Employee_Request[0].confirmation_number, 
                            storehead_username: await currentStoreHead()
                            }

                        console.log(variables);

                        try{
                            const data = await client.request(document,variables,requestHeaders);
                            return data
                        }catch(error){
                            console.log("Error while inserting request to the storeHead DB");
                            throw  error
                        }
        
   
  }

  module.exports={addApprovalByManager}
