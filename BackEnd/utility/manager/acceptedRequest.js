const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  const doc=gql`
  query MyQuery($manager_username: String!) @cached {
    ManagerAppEmpRequest(where: {manager_username: {_eq: $manager_username}}) {
      id
      is_approved
      item_name
      item_no
      manager_username
      quantity_requested
      storehead_username
      confirmation_number
      employeeRequest {
      User {
        first_name
        last_name
        email
        department
        phone_number
        profile_picture
        role_id
        user_name
      }
    }
  }
      User(where: {user_name: {_eq: $manager_username}}) {
        first_name
        last_name
        email
        department
        phone_number
        profile_picture
        role_id
        user_name
      }
    }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function acceptedRequest(manager_username){



    const variables={
        manager_username:manager_username
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