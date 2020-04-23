const categoryModels = require("./category-models.js");
const db = require("../../../data/dbConfig.js");

describe("category models", () => {
  let createdCategoryId = 0;
  let categoryCount = 0;

  beforeAll(async () => {
    const categories = await db("Categories");
    categoryCount = categories.length;
  });

  test("creates a new category", async () => {
    const newCategory = await categoryModels.add({ Category: "Potluck" });
    createdCategoryId = newCategory.id;
    const categories = await db("Categories").select();
    expect(categories.length).toEqual(categoryCount + 1);
  });

  test("finds all categories", async () => {
    const categories = await categoryModels.find();
    expect(categories.length).toEqual(categoryCount + 1);
  });

  test("finds category by id", async () => {
    const category = await categoryModels.findById(createdCategoryId);
    expect(category.Category).toEqual("Potluck");
  });

  test("removes created category", async () => {
    const removed = await categoryModels.remove(createdCategoryId);
    const categories = await db("Categories").select();
    expect(categories.length).toEqual(categoryCount);
  });
});
