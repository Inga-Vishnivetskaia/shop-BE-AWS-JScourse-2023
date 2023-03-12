/**
 * expects request with a name of CSV file with products and creates a new Signed URL
 * with the following key: uploaded/${fileName}. The name is passed in a query string as a name parameter.
 */

/* eslint-disable import/no-extraneous-dependencies */
const AWS = require("aws-sdk");
const { errorMessage } = require("./constants");

module.exports.importProductsFile = async (event) => {
  const s3 = new AWS.S3();

  if (!event?.queryStringParameters?.name) {
    return {
      statusCode: 400,
      message: errorMessage.invalidQueryStringRequest,
    };
  }

  const { name } = event.queryStringParameters;

  try {
    const params = {
      Bucket: "import-service-aws-js-course",
      Key: `uploaded/${name}`,
      Expires: 30,
      ContentType: "text/csv",
    };
    const url = await s3.getSignedUrl("putObject", params);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(url),
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: err.message,
    };
  }
};
