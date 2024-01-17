const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
  headers: {
  },
})

const doc = gql`
mutation updateProfile(
  $user_name: String!, 
  $first_name: String!, 
  $last_name: String!, 
  $email: String!, 
  $phone_number: bigint!, 
  $profile_picture: String!
  ) {
  update_User_by_pk(pk_columns: {user_name: $user_name}, 
    _set: {
      first_name: $first_name, 
      last_name: $last_name, 
      email: $email, 
      phone_number: $phone_number, 
      profile_picture: $profile_picture
    }) {
    first_name
    last_name
    profile_picture
    email
    department
    Role {
      role_name
    }
    manager_username
    phone_number
    user_name
    created_at
    updated_at
  }
  update_notification(where: {sender: {_eq: $user_name}}, _set: {senderFirstName: $first_name, senderLastName: $last_name, senderProfilePicture: $profile_picture}) {
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

async function updateProfile(req, res) {

  
        let {first_name, last_name, email, phone_number, profile_picture}=req.body

        console.log(req.body);

        const variables = {
          user_name:req.body.decoded.user_name,
          first_name,
          last_name,
          email,
          phone_number,
          profile_picture
        }

        try{
          const data = await client.request(doc, variables, requestHeaders);
          res.send(data);
        }catch(error){
          console.log("error updating employee profile")
          console.log(error);
          res.status(400).json({error:"Network error.Retry again!"});
          }
    }
    

   module.exports={updateProfile}