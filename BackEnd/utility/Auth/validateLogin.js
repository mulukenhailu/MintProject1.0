const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

// const loginInfo=gql`
// query MyQuery ($user_name:String!){
//     MinT_User(where: {user_name: {_eq: $user_name}}) {
//         user_name
//         Password
//         Role {
//           role_name
//         }
//     }
//   }
// `

const loginInfo=gql`
query MyQuery($user_name:String!) @cached {
    User(where: {user_name: {_eq: $user_name}}) {
      first_name
      last_name
      user_name
      department
      email
      phone_number
      Password
      Role {
        role_name
      }
    }
  }
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

async function validateLogin(user_name){

    try{
        const variables={user_name};
        const data = await client.request(loginInfo,variables,requestHeaders);
        console.log(data.User)
        return data;
    }catch(error){
        console.log({"Error cheking user_name in the DB":error.response.errors[0].message});
        return ({"response":"Uknown user Name"});
    }

}

module.exports={validateLogin}