const  { gql, GraphQLClient  }=require('graphql-request');

const endpoint = `https://mint-intership.hasura.app/v1/graphql`

const client = new GraphQLClient(endpoint, {
  headers: {
  },
})

const MyQuery = gql`
query MyQuery($name: String!) {
  Item(where: {productname: {_ilike: $name}}) {
    item_number
    productname
    productphoto
    productstatus
    productquantitynumber
    productdescription
    productmodel
    productmodelnumber
    productsource
    productstandardtype
    productPrice
    created_at
    updated_at
  }
}
`

const requestHeaders = {
  'x-hasura-admin-secret': `Wx30jjFtSFPHm50cjzQHSOtOdvGLwsY26svisTrYnuc2gdZmqEo2LEFwWveqq1sF`,
}

async function filterByName(req, res) {

    let {filter}= req.body

  const variables = {
    name: "%"+filter+"%"
  };

  try {
    const data = await client.request(MyQuery, variables, requestHeaders);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error. Retry again!" });
  }
}

module.exports = {filterByName}
