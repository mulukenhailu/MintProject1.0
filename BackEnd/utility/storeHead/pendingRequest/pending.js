const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery @cached {
    ManagerAppEmpRequest(where: {_and: {isApprovedByManager: {_eq: true}, isApprovedByStoreHead: {_eq: false}, isRejectedByManager: {_eq: false}, isRejectedByStoreHead: {_eq: false}}}) {
      employeeRequest {
        isApprovedByManager
        isApprovedByStoreHead
        isRejectedByManager
        isRejectedByStoreHead
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
        }
      }
      id
      item_no
      item_name
      quantity_requested
      manager_username
      employee_username
      storehead_username
      confirmation_number
      is_approved
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
    }
  }
  
  
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function requestToApproveStoreHead(){

    try{
        const data= await client.request(doc, {}, requestHeaders)
        return data
    }catch(error){
        console.log("Error while fetching request for the storehead");
        throw error
    }
  }

  module.exports={requestToApproveStoreHead}
