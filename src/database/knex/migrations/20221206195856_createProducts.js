exports.up = knex => knex.schema.createTable("products", table => {
  table.increments('id')
  table.string('title')
  table.string('description')
  table.string('price')
  table.string('image')
  table.string('category')

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products");
