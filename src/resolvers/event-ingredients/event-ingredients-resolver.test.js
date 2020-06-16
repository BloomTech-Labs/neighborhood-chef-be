const supertest = require('supertest');
const server = require('../../server.js');

function createUpdateQueryFromTestAdditions(id){
    return {
                query:`
                mutation
                EventIngredientUpdate($input: EventIngredientUpdateInput!){
                
                EventIngredientUpdate (input: $input) {
                    id
                    event_id
                    user_id
                    requested 
                    description
                }
                }`,
                operationName: "EventIngredientUpdate",
                variables: {
                    input: {
                        "id": id,
                        "description": "hello"
                    }
                }
            };   
}

function createRemoveQueryFromTestAdditions(id){
    return {
        query: `
        mutation
        removeEventIngredient($id: ID!) {

            removeEventIngredient (id: $id){
            description
            event_id
            user_id
            id
            requested
            }
        }`,
        operationName: "removeEventIngredient",
        variables: {
            id
        }
    };
} ;

const ADD_EVENT_INGREDIENT = {
  query: `
  mutation 
  addEventIngredients ($input: EventIngredientsInput! ){
  
  addEventIngredients(input: $input){
    id,
    event_id,
    user_id
    description,
    requested
  }
  }`,
  operationName: 'addEventIngredients',
  variables: {
      input: {
         ingredients : [
                {    
                    event_id: 1,
                    user_id: 1,
                    description: "Briscuit",
                    requested: true }, 
                {
                    event_id: 1,
                    description: "Chocolate",
                    requested: false
                }
            ]
        }
 }
};



describe("test event ingredient resolvers", () => {
    
    let createdEventId;

    test("I can make an add event request", async () => {
        const response = await supertest(server).post('/graphql').send(ADD_EVENT_INGREDIENT);

        const [ addedIngredientOne, addedIngredientTwo ] = response.body.data.addEventIngredients;
        
        createdEventId = addedIngredientOne.id;

        expect(addedIngredientOne).toBeDefined();
        expect(typeof(Number((addedIngredientOne.id)))).toEqual("number");
        expect(addedIngredientOne.description).toEqual("Briscuit");
        expect(addedIngredientOne.requested).toBe(true);
        expect(addedIngredientOne.user_id).toEqual(1);
    
        expect(addedIngredientTwo).toBeDefined();
        expect(typeof(Number((addedIngredientTwo.id)))).toEqual("number");
        expect(addedIngredientTwo.description).toEqual("Chocolate");
        expect(addedIngredientTwo.requested).toBe(false);
        expect(addedIngredientTwo.user_id).toBe(null);
    });


    test("I can make an update event ingredient request", async () => {

        const request = createUpdateQueryFromTestAdditions(createdEventId);

        const response = await supertest(server).post('/graphql').send(request);
        const updatedIngredient = response.body.data.EventIngredientUpdate;

        expect(updatedIngredient).toBeDefined();
        expect(updatedIngredient.description).toEqual("hello");

    });

    test("I can make an remove event request", async () => {

        const request = createRemoveQueryFromTestAdditions(createdEventId);
   
        const response = await supertest(server).post('/graphql').send(request);

        const removedEventIngredient = response.body.data.removeEventIngredient;

        expect(removedEventIngredient).toBeDefined();
    });
});