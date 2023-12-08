const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
  headers: {
  },
})

const document=gql`
    query MyQuery ($username:String!) {
      User(where: {user_name: {_eq: $username}}) {
        user_name
        first_name
        last_name
        Role {
          role_name
        }
      }
    }
`



const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}

 async function userByusername(manager_username) {

    const variables={username:manager_username}

      try{
        const data = await client.request(document, variables, requestHeaders); 
        console.log("looking for the manager");

        if(data.User.length != 0 && data.User[0].Role.role_name === "manager"){
          console.log("true");
          return true
        }
        else{
          console.log("false");
          return false;
        }

      }catch(error){
        console.log("error while finding manager by user name:")
        throw error;
      }
    
};

module.exports={userByusername}