const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery @cached {
    storeHeadApprovedEmpRequest(where: {_and: 
      {isApprovedByManager: {_eq: true}, 
      isApprovedByStoreHead: {_eq: true}, 
      isRejectedByManager: {_eq: false}, 
      isRejectedByStoreHead: {_eq: false}}}) {
      id
      is_approved
      item_name
      item_no
      manager_username
      quantity_requested
      storehead_username
      confirmation_number
      employee_username
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
      created_at
      item {
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
        productPrice
        updated_at
      }
      User {
        user_name
        first_name
        last_name
        email
        department
        phone_number
        manager_username
        role_id
        profile_picture
        created_at
        updated_at
      }
    }
  }
  
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function acceptedRequest(){
    try{
        const data=await client.request(doc, {}, requestHeaders)
        console.log(data.storeHeadApprovedEmpRequest)
        return data.storeHeadApprovedEmpRequest
    }
    catch(error){
        throw error
    }
  }

  module.exports={acceptedRequest}