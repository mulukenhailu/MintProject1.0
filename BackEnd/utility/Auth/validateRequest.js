const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


const requestHeaders = {
    'x-hasura-admin-secret' : `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

async function validateRequest(request_type, item_number, employee_user_name){

    console.log(request_type, item_number, employee_user_name);

        const document=gql`
            query MyQuery ($item_number:Int!, $employee_user_name:String!){
                ${request_type}(where: {_and: {Item: {item_number: {_eq: $item_number}}, employee_username: {_eq: $employee_user_name}}}) {
                item_no
                item_name
                quantity_requested
                manager_username
                employee_username
                }
            }
        `

        const variables={
            item_number,
            employee_user_name
        }

        try{
            const data= await client.request(document, variables, requestHeaders);
            console.log("from the request validation ==> ", data);
            return true
            // if(data.Employee_Request.length === 0){
            //     return true;
            // }else{
            //     return false;
            // }
        }catch(error){
            console.log("Error while validating the Employee Request");
            throw error;
        }
  }

  async function validateApproval(requestId){

    console.log(">>>>>>>>>", requestId)

    const doc= gql`
    query MyQuery($request_id: uuid!) @cached {
        Employee_Request(where: {id: {_eq: $request_id}}) {
          item_no
          item_name
          quantity_requested
          manager_username
          employee_username
          confirmation_number
          isApprovedByManager
          isApprovedByStoreHead
          isRejectedByManager
          isRejectedByStoreHead
          is_approved
        }
      }      
  `
   
    const variables={
        request_id:requestId
    }

    try{
        const data= await client.request(doc, variables, requestHeaders);
        return data
    }catch(error){
        console.log("Error while validating the manager And StoreHead Approval for the Employee Request");
        throw error
    }
  }


  async function validateApprovalofStorehead(requestId){

                const doc=gql`
                query MyQuery($request_id: uuid) {
                    ManagerAndEmpRequest(where: {id: {_eq: $request_id}}) {
                      id
                      item_no
                      item_name
                      manager_username
                      employee_username
                      storehead_username
                      quantity_requested
                      is_approved
                      confirmation_number
                      isApprovedByManager
                      isApprovedByStoreHead
                      isRejectedByManager
                      isRejectedByStoreHead
                    }
                    
                  }
                  
                `
                const variables={
                    request_id:requestId
                }

                try{
                    const data=await client.request(doc, variables, requestHeaders);
                    return data
                }catch(error){
                    console.log("Error while validating Storehead Approval for the Employee Request");
                    throw error
                }
  }


  module.exports={validateRequest, validateApproval, validateApprovalofStorehead}