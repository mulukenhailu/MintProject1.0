const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
        mutation MyMutation($item_number:Int)  {
            update_Item(where: {item_number: {_eq: $item_number}},
             _set: {productstatus: "unavailable"}) {
            returning {
                productname
                item_number
                productphoto
            }
            }
        }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function updateStatus(item_number){

    const variables={
        item_number
    }

    try{
        const data= await client.request(doc, variables, requestHeaders);
        return data.update_Item.returning[0]
    }catch(error){
        throw error
    }

  }

  module.exports={updateStatus}
