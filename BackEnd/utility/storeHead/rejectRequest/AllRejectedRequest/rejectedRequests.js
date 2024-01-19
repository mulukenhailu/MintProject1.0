const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  // const doc=gql`
  // query MyQuery {
  //   ManagerAppEmpRequest(where: 
  //     {isApprovedByManager: {_eq: true}, 
  //     isApprovedByStoreHead: {_eq: false}, 
  //     isRejectedByManager: {_eq: false}, 
  //     isRejectedByStoreHead: {_eq: true}}) {
  //     employee_username
  //     id
  //     is_approved
  //     item_name
  //     item_no
  //     manager_username
  //     quantity_requested
  //     storehead_username
  //     employeeRequest {
  //       created_at
  //       employee_username
  //       quantity_requested
  //       Item {
  //         created_at
  //         item_number
  //         productdescription
  //         productmodel
  //         productmodelnumber
  //         productname
  //         productphoto
  //         productquantitynumber
  //         productsource
  //         productstandardtype
  //         productstatus
  //         updated_at
  //         request {
  //           User {
  //             created_at
  //             department
  //             email
  //             first_name
  //             last_name
  //             manager_username
  //             phone_number
  //             profile_picture
  //             user_name
  //             updated_at
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // `

  const doc=gql`
  query MyQuery {
    ManagerAndEmpRequest(where: {_and: {isApprovedByManager: {_eq: true}, isApprovedByStoreHead: {_eq: false}, isRejectedByManager: {_eq: false}, isRejectedByStoreHead: {_eq: true}}}) {
      id
      item_no
      item_name
      quantity_requested
      manager_username
      employee_username
      storehead_username
      confirmation_number
      isApprovedByManager
      isApprovedByStoreHead
      isRejectedByManager
      isRejectedByStoreHead
      is_approved
      created_at
      updated_at
      Item {
        item_number
        productdescription
        productmodel
        productname
        productphoto
        productquantitynumber
        productsource
        productstandardtype
        productstatus
        productmodelnumber
        productPrice
        created_at
        updated_at
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