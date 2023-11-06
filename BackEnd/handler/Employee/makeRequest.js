const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const itemByItemNumber=require("../../utility/common/itemByItemNumber");
const userByusername=require("../../utility/common/userByusername");
const confirmationNumber=require("../../utility/Auth/confirmationNumber");
const validateRequest=require("../../utility/Auth/validateRequest");


const client = new GraphQLClient(endpoint, {
    headers: {
    },
  })

// Otp=confirmationNumber.confirmationNumber()

// const EmployeeRequest=gql`
//     mutation MyMutation ($item_name:String!, $item_no:Int!, $manager_username:String!, $quantity_requested:Int!, $employee_username:String!){
//         insert_MinT_Employee_Request_one(object: {
//         item_name: $item_name, 
//         item_no: $item_no, 
//         manager_username: $manager_username, 
//         quantity_requested: $quantity_requested,
//         employee_username: $employee_username,
//         confirmation_number: ${Otp}
//     }) {
//         id
//         item_no
//         item_name
//         quantity_requested
//         manager_username
//         is_approved
//         employee_username
//         confirmation_number
//         }
//     }
// `


const EmployeeRequest=gql`
mutation MyMutation ($item_name:String!, $item_no:Int!, $manager_username:String!, 
                    $quantity_requested:Int!, $employee_username:String!, $Otp:Int!){
                    insert_Employee_Request_one(object: {
                                item_name: $item_name, 
                                item_no: $item_no, 
                                manager_username: $manager_username, 
                                quantity_requested: $quantity_requested,
                                employee_username: $employee_username,
                                confirmation_number:$Otp
                            }) {
                    id
                    item_no
                    item_name
                    quantity_requested
                    manager_username
                    is_approved
                    employee_username
                    confirmation_number
                    }
                }
  
`


const requestHeaders = {
    'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
  }

async function makeRequest(req, res){

    let { item_no, item_name, quantity_requested, manager_username, employee_username}=req.body;

    const variables={
        item_no, 
        item_name, 
        quantity_requested,
        manager_username,
        employee_username,
        Otp:confirmationNumber.confirmationNumber()
    }

itemByItemNumber.itemByItemNumber(Number(item_no), Number(quantity_requested))
    .then((validItem)=>{
        if(validItem){
            userByusername.userByusername(manager_username)
                .then((validManager)=>{
                    if(validManager){
                        console.log("in the final step");
                        validateRequest.validateRequest("Employee_Request", Number(item_no), employee_username)
                            .then(async (validateRequest)=>{
                                console.log(validateRequest);
                                if(validateRequest){
                                    try{
                                        const data= await client.request(EmployeeRequest, variables, requestHeaders);
                                        console.log("we are here!");
                                        console.log(data);
                                        res.send({"Your confirmation number":data.insert_Employee_Request_one.confirmation_number});
                                    }catch(error){
                                        console.log("error while inserting request");
                                        console.log(error);
                                        res.send(500);
                                        return error;
                                    }
                                }else{
                                    res.sendStatus(400);
                                    return;
                                }
                            })
                            .catch((error)=>{
                                console.log("while looking for the item");
                                console.log(error);
                                res.sendStatus(500);
                            })
                    }else{
                        res.sendStatus(500);
                        return;
                    }
                })
                .catch((error)=>{
                    console.log("while looking for the item");
                    console.log(error);
                    res.sendStatus(500);
                    return;
                })
        }else{
            res.sendStatus(500);
            return;
        }
    })
    .catch((error)=>{
        console.log("while looking for the item");
        console.log(error);
        res.sendStatus(500);
        return;
    })

    // itemByItemNumber.itemByItemNumber(Number(item_no), Number(quantity_requested))
    // .then(data => {
    //     if(data.Item[0].status === "available"){ 
    //         if(data.Item[0].total_quantity_avilable >= Number(quantity_requested)){
    //             console.log("we are generating confirmation number")
    //                 managerByusername.managerByusername(manager_username)
    //                     .then(async (manager) => {

    //                         console.log("The manger to approve....");
    //                         console.log(manager.User);

    //                         if(manager.User.length != 0){
    //                             try{
    //                                 // check the role of the person to approve the request it has tobe manager
    //                                 if( manager.User[0].Role.role_name === "manager"){
    //                                     //check for the existance of duplication of request from one specific employee
    //                                     validateRequest.validateRequest("Employee_Request", Number(quantity_requested), employee_username)
    //                                         .then(async (data)=>{
    
    //                                             console.log(data);
    
    //                                             if(data.Employee_Request.length === 0){
    //                                                 const data= await client.request(EmployeeRequest, variables, requestHeaders);
    //                                                 console.log(data);
    //                                                 res.send({"Your confirmation number":Otp});
    //                                             } else{
    //                                                 res.status(500).json({response: 'Internal server Error while inserting the final request into the em.req DB.'});
    //                                             }
    
    //                                         })
    //                                         .catch((error)=>{
    //                                             console.log(error)
    //                                         })
                                        
    //                                 } else {
    //                                     res.status(404).json({response: 'No user Found...'});
    //                                 }
    
    //                             } catch (error) {
    //                                 console.log(`error making request...${error}`);
    //                                 res.sendStatus(500);
    //                             }
    //                         }else{
    //                             res.sendStatus(400)
    //                         }
   
    //                     })
    //                     .catch((error)=>{
    //                         console.log("error getting manager:::")
    //                         console.log(error)
    //                         return;
    //                     });
    //         }
    //     }
    // })
    // .catch(() => { 
    //     console.log("there is NO item with that item number")
    //     res.sendStatus(400);
    //     return ;
    // });

}

module.exports={makeRequest}