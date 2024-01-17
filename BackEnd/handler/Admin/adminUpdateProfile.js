const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const bcrypt = require("bcrypt");
const saltRounds = 10;

const client = new GraphQLClient(endpoint, {
  headers: {
  },
})

const doc = gql`
mutation updateProfile(
  $user_name: String!, 
  $first_name: String, 
  $last_name: String, 
  $email: String!, 
  $phone_number: bigint!, 
  $department: String!, 
  $Password: String!, 
  $manager_username: String!
  ) {
  update_User_by_pk(pk_columns: {user_name: $user_name}, 
    _set: {first_name: $first_name, 
      last_name: $last_name, 
      email: $email, 
      phone_number: $phone_number, 
      department: $department, 
      manager_username: $manager_username, 
      Password: $Password
    }) {
    first_name
    last_name
    profile_picture
    email
    department
    manager_username
    Role {
      role_name
    }
  }
  update_notification(where: {sender: {_eq: $user_name}}, 
    _set: {senderFirstName: $first_name, senderLastName: $last_name}) {
    returning {
      sender
      receiver
      senderFirstName
      senderLastName
      senderProfilePicture
      item_no
      quantity_requested
      description
      isViwed
      Notify_Id
      created_at
      updated_at
    }
  }
}

`

const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}

async function adminupdateProfile(req, res) {

  
        let {user_name, first_name, last_name, email, phone_number, department, Password,  manager_username}=req.body

        console.log(req.body);

        const hash = bcrypt.hashSync(Password, saltRounds);

        const variables = {
          user_name,
          first_name,
          last_name,
          email,
          phone_number,
          department, 
          manager_username,
          Password:hash
        }

        try{
          const data = await client.request(doc, variables, requestHeaders);
          res.send(data);
        }catch(error){
            console.log("error updating employee profile")
            console.log(error);
            res.status(400).json({error:"Another Account already exist with the given Credientail."});
        }
    
  }

   module.exports={adminupdateProfile}