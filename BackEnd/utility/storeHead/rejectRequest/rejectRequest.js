const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
            mutation MyMutation ($request_id:uuid!) {
                update_Employee_Request(where: {id: {_eq: $request_id}, _and: {isApprovedByManager: {_eq: true}}}, 
                    _set: {isRejectedByStoreHead: true}) {
                returning {
                    item_name
                    item_no
                    manager_username
                    quantity_requested
                }
                }
                update_ManagerAppEmpRequest(where: {id: {_eq: $request_id}, _and: {isApprovedByManager: {_eq: true}}},
                     _set: {isRejectedByStoreHead: true}) {
                returning {
                    manager_username
                    quantity_requested
                    item_no
                    item_name
                }
                }
            }

  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  const validateRejection=require("../../Auth/validateRequest")


  async function rejectRequestByStoreHead(request_id){

    validateRejection.validateApproval(request_id)
        .then((inital_data)=>{
            console.log("from StoreHead request Rejection path", inital_data)
            try{
                const data=client.request(doc, {}, requestHeaders)
                if (data.update_Employee_Request.returning){

                }
            }catch(error){
                throw error
            }

        })
        .catch((error)=>{

        })
  }

  module.exports={rejectRequestByStoreHead}