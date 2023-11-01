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
            console.log(data);

            if(data.Employee_Request.length === 0){
                return true;
            }else{
                return false;
            }

        }catch(error){
            console.log("Error while validating the Employee Request");
            return error;
        }

  }

  

  async function validateApproval(requestId){

    const doc= gql`
    query MyQuery ($request_id:uuid!){
        Employee_Request(where: {id: {_eq: $request_id}}) {
        item_no
        item_name
        quantity_requested
        manager_username
        employee_username
        confirmation_number
        }
    }
  `
   
    const variables={
        request_id:requestId
    }

    try{
        const data= await client.request(doc, variables, requestHeaders);
        console.log(data);
        return data

    }catch(error){
        console.log("Error while validating the Employee Request");
        throw error;
    }
  }


  module.exports={validateRequest, validateApproval}