/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("../libs/ddbDocClient");

module.exports.createProduct = async (event) => {
  console.log("Event is provided for createProduct", event);

  // const product =
  //   typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  // console.log("parsed body", product);

  if (!event) {
    return {
      statusCode: 400,
      body: "Please provide payload for post request",
    };
  }

  const { title, description, price } = event;

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

  console.log("params", params_products, params_stocks);

  return Promise.all([
    ddbDocClient.send(new PutCommand(params_products)),
    ddbDocClient.send(new PutCommand(params_stocks)),
  ]);
};
