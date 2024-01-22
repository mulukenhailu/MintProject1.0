const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  query MyQuery($itemNumber: Int!) {
    Item(where: {item_number: {_eq: $itemNumber}}) {
      productname
      item_number
      productphoto
      productstatus
      productquantitynumber
      productdescription
      productmodel
      productmodelnumber
      productsource
      productstandardtype
      productPrice
      created_at
      updated_at
    }
  }
  
  `
  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function getitemUtility(itemNumber){

            const variables={
                itemNumber
            }

            try{
                const data = await client.request(doc, variables, requestHeaders);
                console.log("from get item>>>", data)
                return data
            }catch(error){
                throw error
            }

  }

  module.exports={getitemUtility}
