const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


const document=gql`
query MyQuery ($item_name:String!) @cached {
    Item(where: {item_name: {_eq: $item_name}}) {
      item_name
      item_number
      status
      description
      item_photo
      total_quantity_avilable
    }
  } 
`


const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}


async function test(){

    const variables={
        item_name:"table",
    };

    try{
        const data = await client.request(document,variables,requestHeaders);
        console.log(data.Item);
        return data;
    }catch(error){
        console.log("error while connecting to the hasura cloud");
        console.log(error);
    }
}

module.exports={test}

