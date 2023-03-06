// Create service client

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { REGION } = require("../handlers/constants.js");

// Create an Amazon DynamoDB service client object.
module.exports.ddbClient = new DynamoDBClient({ region: REGION });
