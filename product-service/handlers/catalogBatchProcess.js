/* eslint-disable import/no-extraneous-dependencies */

/** triggered by an SQS event
    iterates over all SQS messages and creates corresponding products in the products and stocks table */

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { createProduct } = require("./createProduct");
const { REGION } = require("./constants");

module.exports.catalogBatchProcess = async (event) => {
  const createProductAndStock = event.Records.reduce(
    (promisesArray, record) => {
      let product;

      try {
        product = JSON.parse(record.body);
        console.log("product in catalogBatchProcess", product);
      } catch (error) {
        console.log(`Error: ${error.message} for ${record.body}`);
        return promisesArray;
      }

      promisesArray.push(createProduct(product));

      return promisesArray;
    },
    []
  );

  return Promise.all(createProductAndStock).then(() => {
    const snsClient = new SNSClient({ region: REGION });

    return snsClient.send(
      new PublishCommand({
        Subject: "New products added",
        Message: "New products added to dynamodb",
        TopicArn: process.env.snsArn,
      })
    );
  });
};
