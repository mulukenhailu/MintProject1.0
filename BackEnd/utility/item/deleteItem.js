const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


const doc=gql`
    mutation MyMutation ($itemNumber:Int!){
        delete_Item(where: {item_number: {_eq: $itemNumber }}) {
        affected_rows
        returning {
            item_name
            item_number
            item_photo
            status
            total_quantity_avilable
          }
        }
    }
`

const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function deleteItemUtility(itemNumber){

            const variables={
                itemNumber
            }

            try{
                const data = await client.request(doc, variables, requestHeaders)
                console.log("from delete item==>", data);
                return data
            }catch(error){
                throw error
            }
    
  }
  
  module.exports={deleteItemUtility}