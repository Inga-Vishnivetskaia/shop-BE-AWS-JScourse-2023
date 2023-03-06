const { ddbClient } = require ("./ddbClient.js");
const { products } = require ("../mocks/products-mock.js");

const tableName = "stocks-AWS-JS-course";

try {
  products.forEach((product) => {
    const params = {
      TableName: tableName,
      Item: {
        product_id: { S: product.productId },
        // due to the use of DynamoDB client need to send numeric values as type N but the value must be a string
        count: { N: `${product.count}` },
      }
    };
    ddbClient.putItem(params, (error, data) => {
      if (error) {
        console.dir(`Error in posting item id: ${params.Item}`, error, data);
      } else {
        console.dir(`Successfully added item id: ${params.Item} to DynamoDB products`);
      }
    });
  });
} catch (error) {
  console.log("Populating of DynamoDB products failed", error);
}
