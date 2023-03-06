// Create service client module using ES6 syntax.
const { DynamoDB } = require ("@aws-sdk/client-dynamodb");
// Set the AWS Region.
const REGION = "eu-west-1";

// Create an Amazon DynamoDB service client object.
module.exports.ddbClient = new DynamoDB({ region: REGION });
