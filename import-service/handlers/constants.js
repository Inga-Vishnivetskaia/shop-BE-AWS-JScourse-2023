/* eslint-disable camelcase */
const errorMessage = {
  invalidQueryStringRequest:
    "File name should be passed in a query string as a name parameter",
};

const S3 = {
  TableName: process.env.S3_IMPORT_SERVICE,
};

const REGION = "eu-west-1";

module.exports = {
  errorMessage,
  S3,
  REGION,
};
