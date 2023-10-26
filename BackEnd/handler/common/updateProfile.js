const  { request, gql }=require('graphql-request');

const mutation = gql`
  mutation updateProfile($user_name:String!, $first_name: String!, $last_name: String!,$email: String!, 
                         $phone_number: Int!, $department:String!) {
    update_MinT_User_by_pk(pk_columns: {user_name: $user_name}, _set: {first_name:$first_name, 
                         last_name:$last_name, 
      email:$email, phone_number:$phone_number, department:$department}) {
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

async function updateProfile(req, res) {
  
  let {user_name, first_name, last_name, email, phone_number, department}=req.body

  const variables = {
    user_name,
    first_name,
    last_name,
    email,
    phone_number,
    department
   }

   //query the DB for the requested item, check its existance

   

   try{
    const data = await request("http://localhost:8080/v1/graphql", mutation, variables);
    res.send(data);
   }catch(err){
      console.log("error updating employee profile")
      res.sendStatus(500)
   }
    
  }

   module.exports={updateProfile}