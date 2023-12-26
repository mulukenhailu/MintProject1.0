const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

const doc=gql`
  query MyQuery($receiver: String!) {
    notification(where: {_and: {isViwed: {_eq: false}, receiver: {_eq: $receiver}}}) {
      Notify_Id
      sender
      receiver
      description
      isViwed
      senderFirstName 
      senderLastName 
      senderProfilePicture
    }
  }
`

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function notifications(receiver){
        const variables={
          receiver
        };

        try{
          const data= client.request(doc, variables, requestHeaders)
          return data
        }catch(error){
          console.log("Error while fetching request notification")
          throw error
        }
  }

  module.exports={notifications}