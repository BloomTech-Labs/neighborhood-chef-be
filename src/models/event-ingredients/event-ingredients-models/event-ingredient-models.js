const db = require("../../../../data/dbConfig");

module.exports = {
    findByEventId,
    addEventIngredients,
    updateEventIngredient,
    removeIngredient
}

function findByEventId (event_id) {
    return db("Event_Ingredients").where({event_id});
}

function findById (id) {
    return db("Event_Ingredients").where({id});
}

async function addEventIngredients (eventIngredients) {

    let createdIngredientsList = [];

    for(let i = 0; i < eventIngredients.length; i++) {
        const createdEventIngredient = await addEventIngredient(eventIngredients[i]);
        createdIngredientsList = [...createdIngredientsList, createdEventIngredient];
    }

    return createdIngredientsList;
}

async function addEventIngredient(eventIngredient) {
    try {
    
        const [id] = await db("Event_Ingredients").insert(eventIngredient).returning("id");
        const newIngredient = await findById(id).first();
        return newIngredient;
    } catch(err) {
        console.log(err.message)
    }
}

async function updateEventIngredient(eventIngredient){
    const { id, ...rest } = eventIngredient;
    const updated = await db("Event_Ingredients").where({id}).update({...rest});

    return await findById(id).first();
}

async function removeIngredient (id) {
  try { 
        console.log(id);
        const deletedIngredient = await findById(Number(id)).first();
        // console.log(deletedIngredient);
        const deleted = await db("Event_Ingredients").where({id}).del();
        console.log(deleted);
        if(deleted) {
            return deletedIngredient; 
        }
    } catch (err) {
        console.log(err.message);
    }
}