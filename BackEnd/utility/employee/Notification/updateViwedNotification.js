const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

  const doc=gql`
  mutation MyMutation($notify_id: uuid!) {
    update_notification(where: {_and: {Notify_Id: {_eq: $notify_id}, isViwed: {_eq: false}}}, _set: {isViwed: true}) {
      returning {
        Notify_Id
        sender
        receiver
        item_no
        description
        quantity_requested
        isViwed
        created_at
        updated_at
        senderFirstName
        senderLastName
        senderProfilePicture
      }
    }
  }
  
  `

  const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }


  async function updateViwedNotification(notify_id){
    const variables={
        notify_id
    };
    try{
        const data=client.request(doc, variables, requestHeaders)
        return data
    }catch(error){
        console.log("Error while Updating Notification")
        throw error
    }
  }

  module.exports={updateViwedNotification}