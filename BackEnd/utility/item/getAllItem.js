const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`;

const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  let document

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

    async function getAllItemsUtility(all){
      console.log(arguments[0])
      if(arguments[0]=="all"){
        document=gql`
        query MyQuery @cached {
          Item {
            productname
            item_number
            productstatus
            productquantitynumber
            productphoto
            productdescription
            productmodel
            productPrice
            created_at
            updated_at
          }
        }
      `
      }

      else if (arguments[0]=="available"){
        document=gql`
        query MyQuery @cached {
            Item (where: {productstatus: {_eq: "available"}}) {
                productname
                item_number
                productstatus
                productquantitynumber
                productphoto
                productdescription
                productmodel
                productPrice
                created_at
                updated_at
            }
        }
      `

      }
        try{
            const data = await client.request(document,{},requestHeaders);
            console.log("From get all item", data.Item.length);
            return data
        }catch(error){
            throw error
        }
    }

module.exports={getAllItemsUtility}