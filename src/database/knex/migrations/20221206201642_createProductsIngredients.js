exports.up = knex => knex.schema.createTable("productsIngredients", table => {
  table.increments('id')

  table.timestamp('created_at').default(knex.fn.now())
  
  table
    .integer('product_id')
    .references('id')
    .inTable('products')
    .onDelete('CASCADE')
  table
    .integer('ingredient_id')
    .references('id')
    .inTable('ingredients')
    .onDelete('CASCADE')  
})

exports.down = knex => knex.schema.dropTable("productsIngredients")