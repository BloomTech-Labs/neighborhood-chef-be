const categoryModel = require("../../models/categories/category-models.js");

const getCategories = () => {

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  return categoryModel.find();
};

const getCategoryById = async (_, args) => {

const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const category = await categoryModel.findById(args.id);
  if (category) {
    return category;
  } else {
    throw new Error("The specified category id does not exist");
  }
};

const addCategory = (_, args) => {

  const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);
 
  return categoryModel.add(args.input);
};

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
};
