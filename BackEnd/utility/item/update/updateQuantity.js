const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const updateStatus=require("./updateStatus")


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
        mutation MyMutation(
            $item_number:Int!, 
            $quantityRequested:Int!) 
            {
            update_Item(where: {
                item_number: {_eq: $item_number}},
            _inc: {
                total_quantity_avilable: $quantityRequested}) 
                {
            returning {
                total_quantity_avilable
            }
            }
        }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function updateQuantity(item_number, requestedQuantity){

    const variables={
        item_number,
        quantityRequested: -(requestedQuantity)
    }

    try{
        const data= await client.request(doc, variables, requestHeaders);
        console.log("from updating qunatity of item ==>", data);

        if(data.update_Item.returning[0].total_quantity_avilable === 0){
            //make the status unavailable
            updateStatus.updateStatus(item_number)
                .then((data)=>{
                    console.log("from updating qunatity of item ==>", data);
                })
                .catch((error)=>{
                    console.log("error from updating status ==>", error);
                    throw err
                })

        }
        return data.update_Item.returning[0].total_quantity_avilable
    }catch(error){
        throw error
    }

  }

  module.exports={updateQuantity}
