const mock = require("../mocks/products-mock");

const getProduct = (id) => {
  const product = mock.products.find((p) => p.productId === id);
  return product;
};

module.exports.getProductById = async (event) => {
  let body;
  let statusCode;

  if (!event.pathParameters) {
    statusCode = 404;
    body = "Invalid url for product request";
  } else {
    const { productId } = event.pathParameters;
    const product = getProduct(productId);
    body = product;
    statusCode = 200;

    if (!product) {
      statusCode = 404;
      body = "This product is not available at the moment";
    }
  }

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
