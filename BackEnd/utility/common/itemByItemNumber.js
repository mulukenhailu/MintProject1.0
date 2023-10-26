const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


// const document=gql`
//     query MyQuery($item_number:Int!) {
//         MinT_Item(where: {item_number: {_eq: $item_number}}) {
//         item_name
//         status
//         total_quantity_avilable
//         item_photo
//         item_number
//         description
//         }
//     }
// `

const document = gql`
    query MyQuery ($item_number:Int!) @cached {
        Item(where: {item_number: {_eq: $item_number}}) {
        item_number
        item_name
        item_photo
        status
        total_quantity_avilable
        description
        }
    }
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

 async function itemByItemNumber(item_number, quantity_requested) {

    console.log(typeof item_number);
    console.log(typeof `${item_number}`);

    // const variables={item_number:`${item_number}`};

    const variables={item_number:item_number};

    try{
        const data = await client.request(document, variables, requestHeaders);
        console.log(data.Item)

        if(data.Item[0].status === "available" && data.Item[0].total_quantity_avilable >= Number(quantity_requested)){
            console.log("True");
            return true
        }else{
            console.log("false");
            return false;
        }
       
    }catch(error){
        console.log("Error while looking item in the DB:");
        return error;
    }
    
};

module.exports={itemByItemNumber}



