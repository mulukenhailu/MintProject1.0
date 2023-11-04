const { VariablesAreInputTypesRule } = require('graphql');
const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}

async function currentStoreHead(){
    const  doc=gql`
            query MyQuery ($role_id:Int!)@cached {
                User(where: {role_id: {_eq: $role_id}}) {
                first_name
                last_name
                role_id
                user_name
                }
            }
        `   

       const variables ={
        role_id:3
       }

       try{

        const data= await client.request(doc, variables, requestHeaders);
        return data.User[0].user_name

       }catch(error){

          console.log("Error while fetching current storehead");
          throw error

       }
}

module.exports={currentStoreHead}

