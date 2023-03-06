const { DynamoDBDocumentClient} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./ddbClient.js");

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: true, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// const ddbClient = new DynamoDBClient({ region: REGION });

// Create the DynamoDB Document client.
module.exports.ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);
