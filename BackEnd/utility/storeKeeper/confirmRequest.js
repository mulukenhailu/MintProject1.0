const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


const doc=gql`
mutation MyMutation(
  $id: uuid!, 
  $employee_username: String!, 
  $manager_username: String!, 
  $storehead_username: String!, 
  $storekeeper_username: String!, 
  $item_name: String!, 
  $item_no: Int!, 
  $quantity_requested: Int!, 
  $confirmation_number: Int!, 
  $is_approved: Boolean!) {
  insert_History(objects: {
    id: $id, 
    employee_username: $employee_username, 
    manager_username: $manager_username, 
    storehead_username: $storehead_username, 
    storekeeper_username: $storekeeper_username, 
    item_name: $item_name, 
    item_no: $item_no, 
    quantity_requested: $quantity_requested, 
    confirmation_number: $confirmation_number, 
    is_approved: $is_approved}) {
    returning {
      id
      employee_username
      manager_username
      storehead_username
      storekeeper_username
      item_name
      item_no
      quantity_requested
      confirmation_number
      is_approved
      created_at
      updated_at
    }
  }
  update_storeHeadApprovedEmpRequest(where: {id: {_eq: $id}}, _set: {is_approved: true}) {
    affected_rows
  }
}

`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


async function finalize(data, storekeeper_username){

    const variables={
        id: data.storeHeadApprovedEmpRequest[0].id, 
        employee_username: data.storeHeadApprovedEmpRequest[0].employee_username, 
        manager_username: data.storeHeadApprovedEmpRequest[0].manager_username, 
        storehead_username: data.storeHeadApprovedEmpRequest[0].storehead_username, 
        storekeeper_username: storekeeper_username, 
        item_name: data.storeHeadApprovedEmpRequest[0].item_name, 
        item_no: data.storeHeadApprovedEmpRequest[0].item_no, 
        quantity_requested: data.storeHeadApprovedEmpRequest[0].quantity_requested, 
        confirmation_number: data.storeHeadApprovedEmpRequest[0].confirmation_number, 
        is_approved: true
    }

    try{
        const data = await client.request(doc, variables, requestHeaders)
        return data
    }catch(error){
        console.log("Error from storeKeeper Finalizing Employee Request")
        throw error
    }

   
}

module.exports={finalize}

