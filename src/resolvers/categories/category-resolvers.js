const categoryModel = require("../../models/categories/category-models.js");

const getCategories = () => {
  return categoryModel.find();
};

const getCategoryById = async (_, args) => {
  const category = await categoryModel.findById(args.id);
  if (category) {
    return category;
  } else {
    throw new Error("The specified category id does not exist");
  }
};

const addCategory = (_, args) => {
  return categoryModel.add(args.input);
};

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
};
