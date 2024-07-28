const  { gql, GraphQLClient  }=require('graphql-request');
const validator = require("validator")
const bcrypt = require("bcrypt");
const saltRounds = 10;

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
  headers: {
  },
})

const doc = gql`
  mutation updateProfile(
    $newPassword:String!, 
    $user_name:String!
    ){
    update_User_by_pk(pk_columns: {user_name: $user_name}, _set: 
       {Password:$newPassword
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

async function resetPassword(req, res) {

  
  let {newPassword}=req.body

  // if(newPassword != conNewPassword){
  //   res.send({"message":"Password do not Match"});
  // }

  if (!validator.isStrongPassword(newPassword)){
    res.status(400).send({error:"use Strong Password"});
}

  const hash = bcrypt.hashSync(newPassword, saltRounds);

  const variables = {
    user_name:req.body.decoded.user_name,
    newPassword:hash
   }

   try{
    const data = await client.request(doc,variables,requestHeaders);
    res.send(data);
   }catch(err){
      console.log("Error while Resetting Password");
      console.log(err);
      res.sendStatus(500)
   }
    
  }

   module.exports={resetPassword}