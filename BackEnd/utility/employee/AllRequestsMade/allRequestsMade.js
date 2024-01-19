const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery ($user_name:String){
    Employee_Request(where: {employee_username: {_eq: $user_name}}) {
      id
      item_no
      item_name
      quantity_requested
      employee_username
      manager_username
      is_approved
      isRejectedByStoreHead
      isRejectedByManager
      isApprovedByStoreHead
      isApprovedByManager
      confirmation_number
      created_at
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
        created_at
        updated_at
      }
    }
  }  
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function allRequestsMade(user_name){

    const variables={
        user_name
    };

    try{
        const data=client.request(doc, variables, requestHeaders)
        return data
    }catch(error){
        console.log("Error while fetching all request for the Employee")
        throw error
    }

  }

  module.exports={allRequestsMade}