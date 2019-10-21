exports.up = function(knex) {
  return knex.schema
    
    .createTable("organizations", tbl => {
      tbl.increments();
      tbl
        .string("organ_name", 255)
        .notNullable()
        .unique();
    })
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
      tbl.string("email", 255).notNullable().unique();
      tbl
        .string("userType", 255)
        .notNullable()
        
      tbl
        .integer("organization_id")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
     
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("organizations")
    
};
