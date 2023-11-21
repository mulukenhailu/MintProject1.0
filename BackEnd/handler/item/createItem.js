const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

async function createItem(req, res){

        let {
          kind, 
          donatedOrPurchased, 
          model_number, 
          item_name, 
          item_photo, 
          status, 
          total_quantity_avilable, 
          description, 
          serial
        }= req.body


        bulkinsert=[]
        serial.forEach(element => {
          bulkinsert.push({"modelNumber":model_number, "serialNumber":parseInt(element)})
        });

        console.log({"bulk":bulkinsert}.bulk)

  doc=gql`
          mutation MyMutation(
            $kind:Int!, 
            $donatedOrPurchased:Int!, 
            $model_number:Int!, 
            $item_name:String!, 
            $item_photo:String!, 
            $status:String!, 
            $total_quantity_avilable:Int!, 
            $description:String!
            $bulk: [ItemsserialNumber_insert_input!]!
            ){
            insert_Item(objects: {
              kind:  $kind, 
              donatedOrPurchased:  $donatedOrPurchased, 
              model_number:  $model_number, 
              item_name: $item_name, 
              item_photo: $item_photo, 
              status: $status, 
              total_quantity_avilable:  $total_quantity_avilable
              description:  $description
            }) {
              returning {
                description
                item_name
                item_number
                model_number
              }
            }
                insert_ItemsserialNumber(objects: 
                  $bulk
                    ) {
                    returning {
                      modelNumber
                      serialNumber
                    }
                  }
          }
  `

  const variables={
    "kind": kind,
    "donatedOrPurchased": donatedOrPurchased,
    "model_number": model_number,
    "item_name": item_name,
    "item_photo": item_photo,
    "status": status,
    "total_quantity_avilable": total_quantity_avilable,
    "description": description,
    "bulk": {"bulk":bulkinsert}.bulk
  }

console.log(variables);

  try{
    const data = await client.request(doc,variables,requestHeaders);
    console.log(data);
    return data;
    }catch(error){
        console.log("error while connecting to the hasura cloud");
        console.log(error);
    }
                  

}


module.exports={createItem}