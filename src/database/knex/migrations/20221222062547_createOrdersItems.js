exports.up = knex => knex.schema.createTable("ordersItems", table => {
  table.increments('id')
  table.text("title");
  table.integer('quantity')

  table.timestamp('created_at').default(knex.fn.now())
  
  table
    .integer('order_id')
    .references('id')
    .inTable('orders')
    .onDelete('CASCADE')
  table
    .integer('product_id')
    .references('id')
    .inTable('products')
    .onDelete('CASCADE')  
})

exports.down = knex => knex.schema.dropTable("ordersItems")