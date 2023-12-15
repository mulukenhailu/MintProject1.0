const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}

const doc=gql`
query MyQuery($user_name: String!) @cached {
  User(where: {user_name: {_eq: $user_name}}) {
    first_name
    last_name
    user_name
    email
    phone_number
    department
    profile_picture
    manager_username
    updated_at
    created_at
    Role {
      role_name
    }
  }
}  `

async function getUserInfo(user_name){

                const variables={
                    user_name:user_name
                }

                try{
                    const data= await client.request(doc, variables, requestHeaders);
                    console.log("From User Info", data);
                    return data
                }catch(error){
                    console.log("Error inside get User Info");
                    throw error
                }

}

module.exports={getUserInfo}