const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


const document=gql`
query MyQuery($managerName:String!) @cached {
    Employee_Request(where: {manager_username: {_eq: $managerName}}) {
      User {
        first_name
        last_name
        email
        department
        phone_number
        profile_picture
        role_id
        user_name
      }
      id
      item_no
      item_name
      quantity_requested
    }
  }
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


async function requestToApprove(req, res){

    if (req.body.decoded.role != "manager" ){
        return res.sendStatus(401);
    }

    const variables={
        managerName:req.body.decoded.user_name,
    };

    try{

        const data = await client.request(document,variables,requestHeaders);
        console.log(data.Employee_Request);
        res.send(data.Employee_Request);

    }catch(err){
        console.log("Error while fetching request for the manager");
        console.log(err.response.errors[0].message);
        return err
    }
}

module.exports={requestToApprove}