const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
    query MyQuery @cached {
        ManagerAppEmpRequest {
        id
        item_no
        item_name
        quantity_requested
        manager_username
        employee_username
        storehead_username
        confirmation_number
        is_approved
        }
    }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function requestToApproveStoreHead(req, res){
    if (req.body.decoded.role != "storehead" ){
        return res.sendStatus(401);
    }

    try{
        const data= await client.request(doc, {}, requestHeaders)
        res.send(data)

    }catch(error){
        console.log("Error while fetching request for the storehead");
        throw error
    }
  }

  module.exports={requestToApproveStoreHead}
