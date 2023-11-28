const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`;

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const document=gql`
    query MyQuery @cached {
        Item (where: {productstatus: {_eq: "available"}}) {
            productname
            item_number
            productstatus
            productquantitynumber
            productphoto
            productdescription
        }
    }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

    async function getAllItemsUtility(){
        try{
            const data = await client.request(document,{},requestHeaders);
            console.log("From get all item", data);
            return data
        }catch(error){
            throw error
        }
    }

module.exports={getAllItemsUtility}