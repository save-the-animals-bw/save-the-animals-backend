exports.up = function(knex) {
  return knex.schema
    .createTable("users_support", tbl => {
      tbl.increments();
      tbl
        .string("username_s", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
      tbl.string("email", 255).notNullable();
      tbl
        .string("userType", 255)
        .notNullable()
        .defaultTo("support");
    })
    .createTable("organizations", tbl => {
      tbl.increments();
      tbl
        .string("organ_name", 255)
        .notNullable()
        .unique();
    })
    .createTable("users_organization", tbl => {
      tbl.increments();
      tbl
        .string("username_o", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
      tbl.string("email", 255).notNullable();
      tbl
        .string("userType", 255)
        .notNullable()
        .defaultTo("organization");
      tbl
        .integer("organization_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("organization_name", 255);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users_organization")
    .dropTableIfExists("organizations")
    .dropTableIfExists("users_support");
};
