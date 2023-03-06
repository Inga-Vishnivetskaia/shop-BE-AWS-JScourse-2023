/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("../libs/ddbDocClient");

module.exports.createProduct = async (event) => {
  console.log("Event is provided for createProduct", event);

  const product =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  console.log("parsed body", product);

  if (!event.body) {
    return {
      statusCode: 400,
      body: "Please provide payload for post request",
    };
  }

  const { title, description, price } = product;

  if (!title || !description || !price) {
    return {
      statusCode: 400,
      body: "Insuffient payload for post request",
    };
  }

  // validation of data ?

  const ts = Date.now();

  const id = `${ts}_id`;

  const params_products = {
    TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
    Item: {
      id,
      title,
      description,
      price,
    },
  };
  const params_stocks = {
    TableName: process.env.DYNAMODB_TABLE_STOCKS,
    Item: {
      product_id: id,
      count: 0,
    },
  };

  try {
    const productsData = await ddbDocClient.send(
      new PutCommand(params_products)
    );
    const stocksData = await ddbDocClient.send(new PutCommand(params_stocks));
    console.log("Success - item added or updated", productsData, stocksData);
  } catch (error) {
    console.log("Error", error);
  }
};
