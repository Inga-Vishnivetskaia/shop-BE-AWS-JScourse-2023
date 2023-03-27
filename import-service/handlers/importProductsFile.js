/* eslint-disable import/no-extraneous-dependencies */
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { REGION, errorMessage } = require("./constants");

module.exports.importProductsFile = async (event, context, callback) => {
  const corsHeaders = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,GET",
  };

  if (!event?.queryStringParameters?.name) {
    callback(null, {
      statusCode: 400,
      headers: corsHeaders,
      body: errorMessage.invalidQueryStringRequest,
    });
  }

  const { name } = event.queryStringParameters;

  const params = {
    Bucket: "import-service-aws-js-course",
    Key: `uploaded/${name}`,
    ContentType: "text/csv",
  };

  const client = new S3Client({ region: REGION });
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(client, command, {
    expiresIn: 30,
  });

  try {
    callback(null, {
      statusCode: 200,
      headers: corsHeaders,
      body: url,
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify(error.errorMessage),
    });
  }
};

// /** aws-sdk version 2
//  * expects request with a name of CSV file with products and creates a new Signed URL
//  * with the following key: uploaded/${fileName}. The name is passed in a query string as a name parameter.
//  */

// /* eslint-disable import/no-extraneous-dependencies */
// const AWS = require("aws-sdk");
// const { errorMessage } = require("./constants");

// module.exports.importProductsFile = async (event) => {
//   const s3 = new AWS.S3();

//   if (!event?.queryStringParameters?.name) {
//     return {
//       statusCode: 400,
//       message: errorMessage.invalidQueryStringRequest,
//     };
//   }

//   const { name } = event.queryStringParameters;

//   try {
//     const params = {
//       Bucket: "import-service-aws-js-course",
//       Key: `uploaded/${name}`,
//       Expires: 30,
//       ContentType: "text/csv",
//     };
//     const url = await s3.getSignedUrl("putObject", params);
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify(url),
//     };
//   } catch (err) {
//     return {
//       statusCode: 500,
//       message: err.message,
//     };
//   }
// };
