const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })


  const doc=gql`
  mutation MyMutation(
    $OldmodelNumber: Int!, 
    $NewmodelNumber: Int!, 
    $Created_at:timestamptz) {
    update_ItemsserialNumber(where: {_and: {
      modelNumber: {_eq:$OldmodelNumber}, 
      created_at: {_eq:  $Created_at}}}, 
      _set: {modelNumber: $NewmodelNumber}) {
      returning {
        modelNumber
        serialNumber
        created_at
        updated_at
      }
    }
  }
  `



  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function updateSerial(OldmodelNumber, NewmodelNumber, Created_at){

        console.log(OldmodelNumber, NewmodelNumber, Created_at)
    
            const variables={
              OldmodelNumber,
              NewmodelNumber,
              Created_at
              }

        try{
            const data=await client.request(doc, variables, requestHeaders)
            return data

        }catch(error){
            console.log("Error while updating serial number")
            throw error
        }
  }

  module.exports={updateSerial}