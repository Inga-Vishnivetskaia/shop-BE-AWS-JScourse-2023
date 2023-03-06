const { ddbClient } = require ("./ddbClient.js");
const { products } = require ("../mocks/products-mock.js");

const tableName = "products-AWS-JS-course";

try {
  products.forEach((product) => {
    console.log(tableName);
    const params = {
      TableName: tableName,
      Item: {
        id: { S: product.productId },
        title: { S: product.productName },
        description: { S: product.description },
        // due to the use of DynamoDB client need to send numeric values as type N but the value must be a string
        price: { N: `${product.price}` },
      },
    };
    ddbClient.putItem(params, (error, data) => {
      if (error) {
        console.log(`Error in posting item id: ${params.Item.id}`, error, data);
      } else {
        console.log(`Successfully added item id: ${params.Item.id} to DynamoDB products`);
      }
    });
  });
} catch (error) {
  console.log("Populating of DynamoDB products failed", error);
}
