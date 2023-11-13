const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`;

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const document=gql`
    query MyQuery @cached {
        Item (where: {status: {_eq: "available"}}) {
            item_name
            item_number
            status
            total_quantity_avilable
            item_photo
            description
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