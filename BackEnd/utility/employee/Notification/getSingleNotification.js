const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
            query MyQuery ($NotifyId:uuid!){
                notification_by_pk(Notify_Id: $NotifyId) {
                Notify_Id
                sender
                receiver
                senderFirstName
                senderLastName
                senderProfilePicture
                item_no
                quantity_requested
                description
                isViwed
                created_at
                updated_at
                }
            }
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

  async function getSingleNotification(NotifyId){

    const variables={
        NotifyId
    }

    try{
        const data=client.request(doc, variables, requestHeaders)
        return data
    }
    catch(error){
        console.log("Error while fetching Single Notification.")
        throw error
    }

  }

  module.exports={getSingleNotification}