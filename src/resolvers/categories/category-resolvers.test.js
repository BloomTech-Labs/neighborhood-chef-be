const supertest = require('supertest');
const server = require('../../server.js');
const categoryModel = require('../../models/categories/category-models.js');

const ALL_CATEGORIES = {
  query: `
    query getCategories {
      getCategories {
        id
        category
        }
      }
    `,
  operationName: 'getCategories',
};

const NEW_CATEGORY = {
  query: `
    mutation addCategory($input: NewCategoryInput!) {
      addCategory(input: $input){
        id
        category
      }
    }`,
  operationName: 'addCategory',
  variables: {
    input: {
      category: String(Math.random()),
    },
  },
};

describe('category resolvers', () => {
  let testId;

  afterAll(async () => {
    await categoryModel.remove(testId);
  });

  test('creates a new category', async () => {
    const res = await supertest(server).post('/graphql').send(NEW_CATEGORY);
    const parsed = JSON.parse(res.text);
    testId = parsed.data.addCategory.id;
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(parsed.data.addCategory.id).toBeDefined();
  });

  test('gets all categories', async () => {
    const res = await supertest(server).post('/graphql').send(ALL_CATEGORIES);
    const parsed = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(parsed.data.getCategories.length).toBeGreaterThan(0);
  });

  test('get category by id', async () => {
    const res = await supertest(server)
      .post('/graphql')
      .send({
        query: `
          query getCategoryById($id:ID!) {
            getCategoryById(id:$id) {
              id
              category
          }
        }
      `,
        operationName: 'getCategoryById',
        variables: {
          id: `${testId}`,
        },
      });
    const parsed = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(parsed.data.getCategoryById.category).toBeDefined();
  });
});
