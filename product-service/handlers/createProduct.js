const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("../libs/ddbDocClient.js");
const { v4: uuidv4 } = require('uuid');


module.exports.createProduct = async (event) => { 

  if(!event.body) {
    return {
        statusCode: 400,
        body: "Please provide payload for post request"
    }
  }

  const product = JSON.parse(event.body);
  const { title, description, price } = product;

  if (!title || !description || !price) {
    return {
        statusCode: 400,
        body: "Insuffient payload for post request"
    }
  }

  // validation of data ? 

  const id = uuidv4();

  const params_products = {
    TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
    Item: {
      primaryKey: id,
      sortKey: title,
      description,
      price
    },
  };
  const params_stocks = {
    TableName: process.env.DYNAMODB_TABLE_STOCKS,
    Item: {
      primaryKey: id,
      count: 0
    },
  };

  try {
    const productsData = await ddbDocClient.send(new PutCommand(params_products));
    const stocksData = await ddbDocClient.send(new PutCommand(params_stocks));
    console.log("Success - item added or updated", productsData, stocksData);
  } catch (error) {
    console.log("Error", error);
  }
};