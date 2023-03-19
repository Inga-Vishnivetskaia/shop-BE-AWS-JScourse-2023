/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
const AWS = require("aws-sdk");
const parse = require("csv-parser");
const { REGION } = require("./constants");

module.exports.importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: REGION });

  try {
    for (const record of event.Records) {
      const getParams = {
        Bucket: "import-service-aws-js-course",
        Key: record.s3.object.key,
      };
      const copyParams = {
        Bucket: "import-service-aws-js-course",
        CopySource: `${"import-service-aws-js-course"}/${record.s3.object.key}`,
        Key: record.s3.object.key.replace("uploaded", "parsed"),
      };

      const chunks = [];

      const getAsBytes = new Promise(() => {
        const readStream = s3.getObject(getParams).createReadStream();

        readStream.pipe(parse({ separator: ";" })).on("data", function (row) {
          console.log(row);
          chunks.push(row);
        });

        readStream.on("error", (error) =>
          console.log("error in reading stream:", error)
        );

        readStream.on("end", () => {
          s3.copyObject(copyParams).promise();
          console.log("chunks", chunks);
        });
      });

      await getAsBytes.then(() => s3.deleteObject(getParams).promise());
    }
    return {
      statusCode: 202,
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: err.message,
    };
  }
};
