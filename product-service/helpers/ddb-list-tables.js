// For testing purposes - aws-sdk version 3
import { ddbClient } from "./ddbClient.js";

ddbClient.listTables({}, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
