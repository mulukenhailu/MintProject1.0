const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery @cached {
    History {
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
        productPrice
      }
    }
  }  
  `
  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function allTransactions(){

        try{
            const data=await client.request(doc, {}, requestHeaders)
            return data
        }catch(error){
            console.log("Error while Fetching From History DataBase.")
            throw error
        }
  }

  module.exports={allTransactions}