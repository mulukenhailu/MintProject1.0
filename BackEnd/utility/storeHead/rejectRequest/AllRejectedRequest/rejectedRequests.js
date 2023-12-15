const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery {
    ManagerAppEmpRequest(where: {isApprovedByManager: {_eq: true}, isApprovedByStoreHead: {_eq: true}, isRejectedByManager: {_eq: false}, isRejectedByStoreHead: {_eq: false}}) {
      employee_username
      id
      is_approved
      item_name
      item_no
      manager_username
      quantity_requested
      storehead_username
      employeeRequest {
        created_at
        employee_username
        quantity_requested
        Item {
          created_at
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
          updated_at
        }
      }
    }
  }
  
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function allStoreHeadRejectedEmployeeReq(){

    try{
        const data= await client.request(doc, {}, requestHeaders)
        return data
    }catch(error){
        console.log("Error from StoreHead Rejecting Employee Request")
        throw error
    }

  }

  module.exports={allStoreHeadRejectedEmployeeReq}