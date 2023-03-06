// Task 4
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } =require("../libs/ddbDocClient.js");
const { params_products, params_stocks } = require( "./constants.js");

const mergeProductsAndStocksById = (products, stocks) => {
  const merged = products.map((product) => {
     const relevant = stocks.find( p => p.product_id === product.id);
     if (relevant) {
      return {
        ...product,
        count: relevant.count,
      }
    }
      return product;
     });
     return merged;
};

module.exports.getProductsList = async () => {
  try {
    const products = await ddbDocClient.send(new ScanCommand(params_products));
    const stocks = await ddbDocClient.send(new ScanCommand(params_stocks));
    const joined = mergeProductsAndStocksById(products.Items, stocks.Items);

    console.log("Lambda getProductsList function is invoked");
  
    return {
      statusCode: 200,
      body: JSON.stringify(joined),
    };
  } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      }
  }
};


// Task 3
// import { mock } from "../mocks/products-mock";

// export const getProductsList = async () => {

//   return {
//     statusCode: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify(mock.products),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
