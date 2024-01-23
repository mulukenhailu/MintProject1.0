const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


const document=gql`
query MyQuery($managerName: String!) @cached {
              Employee_Request(where: {_and: {
              manager_username: {_eq: $managerName}, 
              isApprovedByManager: {_eq: false}, 
              isApprovedByStoreHead: {_eq: false}, 
              isRejectedByManager: {_eq: false}, 
              isRejectedByStoreHead: {_eq: false}}}) {
                User {
                  first_name
                  last_name
                  email
                  department
                  phone_number
                  profile_picture
                  role_id
                  user_name
                  created_at
                  manager_username
                  updated_at
                }
                id
                item_no
                item_name
                quantity_requested
                Item {
                  item_number
                  productdescription
                  productmodel
                  productmodelnumber
                  productname
                  productphoto
                  productquantitynumber
                  productsource
                  productstandardtype
                  productstatus
                  created_at
                }
                created_at
                employee_username
                is_approved
                manager_username
                confirmation_number
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
        res.send(data)
        
    }catch(err){
        console.log("Error while fetching request for the manager");
        console.log(err);
        res.status(500).send({error:"Retry Again."})
    }
}

module.exports={requestToApprove}