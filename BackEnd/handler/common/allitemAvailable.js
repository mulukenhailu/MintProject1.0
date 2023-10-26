const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`;

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const document=gql`
    query MyQuery @cached {
        Item {
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

    async function getAllItems(req, res){
        try{
            const data = await client.request(document,{},requestHeaders);
            res.send(data.Item);
        }catch(error){
            console.log("error getting all items available");
            res.sendStatus(500);
            console.log(error);
        }
    }

module.exports={getAllItems}