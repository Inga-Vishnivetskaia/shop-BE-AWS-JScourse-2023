const errorMessage = {
  invalidIdResponse: "This product is not available at the moment",
  invalidUrlResponse: "Invalid url for product request",
};

const params_products = {
  TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
};
const params_stocks = {
  TableName: process.env.DYNAMODB_TABLE_STOCKS,
};

const REGION = "eu-west-1";

module.exports = {
  errorMessage,
  params_products,
  params_stocks,
  REGION
};
