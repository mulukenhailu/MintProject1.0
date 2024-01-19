const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery @cached {
    Employee_Request(where: {isApprovedByManager: {_eq: true}, isApprovedByStoreHead: {_eq: false}, isRejectedByManager: {_eq: false}, isRejectedByStoreHead: {_eq: true}}) {
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
      Item {
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
        productPrice
        request {
          updated_at
        }
      }
    }
  }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function EmployeeStoreHeadRejectedRequest(){

                try{
                     const data=await client.request(doc, {}, requestHeaders)
                     console.log(data.Employee_Request)
                     return data 
                }catch(error){
                    console.log("Error from Employee StoreHead Rejected Request")
                    throw error
                }

  }

  module.exports={EmployeeStoreHeadRejectedRequest}