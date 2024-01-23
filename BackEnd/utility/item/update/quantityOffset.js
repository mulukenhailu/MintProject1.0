const  { gql, GraphQLClient  }=require('graphql-request');
const lastSerialNumberModule=require("./updateUtility/lastSerialNumber");

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const doc1=gql`
mutation MyMutation ($objects:[ItemsserialNumber_insert_input!]!){
    insert_ItemsserialNumber(objects:$objects) {
      affected_rows
    }
  } 
`

const doc2=gql`
mutation MyMutation ($lastSerialNumber:Int!){
    delete_ItemsserialNumber(where: {serialNumber: {_gt: $lastSerialNumber}}) {
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
  


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

async function quantityOffset(...itemInfo) {
                [oldproductquantitynumber, newproductquantitynumber, Newproductmodelnumber, created_at] = itemInfo;

                if (oldproductquantitynumber > newproductquantitynumber) {

                    try {
                    const variables = {
                        "lastSerialNumber": newproductquantitynumber,
                    };

                            try {
                                const data = await client.request(doc2, variables, requestHeaders);
                                return data;
                            } catch (error) {
                                console.log("Error While decrementing Quantity:", error);
                                throw error;
                            }

                    } 
                    catch (serialNumberError) {
                    console.log("Error getting last serial number:", serialNumberError);
                    throw serialNumberError;
                    }
                }

                else{

                    try {
                        const lastSerialNumber =  await lastSerialNumberModule.lastSerialNumberModule(Newproductmodelnumber, created_at)

                                let obj = [];

                                for (let i = lastSerialNumber+1; i <= newproductquantitynumber; i++) {
                                    obj.push({
                                    "modelNumber": Newproductmodelnumber,
                                    "serialNumber": i,
                                    "created_at": created_at
                                    });
                                }

                                const variables={
                                    "objects":obj
                                }

                                try{
                                    const data=await client.request(doc1, variables, requestHeaders)
                                    return data

                                }catch(error){
                                    throw error
                                }

                    } catch (serialNumberError) {
                        console.log("Error getting last serial number:", serialNumberError);
                        throw serialNumberError;
                    }

                }

  }

  module.exports={quantityOffset}
  


