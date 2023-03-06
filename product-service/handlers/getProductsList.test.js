// import { getProductsList } from "./getProductsList";
// import mock from "../mocks/products-mock";

// describe("getProductsList lambda", () => {
//   it("returns statusCode 200", async () => {
//     const { statusCode } = await getProductsList();
//     expect(statusCode).toEqual(200);
//   });
//   it("returns specified headers", async () => {
//     const { headers } = await getProductsList();
//     expect(headers).toEqual({ "Access-Control-Allow-Origin": "*" });
//   });
//   it("returns mocked products", async () => {
//     const { body } = await getProductsList();
//     const parsed = JSON.parse(body);
//     expect(parsed).toEqual(mock.products);
//   });
// });
