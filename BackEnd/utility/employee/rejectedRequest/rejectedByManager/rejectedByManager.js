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
      employee_username
      created_at
      updated_at
      User {
        first_name
        last_name
        email
        department
        updated_at
        user_name
        profile_picture
        phone_number
        manager_username
        role_id
        created_at
      }
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
      }
     
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