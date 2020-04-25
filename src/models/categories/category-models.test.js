const categoryModels = require("./category-models.js");
const db = require("../../../data/dbConfig.js");

describe("category models", () => {
  let createdCategoryId;
  let intialCategoryCount;

  beforeAll(async () => {
    const categories = await db("Categories");
    intialCategoryCount = categories.length;
  });

  test("creates a new category", async () => {
    const newCategory = await categoryModels.add({
      Category: String(Math.random()),
    });
    createdCategoryId = newCategory.id;
    const found = await db("Categories")
      .where("Categories.id", createdCategoryId)
      .first();
    expect(found).toBeDefined();
    expect(found.id).toEqual(createdCategoryId);
  });

  test("finds all categories", async () => {
    const categories = await categoryModels.find();
    expect(categories.length).toEqual(intialCategoryCount + 1);
  });

  test("finds category by id", async () => {
    const category = await categoryModels.findById(createdCategoryId);
    expect(category).toBeDefined();
  });

  test("removes created category", async () => {
    const removed = await categoryModels.remove(createdCategoryId);
    const category = await db("Categories")
      .where({ id: createdCategoryId })
      .first();
    expect(category).toBeUndefined();
  });
});
