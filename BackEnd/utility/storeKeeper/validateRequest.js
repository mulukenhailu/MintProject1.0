const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery($request_id: uuid) {
    storeHeadApprovedEmpRequest(where: {id: {_eq: $request_id}, is_approved: {_eq: false}}) {
      id
      manager_username
      employee_username
      storehead_username
      item_no
      item_name
      quantity_requested
      confirmation_number
      created_at
      updated_at
      item {
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

  async function validateRequestForStoreKeeper(request_id){

    const variables={
        request_id
    }

    try{

        const data=await client.request(doc, variables, requestHeaders)
        return data

    }catch(error){
        throw error
    }

  }

  module.exports={validateRequestForStoreKeeper}