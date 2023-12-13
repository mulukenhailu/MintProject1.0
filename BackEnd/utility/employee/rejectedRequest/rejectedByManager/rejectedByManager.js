const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery @cached {
    Employee_Request(where: {
        isApprovedByManager: {_eq: false}, 
        isApprovedByStoreHead: {_eq: false}, 
        isRejectedByManager: {_eq: true}, 
        isRejectedByStoreHead: {_eq: false}}) {
      id
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByStoreHead
      isRejectedByManager
      quantity_requested
      item_no
      item_name
      manager_username
      confirmation_number
      created_at
      employee_username
    }
  }
  
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function EmployeeManagerRejectedRequest(){

                try{
                     const data=await client.request(doc, {}, requestHeaders)
                     console.log(data.Employee_Request)
                     return data 
                }catch(error){
                    console.log("Error from Employee Manager Rejected Request")
                    throw error
                }

  }

  module.exports={EmployeeManagerRejectedRequest}