/* eslint-disable dot-notation */
const { EFFECT } = require("./constants");

module.exports.basicAuthorizer = async (event) => {
  console.log("event", event);

  // https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html

  // for REST API must generate a policy
  const generatePolicyDocument = (effect, resource) => {
    return {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    };
  };

  const generateResponse = (principalId, effect, resourse) => {
    return {
      principalId, // The principal user identification associated with the token sent by the client.
      policyDocument: generatePolicyDocument(effect, resourse),
    };
  };

  //  if authorizer type token, no headers in event, just authorizationToken
  const { authorizationToken, methodArn } = event;

  if (!authorizationToken) {
    throw new Error("No authorization header provided"); // 401, API Gateway does automatically
  }

  const principalId = "Test";

  const response =
    authorizationToken === process.env["Inga_Vishnivetskaia"]
      ? generateResponse(principalId, EFFECT.Allow, methodArn)
      : generateResponse(principalId, EFFECT.Deny, methodArn); // 403, API Gateway does automatically

  console.log("response:", response);

  return response;
};
