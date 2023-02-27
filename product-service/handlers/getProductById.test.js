const { getProductById } = require("./getProductById");
const mock = require("../mocks/products-mock");
const { errorMessage } = require("./constants");

describe("getProductById lambda", () => {
  const mockEventWithProductId = {
    pathParameters: {
      productId: "1",
    },
  };
  const mockEventWrongProductId = {
    pathParameters: {
      productId: undefined,
    },
  };
  const mockEventWrongUrl = {};

  const { invalidIdResponse, invalidUrlResponse } = errorMessage;

  it("should return product by id", async () => {
    const { body } = await getProductById(mockEventWithProductId);
    const parsed = JSON.parse(body);
    expect(parsed).toEqual(
      mock.products.find(
        (p) => p.productId === mockEventWithProductId.pathParameters.productId
      )
    );
  });
  it("should return predefined message if there is no product with such id", async () => {
    const { body } = await getProductById(mockEventWrongProductId);
    const parsed = JSON.parse(body);
    expect(parsed).toEqual(invalidIdResponse);
  });
  it("should return error message if id is not provided", async () => {
    const { body } = await getProductById(mockEventWrongUrl);
    const parsed = JSON.parse(body);
    expect(parsed).toEqual(invalidUrlResponse);
  });
});
