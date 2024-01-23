const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


const doc=gql`
mutation MyMutation(
  $ItemNumber: Int!,
  $productPrice:bigint!, 
  $productdescription:String!,
  $productmodel:String!,
  $Newproductmodelnumber:Int!,
  $productname:String!,
  $productphoto:String!,
  $productquantitynumber:Int!,
  $productsource:Int!,
  $productstandardtype:Int!,
  $productstatus:String!
  ) {
  update_Item(where: {item_number: {_eq: $ItemNumber}}, _set: 
    { 
      productPrice: $productPrice, 
      productdescription: $productdescription, 
      productmodel: $productmodel, 
      productmodelnumber: $Newproductmodelnumber, 
      productname: $productname, 
      productphoto: $productphoto, 
      productquantitynumber: $productquantitynumber, 
      productsource: $productsource, 
      productstandardtype: $productstandardtype, 
      productstatus:$productstatus
    }) {
    returning {
      item_number
      productPrice
      productdescription
      productmodel
      productmodelnumber
      productname
      productphoto
      productquantitynumber
      productsource
      productstandardtype
      productstatus
      created_at
      updated_at
    }
  }
}
`

const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}


async function ItemUpdate(...itemInfo){

  [ ItemNumber,
    productPrice, 
    productdescription, 
    productmodel, 
    Newproductmodelnumber, 
    productname, 
    productphoto, 
    productquantitynumber, 
    productsource, 
    productstandardtype, 
    productstatus]=itemInfo

  const variables={
    ItemNumber,
    productPrice, 
    productdescription, 
    productmodel, 
    Newproductmodelnumber, 
    productname, 
    productphoto, 
    productquantitynumber, 
    productsource, 
    productstandardtype, 
    productstatus
  }

  try{
    const data=await client.request(doc, variables, requestHeaders)
    return data
  }catch(error){
    console.log("Error while updating Item.")
    throw error
  }

}

module.exports={ItemUpdate}