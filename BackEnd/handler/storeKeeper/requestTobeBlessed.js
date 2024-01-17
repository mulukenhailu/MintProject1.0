//check the role of  currently logged in user 
// if the role is storeKeeper continue 
// fetching  all request in storeHead approved employee request database.
//else return and exit out.

const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  const doc=gql`
  query MyQuery {
    storeHeadApprovedEmpRequest(where: {
      isApprovedByManager: {_eq: true}, 
      isApprovedByStoreHead: {_eq: true}, 
      isRejectedByManager: {_eq: false}, 
      isRejectedByStoreHead: {_eq: false}, 
      is_approved: {_eq: false}}) {
      id
      item_no
      item_name
      quantity_requested
      manager_username
      employee_username
      storehead_username
      is_approved
      confirmation_number
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
      created_at
      updated_at
      item {
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
      }
      User {
        user_name
        first_name
        last_name
        email
        department
        manager_username
        phone_number
        profile_picture
        created_at
        updated_at
      }
    }
  }
  
  `

  async function requestTobeBlessed(req, res){

    if (req.body.decoded.role != "storekeeper"){
        return res.sendStatus(401);
    }

    try{
        const data= await client.request(doc, {}, requestHeaders);
        res.send(data)
    }catch(error){
        console.log("Error while Fetching Request for the storeKeeper.");
        res.status(501).send({error:"Retry Again."})
    }

  }

  module.exports={requestTobeBlessed}


