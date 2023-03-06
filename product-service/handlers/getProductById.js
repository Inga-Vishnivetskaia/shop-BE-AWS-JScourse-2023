const { ddbDocClient } = require("../libs/ddbDocClient.js");
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { errorMessage, params_products } = require("./constants.js");

const isValid = (product) => {
  return product?.title && product?.id;
}

const getProduct = async (id) => {
  const params = {
    ...params_products,
    Key:  {
      id
    },
  };
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log("Success :", data.Item);
    return data.Item;
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.getProductById = async (event = e) => {
  let body;
  let statusCode;

  if (!event.pathParameters) {
    statusCode = 404;
    body = errorMessage.invalidUrlResponse;
  } else {
    const { productId } = event.pathParameters;
    const product = await getProduct(productId);
    body = product;
    statusCode = 200;

    if (!isValid(product)) {
      statusCode = 404;
      body = errorMessage.invalidIdResponse;
    }
  }

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
};
