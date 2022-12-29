exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.string('image')

  table.timestamp('created_at').default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("ingredients");