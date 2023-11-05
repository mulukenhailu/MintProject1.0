const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}

async function userAggregate(id, user_name){

            if (arguments.length === 0){
              console.log("No parameter provided for the userAggregate function.")
              return 
            }

            if(arguments.length === 1){

                     const doc=gql`
                    query MyQuery ($role_id:Int!)@cached {
                      User(where: {role_id: {_eq: $role_id}}) {
                        first_name
                        last_name
                        role_id
                        user_name
                      }
                    }
                    `

                    const  variables={
                      role_id:id
                    }
                    try{
                      const data= await client.request(doc, variables, requestHeaders);
                      return data
                    }catch(error){
                      console.log("Error inside user Aggregate by role-id");
                      return error
                    }

            }

            else{

              const doc=gql`
              query MyQuery ($role_id:Int!, $user_name:String!)@cached {
                    User(where: {_and: {role_id: {_eq: $role_id}, user_name: {_eq: $user_name}}}) {
                      first_name
                      last_name
                      role_id
                      user_name
                    }
                  }              
              `

             const variables={
                role_id:id, 
                user_name:user_name
              }

              try{
                const data= await client.request(doc, variables, requestHeaders);
                return data
              }catch(error){
                console.log("Error inside user Aggregate");
                return error
              }

            }

}

module.exports={userAggregate}
