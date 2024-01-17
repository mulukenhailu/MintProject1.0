const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery ($manager_username:String!){
    ManagerAndEmpRequest(where: {manager_username: {_eq: $manager_username}}) {
      id
      item_no
      item_name
      quantity_requested
      manager_username
      employee_username
      storehead_username
      confirmation_number
      is_approved
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
      created_at
      updated_at
      Item {
        item_number
        productmodel
        productmodelnumber
        productname
        productdescription
        productphoto
        productquantitynumber
        productsource
        productstandardtype
        productstatus
        created_at
        updated_at
      }
    }
  }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function pastRequest(manager_username){

    const variables={
        manager_username
    }

    try{
        const data= await client.request(doc, variables, requestHeaders)
        return data
    }catch(error){
        console.log("Error while fetching  Past Request for the manager.")
        throw error
    }

  }

  module.exports={pastRequest}