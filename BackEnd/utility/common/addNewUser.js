const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const NewUser=gql`
    mutation MyMutation($user_name:String!, $password:String!, $first_name:String!, $last_name:String!, $role_id:Int!){
        insert_User_one(object: {user_name: $user_name, Password: $password, first_name: $first_name, last_name: $last_name, role_id: $role_id}) {
        user_name
        Password
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

async function addNewUser(...userInfo){

    console.log({"New user to be Registerd":userInfo});

    [user_name, password, first_name, last_name, role_id]=userInfo;

    const variables={user_name, password, first_name, last_name, role_id};

    console.log(variables);

    try{
        const data = await client.request(NewUser, variables, requestHeaders);
        return data;
    }catch(error){
        throw error
    }

    
}

module.exports={addNewUser}