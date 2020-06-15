const eventIngredientsModel = require('./event-ingredient-models');


const testEventIngredient = {
    event_id: 1,
    description: "Triscuits",
    requested: true,
    user_id: 1
};

const testEventIngredients = [        
    {
    event_id: 1,
    description: "Bacon",
    requested: true,
    user_id: 1
    },
    {
    event_id: 2,
    description: "Lemons",
    requested: false,
    }
];

const ingredientUpdateInfo = {
    id: 1,
    description: "Salmon",
    requested: false,
}

describe('Event Ingredient Models', () => {
  let createdIngredientId;

  test('adds an event ingredient', async () => {

    const [ addedIngredient ] = await eventIngredientsModel.addEventIngredients([testEventIngredient]);

    expect(addedIngredient).toBeDefined();
    expect(typeof(Number((addedIngredient.id)))).toEqual("number");
    expect(addedIngredient.description).toEqual("Triscuits");
    expect(addedIngredient.requested).toBe(true);
    expect(addedIngredient.user_id).toEqual(1);

    createdIngredientId = addedIngredient.id;
  });

  test('adds multiple event ingredients', async () => {

    const [ addedIngredientOne, 
            addedIngredientTwo ] = await eventIngredientsModel.addEventIngredients(testEventIngredients);



    expect(addedIngredientOne).toBeDefined();
    expect(typeof(Number((addedIngredientOne.id)))).toEqual("number");
    expect(addedIngredientOne.description).toEqual("Bacon");
    expect(addedIngredientOne.requested).toBe(true);
    expect(addedIngredientOne.user_id).toEqual(1);

    expect(addedIngredientTwo).toBeDefined();
    expect(typeof(Number((addedIngredientTwo.id)))).toEqual("number");
    expect(addedIngredientTwo.description).toEqual("Lemons");
    expect(addedIngredientTwo.requested).toBe(false);
    expect(addedIngredientTwo.user_id).toBe(null);
  });

  test('updates an event ingredient', async () => {


    const updatedIngredient = await eventIngredientsModel.updateEventIngredient(ingredientUpdateInfo);

    

    expect(updatedIngredient).toBeDefined();
    expect(updatedIngredient.description).toEqual("Salmon");
    expect(updatedIngredient.requested).toBe(false);

  });

  test('removes an event ingredient', async () => {

    const searchForUndeletedIngredient = await eventIngredientsModel.findById(createdIngredientId);

    const removedIngredient = await eventIngredientsModel.removeIngredient(createdIngredientId);

    const searchForDeletedIngredient = await eventIngredientsModel.findById(createdIngredientId);
    
    expect(removedIngredient).toBeDefined();
    expect(typeof(Number((removedIngredient.id)))).toEqual("number");
    expect(removedIngredient.description).toEqual("Triscuits");
    expect(removedIngredient.requested).toBe(true);
    expect(removedIngredient.user_id).toEqual(1);

    expect(searchForUndeletedIngredient.length).toBe(1);
    expect(searchForDeletedIngredient.length).toBe(0);

  });

});