const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  const doc=gql`
  query MyQuery ($Newproductmodelnumber:Int!, $created_at:timestamptz){
    ItemsserialNumber(where: {_and: {modelNumber: {_eq: $Newproductmodelnumber}, created_at: {_eq: $created_at}}}) {
      modelNumber
      serialNumber
      created_at
      updated_at
    }
  }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function lastSerialNumberModule(Newproductmodelnumber, created_at){

                const variables={
                    Newproductmodelnumber, 
                    created_at
                }

                try{
                    const data= await client.request(doc, variables, requestHeaders)
                    console.log(data.ItemsserialNumber.length)
                    return data.ItemsserialNumber.length

                }catch(error){
                    console.log("Error while searching for the last Index.")
                    throw error
                }

  }

  module.exports={lastSerialNumberModule}
  