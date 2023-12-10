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
          productsource, 
          productstandardtype, 
          productmodelnumber, 
          productname, 
          productphoto, 
          productstatus, 
          productquantitynumber, 
          productdescription, 
          productmodel,
          productserialnumbers
        }= req.body


        console.log(
          productsource, 
          productstandardtype, 
          productmodelnumber, 
          productname, 
          productphoto, 
          productstatus, 
          productquantitynumber, 
          productdescription, 
          productmodel,
          productserialnumbers
        )

        bulkinsert=[]
        productserialnumbers.forEach(element => {
          bulkinsert.push({"modelNumber":productmodelnumber, "serialNumber":parseInt(element)})
        });

        console.log({"bulk":bulkinsert}.bulk)

  doc=gql`
  mutation MyMutation($productsource: Int!, $productstandardtype: Int!, $productmodelnumber: Int!, $productmodel: String!, $productname: String!, $productphoto: String!, $productstatus: String!, $productquantitynumber: Int!, $productdescription: String!, $bulk: [ItemsserialNumber_insert_input!]!) {
    insert_Item(objects: {productsource: $productsource, productstandardtype: $productstandardtype, productmodelnumber: $productmodelnumber, productmodel: $productmodel, productname: $productname, productphoto: $productphoto, productstatus: $productstatus, productquantitynumber: $productquantitynumber, productdescription: $productdescription}) {
      returning {
        productdescription
        productname
        productmodelnumber
        item_number
        created_at
        updated_at
      }
    }
    insert_ItemsserialNumber(objects: $bulk) {
      returning {
        modelNumber
        serialNumber
      }
    }
  }
  
  `

  const variables={
    "productsource": productsource,
    "productstandardtype": productstandardtype,
    "productmodelnumber": productmodelnumber,
    "productmodel":productmodel,
    "productname": productname,
    "productphoto": productphoto,
    "productstatus": productstatus,
    "productquantitynumber": productquantitynumber,
    "productdescription": productdescription,
    "bulk": {"bulk":bulkinsert}.bulk
  }

console.log(variables);

  try{
    const data = await client.request(doc,variables,requestHeaders);
    console.log(data);
    res.send(data)
    }catch(error){
        console.log("error while connecting to the hasura cloud");
        console.log(error);
        if (error.response.errors[0].message.includes("Uniqueness violation. duplicate key value violates unique constraint \"Items_model_number_key\"")){
            res.status(400).send({error:"Uniqueness violation Items_model_number."})
        }
        else{
          res.status(500).send({error:"Internal server Error."})
        }
    }
                  

}


module.exports={createItem}