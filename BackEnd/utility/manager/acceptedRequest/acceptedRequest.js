const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  const doc=gql`
  query MyQuery($manager_username: String!) @cached {
    Employee_Request(where: {_and: {manager_username: {_eq: $manager_username}, isApprovedByManager: {_eq: true}}}) {
      User {
        first_name
        last_name
        email
        department
        phone_number
        profile_picture
        role_id
        user_name
        created_at
        manager_username
        updated_at
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
        created_at
        updated_at
        request {
          updated_at
        }
      }
      id
      item_no
      item_name
      quantity_requested
      confirmation_number
      employee_username
      is_approved
      manager_username
      created_at
      updated_at
    }
  }
  
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function acceptedRequest(manager_username){

    const variables={
        manager_username,
    }

    try{
        const data=await client.request(doc,variables,requestHeaders);
        console.log(data.ManagerAppEmpRequest)
        return data

    }
    catch(error){
        throw error
    }


  }

  module.exports={acceptedRequest}