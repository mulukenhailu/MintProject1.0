const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const NewUser=gql`
    mutation MyMutation(
        $user_name:String!, 
        $password:String!, 
        $first_name:String!, 
        $last_name:String!, 
        $role_id:Int!, 
        $manager_username:String!
        $department:String!
        ){
        insert_User_one(object: {
            user_name: $user_name, 
            Password: $password, 
            first_name: $first_name, 
            last_name: $last_name, 
            role_id: $role_id, 
            manager_username: $manager_username
            department:$department

        }) {
            user_name
            first_name
            last_name
            Role {
              role_name
            }
            manager_username
            phone_number
            profile_picture
            email
            department
            created_at
            updated_at
        }
    }
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

async function addNewUser(...userInfo){

    console.log({"New user to be Registerd":userInfo});

    [user_name, password, first_name, last_name, role_id, manager_username, department]=userInfo;

    const variables={user_name, password, first_name, last_name, role_id, manager_username, department};

    console.log(variables);

    try{
        const data = await client.request(NewUser, variables, requestHeaders);
        return data;
    }catch(error){
        throw error
    }

    
}

module.exports={addNewUser}