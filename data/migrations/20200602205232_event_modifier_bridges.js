exports.up = function(knex) {
    return knex.schema
        .createTable('Recipe_Ingredients', tbl => {
            tbl.integer('recipe_id').notNullable().unsigned().references('Recipes.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('ingredient_id').notNullable().unsigned().references('Ingredients.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.decimal('quantity', 5, 2).notNullable().unsigned();
            tbl.integer('unitOfMeasure').notNullable().unsigned();
            tbl.primary(['recipe_id', 'ingredient_id']);
        })
        .createTable('Attendee_Ingredients', tbl => {
            tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('ingredient_id').notNullable().unsigned().references('Ingredients.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.decimal('quantity', 5, 2).notNullable().unsigned();
            tbl.integer('unitOfMeasure').notNullable().unsigned();
            tbl.primary(['event_id', 'user_id', 'ingredient_id']);
        })
        .createTable('Events_Recipes', tbl => {
            tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('recipe_id').notNullable().unsigned().references('Recipes.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.primary(['event_id', 'recipe_id']);
        })
        ;
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Events_Recipes')
        .dropTableIfExists('Attendee_Ingredients')
        .dropTableIfExists('Recipe_Ingredients')
        ;
};
