// reduce the total quantity of the item by the requested quantity amount
// if the remaining total quantity is equal to zero change the status  to unavailable for that item from the item table else continue
// if the request made is valid process it to the next step and trigger delete event in the employee request DB
// if the request made passed 3 days and not have been processed totaly

const { gql, GraphQLClient } = require("graphql-request");

const endpoint = `https://mint-intership.hasura.app/v1/graphql`;

const itemByItemNumber = require("../../utility/common/itemByItemNumber");
const userByusername = require("../../utility/common/userByusername");
const confirmationNumber = require("../../utility/Auth/confirmationNumber");
const validateRequest = require("../../utility/Auth/validateRequest");
const userAggregate = require("../../utility/common/userAggregate");
const updateQuantity = require("../../utility/item/update/updateQuantity");

const client = new GraphQLClient(endpoint, {
  headers: {},
});

const EmployeeRequest = gql`
  mutation MyMutation(
    $item_name: String!
    $item_no: Int!
    $manager_username: String!
    $quantity_requested: Int!
    $employee_username: String!
    $Otp: Int!
  ) {
    insert_Employee_Request_one(
      object: {
        item_name: $item_name
        item_no: $item_no
        manager_username: $manager_username
        quantity_requested: $quantity_requested
        employee_username: $employee_username
        confirmation_number: $Otp
      }
    ) {
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
`;

const requestHeaders = {
  "x-hasura-admin-secret": `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
};

async function makeRequest(req, res) {
  let { item_no, item_name, quantity_requested } = req.body;

  const variables = {
    item_no,
    item_name,
    quantity_requested,
    manager_username: await userAggregate
      .userAggregate(1, req.body.decoded.user_name)
      .then((data) => data?.User[0]?.manager_username),
    employee_username: req.body.decoded.user_name,
    Otp: confirmationNumber.confirmationNumber(),
  };

  itemByItemNumber
    .itemByItemNumber(Number(item_no), Number(quantity_requested))
    .then((validItem) => {
      if (validItem) {
        userAggregate
          .userAggregate(1, req.body.decoded.user_name)
          .then((data) => {
            if (
              data.User.length === 0 ||
              data.User[0].manager_username === ""
            ) {
              res.status(401).send({ error: "NO manager found to approve." });
            }
            console.log(req.body.decoded.user_name);
            console.log("==========>", data);
            userByusername
              .userByusername(data.User[0]?.manager_username)
              .then((validManager) => {
                if (validManager) {
                  console.log("in the final step");
                  validateRequest
                    .validateRequest(
                      "Employee_Request",
                      Number(item_no),
                      req.body.decoded.user_name
                    )
                    .then(async (validRequest) => {
                      console.log("==>", validRequest);
                      if (validRequest) {
                        updateQuantity
                          .updateQuantity(
                            Number(item_no),
                            Number(quantity_requested)
                          )
                          .then(async (data) => {
                            console.log(data);
                            try {
                              const data = await client.request(
                                EmployeeRequest,
                                variables,
                                requestHeaders
                              );
                              console.log("we are here!");
                              console.log(data);
                              res.send({
                                "Your confirmation number":
                                  data.insert_Employee_Request_one
                                    .confirmation_number,
                              });
                            } catch (error) {
                              console.log("error while inserting request");
                              console.log(error);
                              res
                                .status(500)
                                .json({ error: "Internal server Error" });
                              return error;
                            }
                          })
                          .catch((error) => {
                            console.log(
                              "error while updating total quantity of  item After requested has been made.",
                              error
                            );
                            return error;
                          });
                      } else {
                        res
                          .status(400)
                          .json({ error: "Request already existed" });
                        return;
                      }
                    })
                    .catch((error) => {
                      console.log("while looking for the item:");
                      console.log(error);
                      res.sendStatus(500);
                    });
                } else {
                  res.status(500).send({
                    error:
                      "NO manager Found to approve.Connect with the Database Adminstrator.",
                  });
                }
              })
              .catch((error) => {
                console.log("while looking for the item");
                console.log(error);
                res.sendStatus(500);
                return;
              });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Unable to find Manager" });
          });
      } else {
        res.status(500).json({ error: "Invalid Input" });
        return;
      }
    })
    .catch((error) => {
      console.log("while looking for the item", error);
      res.status(500).json({ error: "Internal server Error." });
      return;
    });
}

module.exports = { makeRequest };
