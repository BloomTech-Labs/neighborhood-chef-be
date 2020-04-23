const supertest = require("supertest");
const server = require("../../server.js");
const db = require("../../models/categories/category-models.js");

const ALL_CATEGORIES = {
  query: `query getCategories {
            getCategories {
              Category
              id
          }
        }
    `,
  operationName: "getCategories",
};

const CATEGORY_BY_ID = {
  query: `query getCategoryById($id:ID!) {
            getCategoryById(id:$id) {
              Category
              id
          }
        }
      `,
  operationName: "getCategoryById",
  variables: {
    id: 1,
  },
};

const NEW_CATEGORY = {
  query: `
  mutation addCategory($input: NewCategoryInput!) {
    addCategory(input: $input){
      id
      Category
    }
  }`,
  operationName: "addCategory",
  variables: {
    input: {
      Category: "Mostly Beers and hot dogs",
    },
  },
};

describe("category resolvers", () => {
  let testId;

  afterAll(async () => {
    await db.remove(testId);
  });

  test("gets all categories", async () => {
    const res = await supertest(server).post("/graphql").send(ALL_CATEGORIES);
    const parsed = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(parsed.data.getCategories.length).toBeGreaterThan(0);
  });

  test("creates a new category", async () => {
    const res = await supertest(server).post("/graphql").send(NEW_CATEGORY);
    const parsed = JSON.parse(res.text);
    testId = parsed.data.addCategory.id;
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("get category by id", async () => {
    const res = await supertest(server)
      .post("/graphql")
      .send({
        query: `
          query getCategoryById($id:ID!) {
            getCategoryById(id:$id) {
              Category
              id
          }
        }
      `,
        operationName: "getCategoryById",
        variables: {
          id: `${testId}`,
        },
      });
    const parsed = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(parsed.data.getCategoryById.Category).toEqual(
      "Mostly Beers and hot dogs"
    );
  });
});
