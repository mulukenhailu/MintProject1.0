const  { gql, GraphQLClient  }=require('graphql-request');
const updateQuantity=require("../../utility/item/update/updateQuantity")
const updateStatus=require("../item/update/updateStatus")

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const document = gql`
    query MyQuery ($item_number:Int!) @cached {
        Item(where: {item_number: {_eq: $item_number}}) {
        item_number
        productname
        productphoto
        productstatus
        productquantitynumber
        productdescription
        productPrice
        }
    }
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

 async function itemByItemNumber(item_number, quantity_requested) {

    console.log(typeof item_number);
    console.log(typeof `${item_number}`);

    if(quantity_requested === 0){
        return false;
    }

    const variables={item_number:item_number};

    try{
        const data = await client.request(document, variables, requestHeaders);
        console.log(data.Item)

        if(data.Item[0].productstatus === "available" && data.Item[0].productquantitynumber >= Number(quantity_requested)){
            // updateQuantity.updateQuantity(item_number, quantity_requested)
            //     .then((data)=>{
            //         console.log("from item by item number", data);
            //     })
            //     .catch((error)=>{
            //         console.log("error while updating total quantity of  item After requested has been made.", error)
            //         return  error
            //     })
            console.log("true");
            return true
        }else{
            console.log("...false");
            return false;
        }
       
    }catch(error){
        console.log("Error while looking item in the DB:");
        throw error;
    }
    
};

module.exports={itemByItemNumber}



