const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
  headers: {
  },
})

const doc = gql`
  mutation updateProfile(
    $user_name:String!, 
    $first_name: String!, 
    $last_name: String!,
    $email: String!, 
    $phone_number: Int!, 
    $department:String!,
    $password:String!
    ){
    update_User_by_pk(pk_columns: {user_name: $user_name}, _set: 
       {
        first_name:$first_name, 
        last_name:$last_name, 
        email:$email, 
        phone_number:$phone_number, 
        department:$department,
        Password:$Password
      }) {
        first_name
        last_name
        profile_picture
        email
        department
        Role {
          role_name
        }
      }
  }
`

const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}

async function adminupdateProfile(req, res) {

  
        let {first_name, last_name, email, phone_number, department, Password}=req.body

        console.log(req.body.Password);
        console.log(typeof req.body.Password);

        const variables = {
          user_name:req.body.decoded.user_name,
          first_name,
          last_name,
          email,
          phone_number,
          department, 
          Password
        }

        try{
          const data = await client.request(doc, variables, requestHeaders);
          res.send(data);
        }catch(error){
            console.log("error updating employee profile")
            console.log(error.response.errors[0].message);
            if(error.response.errors[0].message.includes("Uniqueness violation")){
              res.send({"message":"Another Account already exist with the given Credientail."});
          }
        }
    
  }

   module.exports={adminupdateProfile}