const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  mutation MyMutation($request_id: uuid!, $item_no:Int!, $quantity_requested:Int!) {
    update_Employee_Request(where: {id: {_eq: $request_id}, _and: {isApprovedByManager: {_eq: true}, isApprovedByStoreHead: {_eq: false}, isRejectedByManager: {_eq: false}, isRejectedByStoreHead: {_eq: false}}}, _set: {isRejectedByStoreHead: true}) {
      returning {
        item_name
        item_no
        manager_username
        quantity_requested
        created_at
        employee_username
        id
        isApprovedByManager
        isApprovedByStoreHead
        isRejectedByManager
        isRejectedByStoreHead
        is_approved
        confirmation_number
        Item {
          item_number
          productdescription
          productmodel
          created_at
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
    update_ManagerAppEmpRequest(where: {id: {_eq: $request_id}, _and: {isApprovedByManager: {_eq: true}, isApprovedByStoreHead: {_eq: false}, isRejectedByManager: {_eq: false}, isRejectedByStoreHead: {_eq: false}}}, _set: {isRejectedByStoreHead: true}) {
      returning {
        manager_username
        quantity_requested
        item_no
        item_name
        employee_username
        id
        isApprovedByManager
        isApprovedByStoreHead
        isRejectedByManager
        isRejectedByStoreHead
        is_approved
        storehead_username
        employeeRequest {
          confirmation_number
          created_at
          id
          employee_username
          isApprovedByManager
          isApprovedByStoreHead
          isRejectedByManager
          isRejectedByStoreHead
          is_approved
          item_name
          item_no
          manager_username
          quantity_requested
          Item {
            created_at
            item_number
            productdescription
            productstatus
            productstandardtype
            productsource
            productquantitynumber
            productphoto
            productname
            productmodelnumber
            productmodel
          }
        }
      }
    }
    update_Item(where: {item_number: {_eq: $item_no}}, _inc: {productquantitynumber: $quantity_requested}) {
        returning {
          productquantitynumber
        }
      }
  }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

//   const validateRejection=require("../../Auth/validateRequest")


  async function rejectRequestByStoreHead(request_id, item_no, quantity_requested){


    const variables={
        request_id,
        item_no, 
        quantity_requested
    };

    try{
        const data= await client.request(doc, variables, requestHeaders)
        return data
    }catch(error){
        console.log("Error from StoreHead Rejecting Employee Request")
        throw error
    }
  }

  module.exports={rejectRequestByStoreHead}